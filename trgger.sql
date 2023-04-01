ALTER TABLE AFZ_Activity
    ADD CONSTRAINT CH_INH_AFZ_Activity 
    CHECK ( Source_Type IN ('Att',
        'Par',
        'Shw',
        'Sto',
        'Tic '
        ) )
GO

ALTER TABLE AFZ_Facility
    ADD CONSTRAINT CH_INH_AFZ_Facility
    CHECK ( Source_Type IN ('Att',
        'Par',
        'Shw',
        'Sto',
        'Tic '
        ) )
GO


ALTER TABLE AFZ_Card_Payment
ADD CONSTRAINT CK_AFZ_Card_Payment_card_type
CHECK (Card_Type IN ('credit', 'debit'))
GO


CREATE TRIGGER UpdateOrderAmountDue
     ON AFZ_Order
     AFTER INSERT
     AS
     BEGIN
        DECLARE @newAmount TABLE (Activity_ID NUMERIC(5), Amount NUMERIC(10, 2))

        INSERT INTO @newAmount
        SELECT O.Activity_ID, sum(O.Quantity * AIS.Unit_Price)
        FROM AFZ_Order O
        JOIN AFZ_Item_Store AIS on AIS.Item_ID = O.Item_ID AND AIS.Facility_ID = o.Store_Facility_ID
        INNER JOIN inserted i ON O.Activity_ID = i.Activity_ID
        GROUP BY O.Activity_ID


        UPDATE AFZ_Activity
        SET AFZ_Activity.Amount_Due = NA.Amount
        FROM @newAmount NA
        JOIN AFZ_Activity ON NA.Activity_ID = AFZ_Activity.Activity_ID
     END
GO



CREATE TRIGGER UpdateTicketAmountDue
     ON AFZ_Tickets
     AFTER INSERT
     AS
     BEGIN

        DECLARE @pendingMemberTicketNum TABLE (Visitor_ID NUMERIC(5), RemainCount NUMERIC(1), PDate DATE);

        DECLARE @memDicNum TABLE (Visitor_ID NUMERIC(5), RemainCount NUMERIC(1), PDate DATE);
        INSERT INTO @memDicNum
        SELECT V.Visitor_ID,
               (CASE WHEN COUNT(T.Ticket_ID) > 5 THEN 5 ELSE COUNT(T.Ticket_ID) END) AS Activity_Count,
               CAST(T.Purchase_Date AS DATE)
        FROM AFZ_Visitors V
        LEFT JOIN AFZ_Activity AA2 ON V.Visitor_ID = AA2.Visitor_ID
        LEFT JOIN AFZ_Tickets T ON AA2.Activity_ID = T.Activity_ID
        WHERE Ticket_Type_ID IN (3, 5, 6)
        GROUP BY V.Visitor_ID, CAST(T.Purchase_Date AS DATE)

        SELECT * FROM @memDicNum
        IF OBJECT_ID('tempdb..@memDicNum') IS NOT NULL
        BEGIN
            INSERT INTO @pendingMemberTicketNum
            SELECT AA2.Visitor_ID, CASE WHEN COUNT(T.Ticket_ID) > 5 - COUNT(MU.RemainCount) THEN 5 - COUNT(MU.RemainCount) ELSE COUNT(T.Ticket_ID) END, CAST(T.Purchase_Date AS DATE)
            FROM AFZ_Activity AA2
            INNER JOIN AFZ_Tickets T ON AA2.Activity_ID = T.Activity_ID
            INNER JOIN AFZ_Visitors V ON V.Visitor_ID = AA2.Visitor_ID
            INNER JOIN @memDicNum MU ON MU.Visitor_ID = AA2.Visitor_ID
            WHERE V.Visitor_Type_ID = 3 AND Ticket_Type_ID NOT IN (3, 5, 6)
            GROUP BY AA2.Visitor_ID, CAST(T.Purchase_Date AS DATE);
        END
        ELSE
        BEGIN
            INSERT INTO @pendingMemberTicketNum
            SELECT AA2.Visitor_ID, CASE WHEN COUNT(T.Ticket_ID) > 5 THEN 5 ELSE COUNT(T.Ticket_ID) END, CAST(T.Purchase_Date AS DATE)
            FROM AFZ_Activity AA2
            INNER JOIN AFZ_Tickets T ON AA2.Activity_ID = T.Activity_ID
            INNER JOIN AFZ_Visitors V ON V.Visitor_ID = AA2.Visitor_ID
            WHERE V.Visitor_Type_ID = 3 AND Ticket_Type_ID NOT IN (3, 5, 6)
            GROUP BY AA2.Visitor_ID, CAST(T.Purchase_Date AS DATE);
        END




        UPDATE AFZ_Tickets
        SET AFZ_Tickets.Ticket_Type_ID = 3
        FROM (
          SELECT Ticket_ID,
                 AA.Visitor_ID,
                 CAST(Activity_Date AS DATE) as PDate,
                 ROW_NUMBER() OVER (PARTITION BY CAST(Activity_Date AS DATE), AA.Visitor_ID ORDER BY CAST(Activity_Date AS DATE) DESC) AS RowNum
          FROM AFZ_Activity AA
          INNER JOIN AFZ_Tickets ON AA.Activity_ID = AFZ_Tickets.Activity_ID
          INNER JOIN AFZ_Visitors AV on AV.Visitor_ID= AA.Visitor_ID
          WHERE Source_Type = 'Tic' and Visitor_Type_ID = 3 AND Ticket_Type_ID NOT IN (3, 5, 6)
        ) AS Subquery
        INNER JOIN @pendingMemberTicketNum RM ON RM.Visitor_ID = Subquery.Visitor_ID
        INNER JOIN inserted i on i.Ticket_ID = Subquery.Ticket_ID
        WHERE Subquery.Ticket_ID = AFZ_Tickets.Ticket_ID
          AND Subquery.RowNum <= RM.RemainCount -- select only the top-ranked row in each group


        UPDATE AFZ_Tickets
        SET AFZ_Tickets.Ticket_Type_ID =
            CASE WHEN DATEDIFF(year, AV.Birthdate, getutcdate()) <= 7
                    THEN CASE WHEN T.Ticket_Type_ID = 3
                            THEN 5 -- child-member ticket
                         ELSE 1 -- child ticket
                         END
                 WHEN DATEDIFF(year, AV.Birthdate, getutcdate()) >= 60
                    THEN CASE WHEN T.Ticket_Type_ID = 3
                            THEN 6 -- child-member ticket
                         ELSE 4 -- child ticket
                         END
                 ELSE T.Ticket_Type_ID
            END
        FROM inserted NA
        INNER JOIN AFZ_Tickets T ON NA.Ticket_ID = T.Ticket_ID
        INNER JOIN AFZ_Activity A on A.Activity_ID = NA.Activity_ID
        INNER JOIN AFZ_Visitors AV on A.Visitor_ID = AV.Visitor_ID

        UPDATE AFZ_Tickets
        SET AFZ_Tickets.Price =
            CASE WHEN (DATENAME(WEEKDAY, NA.Purchase_Date) IN ('Saturday', 'Sunday')) -- weekend
                    OR (EXISTS (SELECT * FROM AFZ_Holidays WHERE Holiday_Date = NA.Purchase_Date)) -- holiday
                THEN NA.Price -- NO Discount on weekend or holiday
            ELSE NA.Price * TT.Discount * TM.Discount
            END
        FROM inserted NA
        INNER JOIN AFZ_Tickets T ON NA.Ticket_ID = T.Ticket_ID
        INNER JOIN AFZ_Ticket_Type TT ON T.Ticket_Type_ID = TT.Ticket_Type_ID
        INNER JOIN AFZ_Ticket_Method Tm ON T.Method_Type_ID = TM.Method_Type_ID

        UPDATE AFZ_Activity
        SET AFZ_Activity.Amount_Due = T.TotalPrice
        FROM (
            SELECT Activity_ID, SUM(Price) AS TotalPrice
            FROM AFZ_Tickets
            GROUP BY Activity_ID
        ) AS T
        INNER JOIN AFZ_Activity ON T.Activity_ID = AFZ_Activity.Activity_ID
        INNER JOIN inserted NA on NA.Activity_ID = T.Activity_ID

     END
go





CREATE TRIGGER UpdateParkAmountDue
     ON AFZ_Parking
     AFTER INSERT, UPDATE
     AS
     BEGIN
        DECLARE @newAmount TABLE (Activity_ID NUMERIC(5), Amount NUMERIC(10, 2))

        INSERT INTO @newAmount
        SELECT P.Activity_ID, SUM(P.Fee * DATEDIFF(SECOND, i.Time_In, i.Time_Out) / 3600.0)
        FROM AFZ_Parking P
        INNER JOIN inserted i ON P.Activity_ID = i.Activity_ID
        GROUP BY P.Activity_ID

        UPDATE AFZ_Activity
        SET AFZ_Activity.Amount_Due = NA.Amount
        FROM @newAmount NA
        JOIN AFZ_Activity ON NA.Activity_ID = AFZ_Activity.Activity_ID
     END
GO

CREATE TRIGGER UpdateShowAmountDue
     ON AFZ_Activity
     AFTER INSERT, UPDATE
     AS
     BEGIN
        DECLARE @newAmount TABLE (Activity_ID NUMERIC(5), Amount NUMERIC(10, 2))

        INSERT INTO @newAmount
        SELECT i.Activity_ID, SUM(S.Price)
        FROM AFZ_Shows S
        INNER JOIN inserted i ON i.Facility_ID = S.Facility_ID
        where i.Source_Type = 'Shw'
        GROUP BY i.Activity_ID

        UPDATE AFZ_Activity
        SET AFZ_Activity.Amount_Due =
            CASE WHEN DATEDIFF(year, AV.Birthdate, getutcdate()) <= 7
                 THEN 0
                 ELSE NA.Amount
            END
        FROM @newAmount NA
        JOIN AFZ_Activity ON NA.Activity_ID = AFZ_Activity.Activity_ID
        INNER JOIN AFZ_Visitors AV on AFZ_Activity.Visitor_ID = AV.Visitor_ID
     END

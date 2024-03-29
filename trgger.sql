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

        DECLARE @memDicNum TABLE (Visitor_ID NUMERIC(5), usedCount NUMERIC(1), PDate DATE);
        INSERT INTO @memDicNum
        SELECT V.Visitor_ID,
               (CASE WHEN COUNT(T.Ticket_ID) > 5 THEN 5 ELSE COUNT(T.Ticket_ID) END) AS Activity_Count,
               CAST(T.Purchase_Date AS DATE)
        FROM AFZ_Visitors V
        LEFT JOIN AFZ_Activity AA2 ON V.Visitor_ID = AA2.Visitor_ID
        LEFT JOIN AFZ_Tickets T ON AA2.Activity_ID = T.Activity_ID
        WHERE Ticket_Type_ID IN (3, 5, 6)
        GROUP BY V.Visitor_ID, CAST(T.Purchase_Date AS DATE);

        IF EXISTS (SELECT m.*
            FROM @memDicNum AS m
            INNER JOIN AFZ_Activity AS a ON m.Visitor_ID = a.Visitor_ID
            INNER JOIN inserted AS i ON i.Activity_ID = a.Activity_ID)
        BEGIN
            INSERT INTO @pendingMemberTicketNum
            SELECT
                AA2.Visitor_ID,
                CASE
                    WHEN COUNT(T.Ticket_ID) > 5 - (SELECT MU.usedCount FROM @memDicNum MU WHERE MU.Visitor_ID = AA2.Visitor_ID)
                        THEN 5 - (SELECT MU.usedCount FROM @memDicNum MU WHERE MU.Visitor_ID = AA2.Visitor_ID)
                    ELSE COUNT(T.Ticket_ID)
                END,
                CAST(T.Purchase_Date AS DATE)
            FROM
                AFZ_Activity AA2
                INNER JOIN AFZ_Tickets T ON AA2.Activity_ID = T.Activity_ID
                INNER JOIN AFZ_Visitors V ON V.Visitor_ID = AA2.Visitor_ID
            WHERE
                V.Visitor_Type_ID = 3
                AND Ticket_Type_ID NOT IN (3, 5, 6)
            GROUP BY
                AA2.Visitor_ID,
                CAST(T.Purchase_Date AS DATE);

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
          AND Subquery.RowNum <= RM.RemainCount; -- select only the top-ranked row in each group


        UPDATE AFZ_Tickets
        SET AFZ_Tickets.Ticket_Type_ID =
            CASE WHEN DATEDIFF(year, AV.Birthdate, getutcdate()) <= 7
                    THEN CASE WHEN T.Ticket_Type_ID = 3
                            THEN 5 -- child-member ticket
                         ELSE 1 -- child ticket
                         END
                 WHEN DATEDIFF(year, AV.Birthdate, getutcdate()) >= 60
                    THEN CASE WHEN T.Ticket_Type_ID = 3
                            THEN 6 -- senior-member ticket
                         ELSE 4 -- senior ticket
                         END
                 ELSE T.Ticket_Type_ID
            END
        FROM inserted NA
        INNER JOIN AFZ_Tickets T ON NA.Ticket_ID = T.Ticket_ID
        INNER JOIN AFZ_Activity A on A.Activity_ID = NA.Activity_ID
        INNER JOIN AFZ_Visitors AV on A.Visitor_ID = AV.Visitor_ID;

        SELECT NA.Ticket_ID, ATT.Ticket_Type, ATT.Discount, ATM.Method_Type, ATM.Discount
        FROM AFZ_Tickets AT
        JOIN inserted NA ON NA.Ticket_ID = AT.Ticket_ID
        JOIN AFZ_Ticket_Type ATT on ATT.Ticket_Type_ID = AT.Ticket_Type_ID
        JOIN AFZ_Ticket_Method ATM on AT.Method_Type_ID = ATM.Method_Type_ID;


        DECLARE @DisPrice TABLE (Ticket_ID NUMERIC(5), After_Price NUMERIC(10,2));

        INSERT INTO @DisPrice
        SELECT
           NA.Ticket_ID,
           (CASE WHEN (DATENAME(WEEKDAY, NA.Purchase_Date) IN ('Saturday', 'Sunday')) -- weekend
                    OR (EXISTS (SELECT * FROM AFZ_Holidays WHERE Holiday_Date = NA.Purchase_Date)) -- holiday
                THEN NA.Price -- NO Discount on weekend or holiday
                ELSE NA.Price * TT.Discount * TM.Discount END) AS After_Price
        FROM inserted NA
        INNER JOIN AFZ_Tickets T ON NA.Ticket_ID = T.Ticket_ID
        INNER JOIN AFZ_Ticket_Type TT ON T.Ticket_Type_ID = TT.Ticket_Type_ID
        INNER JOIN AFZ_Ticket_Method Tm ON T.Method_Type_ID = TM.Method_Type_ID;


        UPDATE AFZ_Activity
        SET AFZ_Activity.Amount_Due = T.After_Price +
            COALESCE(
                (
                    SELECT SUM(Prev.Amount_Due)
                    FROM AFZ_Activity Prev
                    WHERE Prev.Activity_ID = AA.Activity_ID
                ), 0
            )
        FROM @DisPrice AS T
        INNER JOIN inserted NA on NA.Ticket_ID = T.Ticket_ID
        INNER JOIN AFZ_Activity AA ON NA.Activity_ID = AA.Activity_ID;
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
     ON AFZ_Show_Watch
     AFTER INSERT
     AS
     BEGIN
        DECLARE @newAmount TABLE (Activity_ID NUMERIC(5), Amount NUMERIC(10, 2))

        INSERT INTO @newAmount
        SELECT i.Activity_ID, SUM(S.Price)
        FROM AFZ_Shows S
        join AFZ_Show_Schedule ss on ss.Show_Facility_ID = s.Facility_ID
        INNER JOIN inserted i ON i.SS_ID = ss.Show_Facility_ID
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


CREATE TRIGGER UpdateMasterActivity
    ON AFZ_Activity
    AFTER UPDATE, INSERT
AS
BEGIN
    IF EXISTS (SELECT Master_Activity_ID FROM inserted)
    BEGIN
        UPDATE A
        SET A.Amount_Due =
            (SELECT SUM(COALESCE(B.Amount_Due, 0))
             FROM AFZ_Activity B
             WHERE B.Master_Activity_ID = I.Master_Activity_ID
                OR B.Activity_ID = I.Master_Activity_ID)
        FROM AFZ_Activity A
        INNER JOIN inserted I ON A.Activity_ID = I.Master_Activity_ID;

    END
END
go


CREATE TRIGGER UpdateShowAmountDue
     ON AFZ_Show_Watch
     AFTER INSERT
     AS
     BEGIN
        DECLARE @newAmount TABLE (Activity_ID NUMERIC(5), Amount NUMERIC(10, 2))

        INSERT INTO @newAmount
        SELECT i.Activity_ID, SUM(S.Price)
        FROM AFZ_Shows S
        join AFZ_Show_Schedule ss on ss.Show_Facility_ID = s.Facility_ID
        INNER JOIN inserted i ON i.SS_ID = ss.Show_Facility_ID
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
GO

CREATE TRIGGER UpdateGuestVisitor
    ON AFZ_Visitors
    INSTEAD OF INSERT
AS
BEGIN
    IF EXISTS (
        SELECT inserted.Visitor_ID
        FROM inserted
        JOIN AFZ_Visitors on AFZ_Visitors.Email = inserted.Email
        WHERE inserted.Visitor_Type_ID != 6
    )
    BEGIN
        UPDATE AFZ_Visitors
        SET AFZ_Visitors.Birthdate = inserted.Birthdate,
            AFZ_Visitors.Fname = inserted.Fname,
            AFZ_Visitors.Lname = inserted.Lname,
            AFZ_Visitors.Password = inserted.Password,
            AFZ_Visitors.Cell_Number = inserted.Cell_Number,
            AFZ_Visitors.City = inserted.City
            FROM inserted
            WHERE AFZ_Visitors.Email = inserted.Email
    END
    ELSE
    BEGIN
        INSERT INTO AFZ_Visitors (Fname, Lname, City, Email, Cell_Number, Birthdate, Password)
        SELECT Fname, Lname, City, Email, Cell_Number, Birthdate, Password
        FROM inserted
    END
END





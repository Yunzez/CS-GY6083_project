CREATE PROCEDURE get_summary_data_by_date (@input_date DATE) AS
BEGIN
    SELECT AA.Visitor_ID, (AA.Source_Type + '-' +
    CAST(
        (case
            when AA.Source_Type = 'Tic'
            then AT.Ticket_ID
            when AA.Facility_ID is not null
            then AP.Facility_ID
            else AA.Activity_ID
            END
        )
        AS VARCHAR(5))) AS Source_ID, AA.Source_Type,
    source_Type_name AS Sore_Type, Payment_ID,
    (case
        when AA.Source_Type = 'Tic'
            then AT.Price
        when AA.Source_Type = 'Shw'
            then SHOWS.Price
        when AA.Source_Type = 'Sto'
            then AP.Payment_Amount
        when AA.Source_Type = 'Par'
            then Amount_Due
        else 0
    end
    ) as price ,
    (
    case when (DATENAME(WEEKDAY, AA.Activity_Date) IN ('Saturday', 'Sunday')) -- weekend
                    OR (EXISTS (SELECT * FROM AFZ_Holidays WHERE Holiday_Date = AA.Activity_Date)) -- holiday
            then 1
        when AA.Source_Type = 'Tic'
            then ATT.Discount * ATM.Discount
        WHEN AA.Source_Type = 'Shw'
            then case when DATEDIFF(year, AV.Birthdate, getutcdate()) <= 7
                    then 0 -- free show for child
                else 1
                end
        else 1
    end
    ) as discount,
    AP.Payment_Amount as "amount(after discount)",
    Cast(AA.Activity_Date as DATE) as Visit_date
        FROM AFZ_Activity AA
        JOIN AFZ_Payment AP on AA.Activity_ID = AP.Activity_ID
        LEFT JOIN AFZ_Tickets AT ON AT.Activity_ID = AP.Activity_ID
        left JOIN AFZ_Source_Type AST on AA.Source_Type = AST.Source_Type
        left join AFZ_Facility AF on AF.Facility_ID = AA.Facility_ID
        left join AFZ_Shows SHOWS on AF.Facility_ID = SHOWS.Facility_ID
        left join AFZ_Ticket_Type ATT on AT.Ticket_Type_ID = ATT.Ticket_Type_ID
        left join AFZ_Ticket_Method ATM on AT.Method_Type_ID = ATM.Method_Type_ID
        JOIN AFZ_Visitors AV on AA.Visitor_ID = AV.Visitor_ID
        where cast(AA.Activity_Date as Date) = @input_date
    END
go

CREATE PROCEDURE get_summary_data_by_user_id (@input_id NUMERIC(10)) AS
BEGIN
    SELECT * FROM AFZ_Visitors AV
    JOIN AFZ_Visitor_Type AVT on AV.Visitor_Type_ID = AVT.Visitor_Type_ID
    JOIN AFZ_Activity AA on AV.Visitor_ID = AA.Visitor_ID
    LEFT JOIN AFZ_Activity AA2 ON AA.Activity_ID = AA2.Master_Activity_ID
    LEFT JOIN AFZ_Facility AF on AA.Facility_ID = AF.Facility_ID
    LEFT JOIN AFZ_Parking AP on AA.Activity_ID = AP.Activity_ID
    LEFT JOIN AFZ_Tickets A on AA.Activity_ID = A.Activity_ID
    LEFT JOIN AFZ_Ticket_Method ATM on A.Method_Type_ID = ATM.Method_Type_ID
    LEFT JOIN AFZ_Ticket_Type ATT on A.Ticket_Type_ID = ATT.Ticket_Type_ID
    WHERE AV.Visitor_ID = @input_id
END
go

CREATE PROCEDURE get_unpaid_activity_by_user_id (@input_id NUMERIC(10)) AS
BEGIN
    SELECT AA.Activity_ID, AA.Amount_Due, AA.Activity_Date, AST.Source_Type_Name, AA.Facility_ID, AF.Facility_Name
    FROM AFZ_Activity AA WITH (UPDLOCK)
    LEFT JOIN AFZ_Payment AP on AA.Activity_ID = AP.Activity_ID
    LEFT JOIN AFZ_Source_Type AST on AA.Source_Type = AST.Source_Type
    left join AFZ_Facility AF on AA.Facility_ID = AF.Facility_ID
    WHERE Amount_Due IS NOT NULL AND Payment_Amount IS NULL and AA.Visitor_ID = @input_id
END
go

CREATE PROCEDURE get_expenditure_summary_data_by_user_id (@input_id NUMERIC(10)) AS
BEGIN
    SELECT concat(AV.Fname, ' ', av.Lname) 'Visitor_Name',
           APA.Payment_Date,
           ISNULL(AF.Facility_Name ,'N/A') 'Facility_Name',
           AST.Source_Type_Name,
           APA.Payment_Amount
    FROM AFZ_Visitors AV
    JOIN AFZ_Visitor_Type AVT on AV.Visitor_Type_ID = AVT.Visitor_Type_ID
    JOIN AFZ_Activity AA on AV.Visitor_ID = AA.Visitor_ID
    join AFZ_Payment APA on AA.Activity_ID = APA.Activity_ID
    LEFT JOIN AFZ_Facility AF on AA.Facility_ID = AF.Facility_ID
    LEFT JOIN AFZ_Parking AP on AA.Activity_ID = AP.Activity_ID
    LEFT JOIN AFZ_Source_Type AST on AA.Source_Type = AST.Source_Type
    WHERE AV.Visitor_ID = @input_id
    order by Payment_Date;
END
go

CREATE PROCEDURE buy_ticket
    @email VARCHAR(255),
    @phone varchar(10),
    @fname varchar(10),
    @lname varchar(10),
    @dob date,
    @city varchar(255),
    @visitor_id numeric(5) = NULL,
    @method_id numeric(1),
    @visit_date date,
    @master_activity_id numeric(10) = NULL

AS
BEGIN
    BEGIN TRANSACTION;

    BEGIN TRY
        DECLARE @activity TABLE (Activity_ID NUMERIC(5))
        IF @visitor_id IS NOT NULL AND EXISTS (SELECT * FROM AFZ_Visitors WHERE Visitor_ID = @visitor_id)
        BEGIN
            IF @master_activity_id IS NOT NULL
            BEGIN
                INSERT INTO AFZ_Activity (Source_Type, Visitor_ID, Activity_Date, Master_Activity_ID)
                OUTPUT inserted.Activity_ID INTO @activity
                VALUES ('Tic', (SELECT Visitor_ID FROM AFZ_Visitors WHERE Email = @email), GETDATE(), @master_activity_id);
            END
            ELSE
            BEGIN
                INSERT INTO AFZ_Activity (Source_Type, Visitor_ID, Activity_Date)
                OUTPUT inserted.Activity_ID INTO @activity
                VALUES ('Tic', @visitor_id, GETDATE());
            END
        END
        ELSE
        BEGIN
            DECLARE @new_id TABLE (Visitor_ID NUMERIC(5));
            IF NOT EXISTS (SELECT * FROM AFZ_Visitors WHERE Email = @email)
            BEGIN
                INSERT INTO AFZ_Visitors (Fname, Lname, City, Email, Cell_Number, Birthdate, Visitor_Type_ID)
                OUTPUT inserted.Visitor_ID INTO @new_id
                VALUES (@fname, @lname, @city, @email, @phone, @dob, 6);
            END
            ELSE
            BEGIN
                INSERT INTO @new_id
                SELECT Visitor_ID FROM AFZ_Visitors WHERE Email = @email
            END

            INSERT INTO AFZ_Activity (Source_Type, Visitor_ID, Activity_Date, Master_Activity_ID)
            OUTPUT inserted.Activity_ID INTO @activity
            VALUES ('Tic', (SELECT Visitor_ID FROM @new_id), GETDATE(), @master_activity_id);
        END

        INSERT INTO AFZ_Tickets (Method_Type_ID, Purchase_Date, Visit_Date, Price, Activity_ID)
        VALUES (@method_id, GETDATE(), @visit_date, 100, (select Activity_ID from @activity));
        SELECT * FROM @activity;

        -- Commit the transaction if everything is successful
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH

        -- Log the error or re-raise it if necessary
        SELECT 'Error encountered';
        -- If there is an error, roll back the transaction
        ROLLBACK TRANSACTION;

        -- THROW;
    END CATCH;
END;
go

CREATE PROCEDURE online_pay_for_activity
    @FirstName VARCHAR(50),
    @LastName VARCHAR(50),
    @cardNumber NUMERIC(16),
    @cvc NUMERIC(3),
    @exp VARCHAR(10),
    @Activity_ID NUMERIC(5)
AS
BEGIN
    -- Start a new transaction
    BEGIN TRANSACTION;

    BEGIN TRY
        -- Insert a new customer
        DECLARE @Payments TABLE (Payment_ID NUMERIC(5));
        INSERT INTO AFZ_Payment (Payment_Amount, Payment_Date, Payment_Method, Facility_ID, Activity_ID)
        OUTPUT INSERTED.Payment_ID INTO @Payments
        SELECT Amount_Due, GETDATE(), 'Card', Facility_ID, @Activity_ID
        FROM AFZ_Activity
        WHERE Activity_ID = @Activity_ID;
        DECLARE @date DATE = CAST(@exp + '-01' AS DATE);

        INSERT INTO AFZ_Card_Payment (Payment_ID, Card_Number, Holder_FName, Holder_LName, CVV, Expiration_Date, Card_Type)
        SELECT p.Payment_ID, @cardNumber, @FirstName, @LastName, @cvc, EOMONTH(@date), 'credit'
        FROM @Payments p;

        -- Commit the transaction if everything is successful

        SELECT 'end';
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH

        -- Log the error or re-raise it if necessary
        SELECT 'Error encountered';
        -- If there is an error, roll back the transaction
        ROLLBACK TRANSACTION;

        -- THROW;
    END CATCH;
END;
go


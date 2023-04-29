CREATE PROCEDURE get_summary_data_by_date (@input_date DATE) AS
    IF (@input_date >= GETDATE())
BEGIN
    RAISERROR('Input date cannot be larger than or equal to today''s date', 16, 1);
    RETURN;
END
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


EXECUTE get_summary_data_by_date '2023-04-03';

-- DROP PROCEDURE get_summary_data_by_date;

CREATE PROCEDURE get_summary_data_by_user_id (@input_id NUMERIC(10)) AS
BEGIN
    SELECT * FROM AFZ_Visitors AV
    JOIN AFZ_Visitor_Type AVT on AV.Visitor_Type_ID = AVT.Visitor_Type_ID
    JOIN AFZ_Activity AA on AV.Visitor_ID = AA.Visitor_ID
    LEFT JOIN AFZ_Facility AF on AA.Facility_ID = AF.Facility_ID
    LEFT JOIN AFZ_Parking AP on AA.Activity_ID = AP.Activity_ID
    LEFT JOIN AFZ_Tickets A on AA.Activity_ID = A.Activity_ID
    LEFT JOIN AFZ_Ticket_Method ATM on A.Method_Type_ID = ATM.Method_Type_ID
    LEFT JOIN AFZ_Ticket_Type ATT on A.Ticket_Type_ID = ATT.Ticket_Type_ID
    WHERE AV.Visitor_ID = @input_id
END

EXECUTE dbo.get_summary_data_by_user_id 2;
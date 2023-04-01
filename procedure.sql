CREATE PROCEDURE get_summary_data_by_date (@input_date DATE) AS
BEGIN
    SELECT AA.Visitor_ID, (AA.Source_Type + '-' +
        CAST((case
                when AA.Source_Type = 'Tic'
                    then AT.Ticket_ID
                when AA.Facility_ID is not null
                    then AP.Facility_ID
                else AA.Activity_ID
              END) AS VARCHAR(5))) AS Source_ID, AA.Source_Type,
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
           ) as 'amount_due(Price)',
       Cast(AA.Activity_Date as DATE) as Visit_date
        FROM AFZ_Activity AA
        JOIN AFZ_Payment AP on AA.Activity_ID = AP.Activity_ID
        LEFT JOIN AFZ_Tickets AT ON AT.Activity_ID = AP.Activity_ID
        JOIN AFZ_Source_Type AST on AA.Source_Type = AST.Source_Type
        join AFZ_Visitors AV on AA.Visitor_ID = AV.Visitor_ID
        join AFZ_Facility AF on AST.Source_Type = AF.Source_Type
        join AFZ_Shows SHOWS on AF.Facility_ID = SHOWS.Facility_ID
        order by Visitor_ID
END

EXECUTE get_summary_data_by_date '2023-04-03';

-- DROP PROCEDURE get_summary_data_by_date;
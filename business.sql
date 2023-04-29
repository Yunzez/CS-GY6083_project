-- Q1) Table joins with at least 3 tables in join
SELECT Facility_Name, Location_Name, SUM(Payment_Amount) 'Total gained payment'
FROM AFZ_Payment
join AFZ_Facility AF on AF.Facility_ID = AFZ_Payment.Facility_ID
join AFZ_Locations on AF.Location_Section_ID = AFZ_Locations.Location_Section_ID
GROUP BY Facility_Name, Location_Name

-- Q2) Multi-row subquery

-- Q3) Correlated subquery

-- Q4) SET operator query

-- Q5) Query with in line view or WITH clause

-- Q6) TOP-N query
SELECT TOP 10 Facility_Name, SUM(Payment_Amount) 'Total gained payment'
FROM AFZ_Payment
join AFZ_Facility AF on AF.Facility_ID = AFZ_Payment.Facility_ID
GROUP BY Facility_Name
ORDER BY SUM(Payment_Amount) DESC;
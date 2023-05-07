-- Q1) Table joins with at least 3 tables in join
SELECT Facility_Name, Location_Name, SUM(Payment_Amount) 'Total gained payment'
FROM AFZ_Payment
join AFZ_Facility AF on AF.Facility_ID = AFZ_Payment.Facility_ID
join AFZ_Locations on AF.Location_Section_ID = AFZ_Locations.Location_Section_ID
GROUP BY Facility_Name, Location_Name;

-- Q2) Multi-row subquery
-- selecting the ride name, height requirement, attraction type, and the total number of times each attraction
-- ride has been ridden. The subquery is used to count the number of times each ride has been ridden,
-- and it is included as a column in the outer query.
SELECT Facility_Name, Minimum_Height, Attraction_Type,
       (SELECT COUNT(*) FROM AFZ_Activity AA WHERE AA.Facility_ID = AA2.Facility_ID) AS Average_Attraction_Duration
FROM AFZ_Attractions AA2
JOIN AFZ_Facility AF on AF.Facility_ID = AA2.Facility_ID
join AFZ_Attraction_Type AAT ON AA2.Attraction_Type_ID = AAT.Attraction_Type_ID;

-- Q3) Correlated subquery
-- Get selecting the Show name and price from the AFZ_Shows table for shows
-- whose price is greater than the average price for their type.
SELECT AF.Facility_Name, Price
FROM AFZ_Shows S1
JOIN AFZ_Facility AF on AF.Facility_ID = S1.Facility_ID
WHERE Price > (SELECT AVG(Price) FROM AFZ_Shows S2 WHERE S2.Show_Type_ID = S1.Show_Type_ID);


-- Q4) SET operator query
-- Get the visitor from Seattle and New York and UNION them together.
SELECT CONCAT(Fname, ' ', Lname) AS Customer_Name, City, Cell_Number
FROM AFZ_Visitors AV
WHERE AV.City = 'Seattle'
UNION
SELECT CONCAT(Fname, ' ', Lname) AS Customer_Name, City, Cell_Number
FROM AFZ_Visitors AV
WHERE AV.City = 'New York';

-- Q5) Query with in line view or WITH clause
-- Get the unit price of the items whose average unit price is above $20 over all stores.
WITH CTE_Item_Avg_Unit_Price AS (
    SELECT Item_ID, AVG(Unit_Price) AS Avg_Unit_Price
    FROM AFZ_Item_Store
    WHERE Unit_Price > 20
    GROUP BY Item_ID
)
SELECT Item_Name, Facility_Name, Unit_Price, CTE_Item_Avg_Unit_Price.Avg_Unit_Price AS Average_Unit_Price
FROM AFZ_Item_Store
JOIN AFZ_Item ON AFZ_Item_Store.Item_ID = AFZ_Item.Item_ID
JOIN AFZ_Store ON AFZ_Item_Store.Facility_ID = AFZ_Store.Facility_ID
JOIN AFZ_Facility ON AFZ_Store.Facility_ID = AFZ_Facility.Facility_ID
JOIN CTE_Item_Avg_Unit_Price ON AFZ_Item_Store.Item_ID = CTE_Item_Avg_Unit_Price.Item_ID
WHERE CTE_Item_Avg_Unit_Price.Avg_Unit_Price IS NOT NULL;


-- Q6) TOP-N query
-- selects the top 10 facilities with the highest total payment amounts from the AFZ_Payment and AFZ_Facility tables.
SELECT TOP 10 Facility_Name, SUM(Payment_Amount) 'Total gained payment'
FROM AFZ_Payment
join AFZ_Facility AF on AF.Facility_ID = AFZ_Payment.Facility_ID
GROUP BY Facility_Name
ORDER BY SUM(Payment_Amount) DESC;
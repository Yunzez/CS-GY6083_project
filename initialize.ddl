-- 生成者Oracle SQL Developer Data Modeler 22.2.0.165.1149
--   时间:        2023-04-08 13:26:17 EDT
--   站点:      SQL Server 2012
--   类型:      SQL Server 2012



CREATE TABLE AFZ_Activity 
    (
     Activity_ID NUMERIC (10) NOT NULL IDENTITY NOT FOR REPLICATION , 
     Amount_Due NUMERIC (10,2) , 
     Facility_ID NUMERIC (5) , 
     Source_Type VARCHAR (3) NOT NULL , 
     Visitor_ID NUMERIC (6) NOT NULL , 
     Activity_Date DATETIME NOT NULL 
    )
GO 


EXEC sp_addextendedproperty 'MS_Description' , 'The UID of the activity' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Activity' , 'COLUMN' , 'Activity_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The total amount due to the Activity.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Activity' , 'COLUMN' , 'Amount_Due' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The ID of the facility of Activity
' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Activity' , 'COLUMN' , 'Facility_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The type of the facility of the Activity.
' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Activity' , 'COLUMN' , 'Source_Type' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The Visitor in the acitivity
' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Activity' , 'COLUMN' , 'Visitor_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The Date that the activity happens.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Activity' , 'COLUMN' , 'Activity_Date' 
GO

ALTER TABLE AFZ_Activity ADD CONSTRAINT AFZ_Activity_PK PRIMARY KEY CLUSTERED (Activity_ID)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE AFZ_Attraction_Status 
    (
     Status_Type_ID NUMERIC (1) NOT NULL IDENTITY NOT FOR REPLICATION , 
     Status_Type VARCHAR (32) NOT NULL 
    )
GO 



EXEC sp_addextendedproperty 'MS_Description' , 'Unique status type.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Attraction_Status' , 'COLUMN' , 'Status_Type_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'Status Type: open, closed, under maintenance' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Attraction_Status' , 'COLUMN' , 'Status_Type' 
GO

ALTER TABLE AFZ_Attraction_Status ADD CONSTRAINT AFZ_Attraction_Status_PK PRIMARY KEY CLUSTERED (Status_Type_ID)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE AFZ_Attraction_Type 
    (
     Attraction_Type_ID NUMERIC (2) NOT NULL IDENTITY NOT FOR REPLICATION , 
     Attraction_Type VARCHAR (32) NOT NULL , 
     Description VARCHAR (255) NOT NULL 
    )
GO 



EXEC sp_addextendedproperty 'MS_Description' , 'Unique attraction type.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Attraction_Type' , 'COLUMN' , 'Attraction_Type_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'Attraction type:roller coaster, water ride, dark ride, kid ride etc' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Attraction_Type' , 'COLUMN' , 'Attraction_Type' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The description of the Type of Attraction.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Attraction_Type' , 'COLUMN' , 'Description' 
GO

ALTER TABLE AFZ_Attraction_Type ADD CONSTRAINT AFZ_Attraction_Type_PK PRIMARY KEY CLUSTERED (Attraction_Type_ID)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE AFZ_Attractions 
    (
     Facility_ID NUMERIC (5) NOT NULL , 
     Minimum_Height NUMERIC (3) NOT NULL , 
     Durations NUMERIC (3) NOT NULL , 
     Attraction_Type_ID NUMERIC (2) NOT NULL , 
     Status_Type_ID NUMERIC (1) NOT NULL 
    )
GO 



EXEC sp_addextendedproperty 'MS_Description' , 'The UID of the facility. The primary key' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Attractions' , 'COLUMN' , 'Facility_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The minimum height required to enter the attraction. (Unit: inch)' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Attractions' , 'COLUMN' , 'Minimum_Height' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The durations of the attraction.(Unit: second)' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Attractions' , 'COLUMN' , 'Durations' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The type of the attraction' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Attractions' , 'COLUMN' , 'Attraction_Type_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The status of the attraction' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Attractions' , 'COLUMN' , 'Status_Type_ID' 
GO

ALTER TABLE AFZ_Attractions ADD CONSTRAINT AFZ_Attractions_PK PRIMARY KEY CLUSTERED (Facility_ID)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE AFZ_Card_Payment 
    (
     Payment_ID NUMERIC (10) NOT NULL , 
     Card_Number NUMERIC (16) NOT NULL , 
     Holder_FName VARCHAR (20) NOT NULL , 
     Holder_LName VARCHAR (20) NOT NULL , 
     CVV NUMERIC (3) NOT NULL , 
     Expiration_Date DATE NOT NULL , 
     Card_Type VARCHAR (6) NOT NULL 
    )
GO 



EXEC sp_addextendedproperty 'MS_Description' , 'The payment of the visitor pay for each source.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Card_Payment' , 'COLUMN' , 'Payment_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The Card number of the payment' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Card_Payment' , 'COLUMN' , 'Card_Number' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'First name of the card holder.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Card_Payment' , 'COLUMN' , 'Holder_FName' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'Last name of the card holder.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Card_Payment' , 'COLUMN' , 'Holder_LName' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The CVV number of the card' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Card_Payment' , 'COLUMN' , 'CVV' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The Expiration date of the card' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Card_Payment' , 'COLUMN' , 'Expiration_Date' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The type of the card, to determine whether it is credit or debit.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Card_Payment' , 'COLUMN' , 'Card_Type' 
GO

ALTER TABLE AFZ_Card_Payment ADD CONSTRAINT AFZ_Card_Payment_PK PRIMARY KEY CLUSTERED (Payment_ID)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE AFZ_Facility 
    (
     Facility_ID NUMERIC (5) NOT NULL IDENTITY NOT FOR REPLICATION , 
     Source_Type VARCHAR (3) NOT NULL , 
     Facility_URL VARCHAR (255) NOT NULL , 
     Facility_Description VARCHAR (255) NOT NULL , 
     Facility_Name VARCHAR (100) NOT NULL , 
     Location_Section_ID VARCHAR (2) NOT NULL 
    )
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The UID of the facility. The primary key' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Facility' , 'COLUMN' , 'Facility_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The Type of the Facility.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Facility' , 'COLUMN' , 'Source_Type' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The URL of the image of the Facility.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Facility' , 'COLUMN' , 'Facility_URL' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'the Description of the Facility.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Facility' , 'COLUMN' , 'Facility_Description' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The Name of the Facility.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Facility' , 'COLUMN' , 'Facility_Name' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The id of the Facfility location' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Facility' , 'COLUMN' , 'Location_Section_ID' 
GO

ALTER TABLE AFZ_Facility ADD CONSTRAINT AFZ_Facility_PK PRIMARY KEY CLUSTERED (Facility_ID)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE AFZ_Holidays 
    (
     Holiday_Date DATETIME NOT NULL , 
     Holiday_Name VARCHAR (50) NOT NULL 
    )
GO 



EXEC sp_addextendedproperty 'MS_Description' , 'The date of the holiday.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Holidays' , 'COLUMN' , 'Holiday_Date' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The holiday name.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Holidays' , 'COLUMN' , 'Holiday_Name' 
GO

ALTER TABLE AFZ_Holidays ADD CONSTRAINT AFZ_Holidays_PK PRIMARY KEY CLUSTERED (Holiday_Date)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE AFZ_Item 
    (
     Item_ID NUMERIC (5) NOT NULL IDENTITY NOT FOR REPLICATION , 
     Item_Name VARCHAR (20) NOT NULL , 
     Item_Des VARCHAR (128) NOT NULL 
    )
GO 



EXEC sp_addextendedproperty 'MS_Description' , 'The UID of the item. Primary Key of this table.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Item' , 'COLUMN' , 'Item_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The Name of this Item' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Item' , 'COLUMN' , 'Item_Name' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The Description of the Item.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Item' , 'COLUMN' , 'Item_Des' 
GO

ALTER TABLE AFZ_Item ADD CONSTRAINT AFZ_Item_PK PRIMARY KEY CLUSTERED (Item_ID)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE AFZ_Item_Store 
    (
     Item_ID NUMERIC (5) NOT NULL , 
     Facility_ID NUMERIC (5) NOT NULL , 
     Unit_Price NUMERIC (5,2) NOT NULL 
    )
GO 



EXEC sp_addextendedproperty 'MS_Description' , 'UID of the item.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Item_Store' , 'COLUMN' , 'Item_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The UID of store' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Item_Store' , 'COLUMN' , 'Facility_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The unit price of the item in the store' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Item_Store' , 'COLUMN' , 'Unit_Price' 
GO

ALTER TABLE AFZ_Item_Store ADD CONSTRAINT AFZ_Item_Store_PK PRIMARY KEY CLUSTERED (Item_ID, Facility_ID)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE AFZ_Locations 
    (
     Location_Section_ID VARCHAR (2) NOT NULL , 
     Location_Description VARCHAR (255) NOT NULL , 
     Location_URL VARCHAR (255) NOT NULL , 
     Location_Name VARCHAR (50) NOT NULL 
    )
GO 



EXEC sp_addextendedproperty 'MS_Description' , 'Unique location section id.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Locations' , 'COLUMN' , 'Location_Section_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The Description of the Location Section.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Locations' , 'COLUMN' , 'Location_Description' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The URL of the image of this Section.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Locations' , 'COLUMN' , 'Location_URL' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The Name of the section.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Locations' , 'COLUMN' , 'Location_Name' 
GO

ALTER TABLE AFZ_Locations ADD CONSTRAINT AFZ_Locations_PK PRIMARY KEY CLUSTERED (Location_Section_ID)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE AFZ_Order 
    (
     Order_ID NUMERIC (5) NOT NULL IDENTITY NOT FOR REPLICATION , 
     Activity_ID NUMERIC (10) NOT NULL , 
     Quantity NUMERIC (5) NOT NULL , 
     Order_Date DATETIME NOT NULL , 
     Item_ID NUMERIC (5) NOT NULL , 
     Store_Facility_ID NUMERIC (5) NOT NULL 
    )
GO 



EXEC sp_addextendedproperty 'MS_Description' , 'The primary key of this table.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Order' , 'COLUMN' , 'Order_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The ID of the activity' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Order' , 'COLUMN' , 'Activity_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'Item quantity in order. ' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Order' , 'COLUMN' , 'Quantity' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The date of the order
' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Order' , 'COLUMN' , 'Order_Date' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The Item ID in this order.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Order' , 'COLUMN' , 'Item_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The Facility ID of this order' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Order' , 'COLUMN' , 'Store_Facility_ID' 
GO

ALTER TABLE AFZ_Order ADD CONSTRAINT AFZ_Order_PK PRIMARY KEY CLUSTERED (Order_ID)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE AFZ_Parking 
    (
     Activity_ID NUMERIC (10) NOT NULL , 
     Time_In DATETIME NOT NULL , 
     Time_Out DATETIME NOT NULL , 
     Spot_Number NUMERIC (3) NOT NULL , 
     Parking_Section_ID NUMERIC (2) NOT NULL , 
     Fee NUMERIC (5,2) NOT NULL 
    )
GO 



EXEC sp_addextendedproperty 'MS_Description' , 'The UID of the activity' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Parking' , 'COLUMN' , 'Activity_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The time the visitor starts parking' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Parking' , 'COLUMN' , 'Time_In' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The time the visitor ends  parking' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Parking' , 'COLUMN' , 'Time_Out' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The Spot Number of the parking lot.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Parking' , 'COLUMN' , 'Spot_Number' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'Section of this spot.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Parking' , 'COLUMN' , 'Parking_Section_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The paring fee.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Parking' , 'COLUMN' , 'Fee' 
GO

ALTER TABLE AFZ_Parking ADD CONSTRAINT AFZ_Parking_PK PRIMARY KEY CLUSTERED (Activity_ID)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE AFZ_Parking_Sections 
    (
     Parking_Section_ID NUMERIC (2) NOT NULL IDENTITY NOT FOR REPLICATION , 
     Parking_Section VARCHAR (1) NOT NULL , 
     Description VARCHAR (255) NOT NULL 
    )
GO 



EXEC sp_addextendedproperty 'MS_Description' , 'Unique location section id.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Parking_Sections' , 'COLUMN' , 'Parking_Section_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'Location Section UID' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Parking_Sections' , 'COLUMN' , 'Parking_Section' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The description of this parking section' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Parking_Sections' , 'COLUMN' , 'Description' 
GO

ALTER TABLE AFZ_Parking_Sections ADD CONSTRAINT AFZ_Parking_Locations_PK PRIMARY KEY CLUSTERED (Parking_Section_ID)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE AFZ_Payment 
    (
     Payment_ID NUMERIC (10) NOT NULL IDENTITY NOT FOR REPLICATION , 
     Payment_Amount NUMERIC (8,2) NOT NULL , 
     Payment_Date DATETIME NOT NULL , 
     Payment_Method VARCHAR (4) NOT NULL , 
     Facility_ID NUMERIC (5) , 
     Activity_ID NUMERIC (10) NOT NULL 
    )
GO 



EXEC sp_addextendedproperty 'MS_Description' , 'The payment of the visitor pay for each source.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Payment' , 'COLUMN' , 'Payment_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'Payment amount.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Payment' , 'COLUMN' , 'Payment_Amount' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'Payment date.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Payment' , 'COLUMN' , 'Payment_Date' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The code of  payment method.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Payment' , 'COLUMN' , 'Payment_Method' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The ID of the facility.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Payment' , 'COLUMN' , 'Facility_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The ID of the activity' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Payment' , 'COLUMN' , 'Activity_ID' 
GO

ALTER TABLE AFZ_Payment ADD CONSTRAINT AFZ_Payment_PK PRIMARY KEY CLUSTERED (Payment_ID)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE AFZ_Show_Schedule 
    (
     SS_ID NUMERIC (5) NOT NULL IDENTITY NOT FOR REPLICATION , 
     Start_Time DATETIME NOT NULL , 
     End_Time DATETIME NOT NULL , 
     Show_Facility_ID NUMERIC (5) NOT NULL 
    )
GO 



EXEC sp_addextendedproperty 'MS_Description' , 'The ID of the Show Schedule' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Show_Schedule' , 'COLUMN' , 'SS_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'Start time of the show.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Show_Schedule' , 'COLUMN' , 'Start_Time' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'End Time of the show.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Show_Schedule' , 'COLUMN' , 'End_Time' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The ID of the show.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Show_Schedule' , 'COLUMN' , 'Show_Facility_ID' 
GO

ALTER TABLE AFZ_Show_Schedule ADD CONSTRAINT AFZ_Show_Schedule_PK PRIMARY KEY CLUSTERED (SS_ID)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE AFZ_Show_Type 
    (
     Show_Type_ID NUMERIC (2) NOT NULL IDENTITY NOT FOR REPLICATION , 
     Show_Type VARCHAR (16) NOT NULL , 
     Description VARCHAR (255) NOT NULL 
    )
GO 



EXEC sp_addextendedproperty 'MS_Description' , 'Unique show type id.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Show_Type' , 'COLUMN' , 'Show_Type_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'Show type: drama, musical, comedy, horror, adventure' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Show_Type' , 'COLUMN' , 'Show_Type' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The description of the Type of Show.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Show_Type' , 'COLUMN' , 'Description' 
GO

ALTER TABLE AFZ_Show_Type ADD CONSTRAINT AFZ_Show_Type_PK PRIMARY KEY CLUSTERED (Show_Type_ID)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE AFZ_Show_Watch 
    (
     Activity_ID NUMERIC (10) NOT NULL , 
     Watch_Time DATETIME NOT NULL , 
     SS_ID NUMERIC (5) NOT NULL 
    )
GO 



EXEC sp_addextendedproperty 'MS_Description' , 'The UID of the activity' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Show_Watch' , 'COLUMN' , 'Activity_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The time the visitor watchs the show.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Show_Watch' , 'COLUMN' , 'Watch_Time' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The ID of the Show Schedule' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Show_Watch' , 'COLUMN' , 'SS_ID' 
GO

ALTER TABLE AFZ_Show_Watch ADD CONSTRAINT AFZ_Show_Watch_PK PRIMARY KEY CLUSTERED (Activity_ID)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE AFZ_Shows 
    (
     Facility_ID NUMERIC (5) NOT NULL , 
     Accessibility NUMERIC (1) NOT NULL , 
     Price NUMERIC (8,2) NOT NULL , 
     Show_Type_ID NUMERIC (2) NOT NULL , 
     Duration NUMERIC (4) NOT NULL 
    )
GO 



EXEC sp_addextendedproperty 'MS_Description' , 'The UID of the facility. The primary key' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Shows' , 'COLUMN' , 'Facility_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'Wheelchair accessibility:Yes or No' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Shows' , 'COLUMN' , 'Accessibility' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The price of the show.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Shows' , 'COLUMN' , 'Price' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The UID of the Show' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Shows' , 'COLUMN' , 'Show_Type_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The length of the show. (in minutes)' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Shows' , 'COLUMN' , 'Duration' 
GO

ALTER TABLE AFZ_Shows ADD CONSTRAINT AFZ_Shows_PK PRIMARY KEY CLUSTERED (Facility_ID)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE AFZ_Source_Type 
    (
     Source_Type VARCHAR (3) NOT NULL , 
     Source_Type_Name VARCHAR (20) NOT NULL 
    )
GO 



EXEC sp_addextendedproperty 'MS_Description' , 'The Code of the source Type.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Source_Type' , 'COLUMN' , 'Source_Type' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The full name of the Type of the Facility.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Source_Type' , 'COLUMN' , 'Source_Type_Name' 
GO

ALTER TABLE AFZ_Source_Type ADD CONSTRAINT AFZ_Source_Type_PK PRIMARY KEY CLUSTERED (Source_Type)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE AFZ_Store 
    (
     Facility_ID NUMERIC (5) NOT NULL , 
     Category_ID NUMERIC (2) NOT NULL , 
     Open_Time TIME NOT NULL , 
     Close_Time TIME NOT NULL 
    )
GO 



EXEC sp_addextendedproperty 'MS_Description' , 'The UID of the facility. The primary key' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Store' , 'COLUMN' , 'Facility_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'Category Store ID.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Store' , 'COLUMN' , 'Category_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The open time of the store.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Store' , 'COLUMN' , 'Open_Time' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The close time of the Store.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Store' , 'COLUMN' , 'Close_Time' 
GO

ALTER TABLE AFZ_Store ADD CONSTRAINT AFZ_Store_PK PRIMARY KEY CLUSTERED (Facility_ID)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE AFZ_Store_Category 
    (
     Category_ID NUMERIC (2) NOT NULL IDENTITY NOT FOR REPLICATION , 
     Category VARCHAR (32) NOT NULL , 
     Description VARCHAR (255) NOT NULL 
    )
GO 



EXEC sp_addextendedproperty 'MS_Description' , 'Unique Category Store ID.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Store_Category' , 'COLUMN' , 'Category_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'Store Category:
Food stall, Ice cream parlor, Restaurant, Gift Shop, Apparels' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Store_Category' , 'COLUMN' , 'Category' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The description of the Type of store.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Store_Category' , 'COLUMN' , 'Description' 
GO

ALTER TABLE AFZ_Store_Category ADD CONSTRAINT AFZ_Store_Category_PK PRIMARY KEY CLUSTERED (Category_ID)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE AFZ_Ticket_Method 
    (
     Method_Type_ID NUMERIC (1) NOT NULL IDENTITY NOT FOR REPLICATION , 
     Method_Type VARCHAR (8) NOT NULL , 
     Discount NUMERIC (3,2) NOT NULL 
    )
GO 



EXEC sp_addextendedproperty 'MS_Description' , 'Unique method ID.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Ticket_Method' , 'COLUMN' , 'Method_Type_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'Ticket method: Online, Onsite.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Ticket_Method' , 'COLUMN' , 'Method_Type' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The Discount of this method.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Ticket_Method' , 'COLUMN' , 'Discount' 
GO

ALTER TABLE AFZ_Ticket_Method ADD CONSTRAINT AFZ_Ticket_Method_PK PRIMARY KEY CLUSTERED (Method_Type_ID)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE AFZ_Ticket_Type 
    (
     Ticket_Type_ID NUMERIC (1) NOT NULL IDENTITY NOT FOR REPLICATION , 
     Ticket_Type VARCHAR (32) NOT NULL , 
     Discount NUMERIC (3,2) NOT NULL 
    )
GO 



EXEC sp_addextendedproperty 'MS_Description' , 'Unique ticket type.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Ticket_Type' , 'COLUMN' , 'Ticket_Type_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'Ticket type: Child, Adult, Senior, or Member' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Ticket_Type' , 'COLUMN' , 'Ticket_Type' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The Discount of this method.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Ticket_Type' , 'COLUMN' , 'Discount' 
GO

ALTER TABLE AFZ_Ticket_Type ADD CONSTRAINT AFZ_Ticket_Type_PK PRIMARY KEY CLUSTERED (Ticket_Type_ID)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE AFZ_Tickets 
    (
     Ticket_ID NUMERIC (10) NOT NULL IDENTITY NOT FOR REPLICATION , 
     Method_Type_ID NUMERIC (1) NOT NULL , 
     Ticket_Type_ID NUMERIC (1) NOT NULL , 
     Purchase_Date DATETIME NOT NULL , 
     Visit_Date DATETIME NOT NULL , 
     Validate AS case when CAST(visit_date as DATE) = CAST(getutcdate() as DATE) then 1 else 0 end , 
     Price NUMERIC (10,2) NOT NULL , 
     Activity_ID NUMERIC (10) NOT NULL 
    )
GO 



EXEC sp_addextendedproperty 'MS_Description' , 'The UID of the Ticket' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Tickets' , 'COLUMN' , 'Ticket_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The UID of the ticket purchase  method' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Tickets' , 'COLUMN' , 'Method_Type_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The UID of the Ticket type' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Tickets' , 'COLUMN' , 'Ticket_Type_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'Purchase date of the ticket.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Tickets' , 'COLUMN' , 'Purchase_Date' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'Visit date of the ticket.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Tickets' , 'COLUMN' , 'Visit_Date' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'This is a computed column. Only be 1 while the system date is same to the visit date.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Tickets' , 'COLUMN' , 'Validate' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The Price of this type of ticket.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Tickets' , 'COLUMN' , 'Price' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The ID of the purchase activity
' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Tickets' , 'COLUMN' , 'Activity_ID' 
GO

ALTER TABLE AFZ_Tickets ADD CONSTRAINT AFZ_Tickets_PK PRIMARY KEY CLUSTERED (Ticket_ID)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE AFZ_Visitor_Type 
    (
     Visitor_Type_ID NUMERIC (1) NOT NULL IDENTITY NOT FOR REPLICATION , 
     Visitor_Type VARCHAR (32) NOT NULL 
    )
GO 



EXEC sp_addextendedproperty 'MS_Description' , 'Unique visitor type id.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Visitor_Type' , 'COLUMN' , 'Visitor_Type_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'Vistor type: Individual, Group, Member or Student' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Visitor_Type' , 'COLUMN' , 'Visitor_Type' 
GO

ALTER TABLE AFZ_Visitor_Type ADD CONSTRAINT AFZ_Visitor_Type_PK PRIMARY KEY CLUSTERED (Visitor_Type_ID)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

CREATE TABLE AFZ_Visitors 
    (
     Visitor_ID NUMERIC (6) NOT NULL IDENTITY NOT FOR REPLICATION , 
     Fname VARCHAR (32) NOT NULL , 
     Lname VARCHAR (32) NOT NULL , 
     City VARCHAR (32) NOT NULL , 
     Email VARCHAR (32) NOT NULL , 
     Cell_Number VARCHAR (10) NOT NULL , 
     Birthdate DATE NOT NULL , 
     Visitor_Type_ID NUMERIC (1) NOT NULL DEFAULT 2 , 
     Password VARCHAR (255) NOT NULL 
    )
GO 



EXEC sp_addextendedproperty 'MS_Description' , 'Unique Visitor ID.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Visitors' , 'COLUMN' , 'Visitor_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'First name of visitor' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Visitors' , 'COLUMN' , 'Fname' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'Last name of visitor' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Visitors' , 'COLUMN' , 'Lname' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The city of visitor.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Visitors' , 'COLUMN' , 'City' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The email of visitor' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Visitors' , 'COLUMN' , 'Email' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The cell phone number of visitor.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Visitors' , 'COLUMN' , 'Cell_Number' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The birthdate of the visitor.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Visitors' , 'COLUMN' , 'Birthdate' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The type of the visitor.
' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Visitors' , 'COLUMN' , 'Visitor_Type_ID' 
GO



EXEC sp_addextendedproperty 'MS_Description' , 'The password of the user.' , 'USER' , 'dbo' , 'TABLE' , 'AFZ_Visitors' , 'COLUMN' , 'Password' 
GO

ALTER TABLE AFZ_Visitors ADD CONSTRAINT AFZ_Visitors_PK PRIMARY KEY CLUSTERED (Visitor_ID)
     WITH (
     ALLOW_PAGE_LOCKS = ON , 
     ALLOW_ROW_LOCKS = ON )
GO

ALTER TABLE AFZ_Activity 
    ADD CONSTRAINT Activity_Facility_FK FOREIGN KEY 
    ( 
     Facility_ID
    ) 
    REFERENCES AFZ_Facility 
    ( 
     Facility_ID 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE AFZ_Show_Watch 
    ADD CONSTRAINT Activity_FK FOREIGN KEY 
    ( 
     Activity_ID
    ) 
    REFERENCES AFZ_Activity 
    ( 
     Activity_ID 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE AFZ_Activity 
    ADD CONSTRAINT Activity_Source_Type_FK FOREIGN KEY 
    ( 
     Source_Type
    ) 
    REFERENCES AFZ_Source_Type 
    ( 
     Source_Type 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE AFZ_Activity 
    ADD CONSTRAINT Activity_Visitors_FK FOREIGN KEY 
    ( 
     Visitor_ID
    ) 
    REFERENCES AFZ_Visitors 
    ( 
     Visitor_ID 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE AFZ_Payment 
    ADD CONSTRAINT AFZ_Payment_AFZ_Activity_FK FOREIGN KEY 
    ( 
     Activity_ID
    ) 
    REFERENCES AFZ_Activity 
    ( 
     Activity_ID 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE AFZ_Show_Schedule 
    ADD CONSTRAINT AFZ_Show_Schedule_AFZ_Shows_FK FOREIGN KEY 
    ( 
     Show_Facility_ID
    ) 
    REFERENCES AFZ_Shows 
    ( 
     Facility_ID 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE AFZ_Tickets 
    ADD CONSTRAINT AFZ_Tickets_AFZ_Activity_FK FOREIGN KEY 
    ( 
     Activity_ID
    ) 
    REFERENCES AFZ_Activity 
    ( 
     Activity_ID 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE AFZ_Attractions 
    ADD CONSTRAINT Att_Facility_FK FOREIGN KEY 
    ( 
     Facility_ID
    ) 
    REFERENCES AFZ_Facility 
    ( 
     Facility_ID 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE AFZ_Attractions 
    ADD CONSTRAINT Att_Status_FK FOREIGN KEY 
    ( 
     Status_Type_ID
    ) 
    REFERENCES AFZ_Attraction_Status 
    ( 
     Status_Type_ID 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE AFZ_Attractions 
    ADD CONSTRAINT Att_Type_FK FOREIGN KEY 
    ( 
     Attraction_Type_ID
    ) 
    REFERENCES AFZ_Attraction_Type 
    ( 
     Attraction_Type_ID 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE AFZ_Card_Payment 
    ADD CONSTRAINT Card_Payment_FK FOREIGN KEY 
    ( 
     Payment_ID
    ) 
    REFERENCES AFZ_Payment 
    ( 
     Payment_ID 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE AFZ_Facility 
    ADD CONSTRAINT Facility_Locations_FK FOREIGN KEY 
    ( 
     Location_Section_ID
    ) 
    REFERENCES AFZ_Locations 
    ( 
     Location_Section_ID 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE AFZ_Facility 
    ADD CONSTRAINT Facility_Source_Type_FK FOREIGN KEY 
    ( 
     Source_Type
    ) 
    REFERENCES AFZ_Source_Type 
    ( 
     Source_Type 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE AFZ_Item_Store 
    ADD CONSTRAINT Item_Store_Item_FK FOREIGN KEY 
    ( 
     Item_ID
    ) 
    REFERENCES AFZ_Item 
    ( 
     Item_ID 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE AFZ_Item_Store 
    ADD CONSTRAINT Item_Store_Store_FK FOREIGN KEY 
    ( 
     Facility_ID
    ) 
    REFERENCES AFZ_Store 
    ( 
     Facility_ID 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE AFZ_Order 
    ADD CONSTRAINT Order_Activity_FK FOREIGN KEY 
    ( 
     Activity_ID
    ) 
    REFERENCES AFZ_Activity 
    ( 
     Activity_ID 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE AFZ_Order 
    ADD CONSTRAINT Order_Item_Store_FK FOREIGN KEY 
    ( 
     Item_ID, 
     Store_Facility_ID
    ) 
    REFERENCES AFZ_Item_Store 
    ( 
     Item_ID , 
     Facility_ID 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE AFZ_Parking 
    ADD CONSTRAINT Parking_Activity_FK FOREIGN KEY 
    ( 
     Activity_ID
    ) 
    REFERENCES AFZ_Activity 
    ( 
     Activity_ID 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE AFZ_Parking 
    ADD CONSTRAINT Parking_Section_FK FOREIGN KEY 
    ( 
     Parking_Section_ID
    ) 
    REFERENCES AFZ_Parking_Sections 
    ( 
     Parking_Section_ID 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE AFZ_Payment 
    ADD CONSTRAINT Payment_Facility_FK FOREIGN KEY 
    ( 
     Facility_ID
    ) 
    REFERENCES AFZ_Facility 
    ( 
     Facility_ID 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE AFZ_Show_Watch 
    ADD CONSTRAINT Show_Schedule_FK FOREIGN KEY 
    ( 
     SS_ID
    ) 
    REFERENCES AFZ_Show_Schedule 
    ( 
     SS_ID 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE AFZ_Shows 
    ADD CONSTRAINT Show_Type_FK FOREIGN KEY 
    ( 
     Show_Type_ID
    ) 
    REFERENCES AFZ_Show_Type 
    ( 
     Show_Type_ID 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE AFZ_Shows 
    ADD CONSTRAINT Shows_Facility_FK FOREIGN KEY 
    ( 
     Facility_ID
    ) 
    REFERENCES AFZ_Facility 
    ( 
     Facility_ID 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE AFZ_Store 
    ADD CONSTRAINT Store_Category_FK FOREIGN KEY 
    ( 
     Category_ID
    ) 
    REFERENCES AFZ_Store_Category 
    ( 
     Category_ID 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE AFZ_Store 
    ADD CONSTRAINT Store_Facility_FK FOREIGN KEY 
    ( 
     Facility_ID
    ) 
    REFERENCES AFZ_Facility 
    ( 
     Facility_ID 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE AFZ_Tickets 
    ADD CONSTRAINT Ticket_Method_FK FOREIGN KEY 
    ( 
     Method_Type_ID
    ) 
    REFERENCES AFZ_Ticket_Method 
    ( 
     Method_Type_ID 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE AFZ_Tickets 
    ADD CONSTRAINT Ticket_Type_FK FOREIGN KEY 
    ( 
     Ticket_Type_ID
    ) 
    REFERENCES AFZ_Ticket_Type 
    ( 
     Ticket_Type_ID 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO

ALTER TABLE AFZ_Visitors 
    ADD CONSTRAINT Visitor_Type_FK FOREIGN KEY 
    ( 
     Visitor_Type_ID
    ) 
    REFERENCES AFZ_Visitor_Type 
    ( 
     Visitor_Type_ID 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION 
GO



-- Oracle SQL Developer Data Modeler 概要报告: 
-- 
-- CREATE TABLE                            26
-- CREATE INDEX                             0
-- ALTER TABLE                             56
-- CREATE VIEW                              0
-- ALTER VIEW                               0
-- CREATE PACKAGE                           0
-- CREATE PACKAGE BODY                      0
-- CREATE PROCEDURE                         0
-- CREATE FUNCTION                          0
-- CREATE TRIGGER                           0
-- ALTER TRIGGER                            0
-- CREATE DATABASE                          0
-- CREATE DEFAULT                           0
-- CREATE INDEX ON VIEW                     0
-- CREATE ROLLBACK SEGMENT                  0
-- CREATE ROLE                              0
-- CREATE RULE                              0
-- CREATE SCHEMA                            0
-- CREATE SEQUENCE                          0
-- CREATE PARTITION FUNCTION                0
-- CREATE PARTITION SCHEME                  0
-- 
-- DROP DATABASE                            0
-- 
-- ERRORS                                   0
-- WARNINGS                                 0

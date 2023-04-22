INSERT INTO AFZ_Holidays (Holiday_Date, Holiday_Name) VALUES
('2023-01-01', 'New Year'),
('2023-07-04', 'Independence Day'),
('2023-12-25', 'Christmas Day');

-- add attraction locations
INSERT INTO voa.dbo.AFZ_Locations (Location_Section_ID, Location_Name, Location_Description, Location_URL)
VALUES
       ('AR', 'Adventure Ridge', 'Thrilling rides and attractions for the adventurous at heart.', 'https://afzvoa.blob.core.windows.net/img/voa_img/AR.png'),
       ('FC', 'Fantasy Cove', 'Immerse yourself in a world of fantasy and magic with enchanting rides and attractions.', 'https://afzvoa.blob.core.windows.net/img/voa_img/FC.png'),
       ('SF', 'Sci-Fi Frontier', 'Blast off into the future with high-tech rides and attractions that will transport you to other worlds.', 'https://afzvoa.blob.core.windows.net/img/voa_img/SF.png'),
       ('WK', 'Wild Kingdom', 'Get up close and personal with amazing animals and explore the wonders of nature with exciting rides and attractions.', 'https://afzvoa.blob.core.windows.net/img/voa_img/WK.png');

-- add attraction types
INSERT INTO voa.dbo.AFZ_Attraction_Type (Attraction_Type, Description)
VALUES
       ('Roller Coaster', 'The high-speed thrill rides that typically includes drops, turns, and inversions.'),
       ('Water Ride', 'The rides that involves water, typically include steep drops, splashes, and spray effects.'),
       ('Dark Ride', 'The indoor rides that take guests on journeys through themed environment. '),
       ('Kid Ride', 'The rides designed specifically for young children, typically featuring gentle rides, bright colors, and playful themes.');

-- add attraction status
INSERT INTO voa.dbo.AFZ_Attraction_Status (Status_Type) VALUES (N'open'), (N'closed'), (N'under maintenance');

-- add show types
INSERT INTO voa.dbo.AFZ_Show_Type (Show_Type, Description)
VALUES
       ('Drama', 'A serious and emotional performance that tells a story through dialogue and action. Dramas often explore complex themes and feature intense acting.'),
       ('Musical', 'A theatrical production that includes singing, dancing, and spoken dialogue. Musicals typically feature catchy songs and elaborate choreography.'),
       ('Comedy', 'A performance intended to make the audience laugh through humor and wit. Comedies can include stand-up comedy, sketch comedy, or comedic plays.'),
       ('Horror', 'A show designed to scare and frighten the audience. Horror shows often feature suspenseful music, jump scares, and special effects to create a tense and spooky atmosphere.'),
       ('Adventure', 'A show designed to scare and frighten the audience. Horror shows often feature suspenseful music, jump scares, and special effects to create a tense and spooky atmosphere.');

-- add Parking Locations
INSERT INTO voa.dbo.AFZ_Parking_Sections (Parking_Section, Description)
    VALUES (N'A','Main Entrance Parking'), (N'B','Central Parking'), (N'C','Overflow Parking'), (N'D','Employee Parking');

-- add Store Category
INSERT INTO voa.dbo.AFZ_Store_Category (Category, Description)
VALUES
       (N'Food stall', 'The small food stands that offer a variety of quick and convenient snacks and meals. '),
       (N'Ice cream parlor', 'The shops that serve a variety of ice cream flavors and desserts.'),
       (N'Restaurant', 'The sit-down establishments that offer a menu of full meals and drinks. '),
       (N'Gift Shop', 'The stores that sell a variety of souvenirs and trinkets related to the theme park.'),
       (N'Apparels', 'The stores that sell clothing items related to the theme park.');


-- add items
INSERT INTO voa.dbo.AFZ_Item
    (Item_Name, Item_Des)
VALUES
    ('Hot Dog', 'Classic American street food.'),
    ('Soft Serve Ice Cream', 'Smooth and creamy vanilla ice cream.'),
    ('Burger', 'Juicy beef patty topped with cheese, and beef.'),
    ('Chicken Nuggets', 'Crispy fried chicken pieces.'),
    ('Popcorn', 'Freshly popped buttery popcorn.'),
    ('Pizza Slice', 'Hot and cheesy pizza slice.'),
    ('Cotton Candy', 'Fluffy and sweet spun sugar treat.'),
    ('Pretzel', 'Soft and salty twisted bread snack.'),
    ('Nachos', 'Tortilla chips topped with cheese and salsa.'),
    ('Churro', 'Sweet fried dough pastry.'),
    ('Baseball Cap', 'Classic baseball cap with VOA logo.'),
    ('T-Shirt', 'Comfortable cotton t-shirt with VOA design.'),
    ('Mug', 'Sturdy ceramic mug with VOA branding.'),
    ('Keychain', 'Metal keychain with VOA emblem.'),
    ('Plush Toy', 'Soft and cuddly plush toy of VOA mascot.');

-- add source type
INSERT INTO voa.dbo.AFZ_Source_Type
    (Source_Type, Source_Type_Name)
VALUES
    ('Att', 'Attraction'), ('Par', 'Parking'), ('Shw', 'Show'), ('Sto', 'Store'), ('Tic', 'Ticket');

-- add attraction
DECLARE @insertedIds TABLE (Facility_ID INT);

INSERT INTO voa.dbo.AFZ_Facility (Source_Type, Facility_Name, Facility_Description, Facility_URL, Location_Section_ID)
OUTPUT inserted.Facility_ID INTO @insertedIds
VALUES
    ('Att', 'Thunderbolt', 'A thrilling roller coaster that drops and twists at lightning-fast speeds', 'https://afzvoa.blob.core.windows.net/img/voa_img/Thunderbolt.png', 'AR'),
    ('Att', 'Splash Mountain', 'A water ride that takes you on a daring journey through rapids and waterfalls', 'https://afzvoa.blob.core.windows.net/img/voa_img/SplashMountain.png', 'WK'),
    ('Att', 'Haunted Mansion', 'A spooky dark ride that takes you on a haunted tour of a creepy old mansion', 'https://afzvoa.blob.core.windows.net/img/voa_img/HauntedMansion.png', 'FC'),
    ('Att', 'Dragon''s Lair', 'A thrilling roller coaster that takes you on a journey through a dragon-infested cave', 'https://afzvoa.blob.core.windows.net/img/voa_img/DragonsLair.png', 'AR'),
    ('Att', 'Pirate''s Plunge', 'A water ride that takes you on a high-seas adventure with pirate ships and sea creatures', 'https://afzvoa.blob.core.windows.net/img/voa_img/PiratesPlunge.png', 'WK'),
    ('Att', 'Galactic Adventure', 'A sci-fi themed dark ride that takes you on a journey through space', 'https://afzvoa.blob.core.windows.net/img/voa_img/GalacticAdventure.png', 'SF'),
    ('Att', 'Tea Cup Twirl', 'A gentle kid ride that spins you around in giant teacups', 'https://afzvoa.blob.core.windows.net/img/voa_img/TeaCupTwirl.png', 'FC'),
    ('Att', 'Wild Mouse', 'A thrilling roller coaster that takes you on a fast and twisty ride', 'https://afzvoa.blob.core.windows.net/img/voa_img/WildMouse.png', 'AR'),
    ('Att', 'Lazy River', 'A relaxing water ride that takes you on a peaceful journey down a winding river', 'https://afzvoa.blob.core.windows.net/img/voa_img/LazyRiver.png', 'WK'),
    ('Att', 'Jungle Adventure', 'A dark ride that takes you on a journey through a lush jungle filled with exotic animals', 'https://afzvoa.blob.core.windows.net/img/voa_img/JungleAdventure.png', 'AR'),
    ('Att', 'Kid''s Coaster', 'A gentle roller coaster designed for younger children', 'https://afzvoa.blob.core.windows.net/img/voa_img/KidsCoaster.png', 'FC'),
    ('Att', 'Tidal Wave', 'A thrilling water ride that takes you on a steep drop into a giant wave', 'https://afzvoa.blob.core.windows.net/img/voa_img/TidalWave.png', 'WK'),
    ('Att', 'Space Station', 'A sci-fi themed dark ride that takes you on a journey through a futuristic space station', 'https://afzvoa.blob.core.windows.net/img/voa_img/SpaceStation.png', 'SF'),
    (N'Att', N'Waterfall', N'A roller coaster that will take you through a scenic waterfall.', N'https://afzvoa.blob.core.windows.net/img/voa_img/Waterfall.png', N'AR'),
    (N'Att', N'Dark Knight', N'A roller coaster that will take you on a thrilling ride through the dark.', N'https://afzvoa.blob.core.windows.net/img/voa_img/DarkKnight.png', N'FC');

DECLARE @tem_attractions TABLE (
     Row_Num NUMERIC(5),
     Minimum_Height NUMERIC (3) NOT NULL ,
     Durations NUMERIC (3) NOT NULL ,
     Attraction_Type_ID NUMERIC (2) NOT NULL ,
     Attraction_Status_ID NUMERIC (1) NOT NULL ,
     Attraction_Locations_ID NUMERIC (2) NOT NULL
    );
INSERT INTO @tem_attractions
    (Row_Num, Minimum_Height, Durations, Attraction_Type_ID, Attraction_Status_ID, Attraction_Locations_ID)
VALUES
    (1, 48, 120, 1, 1, 1),
    (2, 42, 90, 2, 2, 2),
    (3, 54, 60, 3, 1, 1),
    (4, 52, 180, 1, 3, 3),
    (5, 48, 75, 2, 1, 1),
    (6, 46, 240, 3, 2, 4),
    (7, 44, 90, 4, 2, 2),
    (8, 54, 120, 1, 3, 3),
    (9, 44, 180, 2, 1, 1),
    (10, 48, 150, 3, 2, 4),
    (11, 44, 60, 4, 3, 3),
    (12, 44, 240, 2, 1, 2),
    (13, 46, 120, 3, 2, 4),
    (14, 48, 90, 2, 3, 1),
    (15, 52, 180, 3, 1, 3);

INSERT INTO voa.dbo.AFZ_Attractions (Minimum_Height, Durations, Attraction_Type_ID, Status_Type_ID, Facility_ID)
SELECT a.Minimum_Height, a.Durations, a.Attraction_Type_ID, a.Attraction_Status_ID, i.Facility_ID
FROM @tem_attractions a
JOIN (SELECT Facility_ID, ROW_NUMBER() OVER (ORDER BY Facility_ID) AS Row_Num
FROM @insertedIds) i ON i.Row_Num = a.Row_Num;



-- add shows
DECLARE @insertedShwIds TABLE (Facility_ID INT);

INSERT INTO voa.dbo.AFZ_Facility (Source_Type, Facility_Name, Facility_Description, Facility_URL, Location_Section_ID)
OUTPUT inserted.Facility_ID INTO @insertedShwIds
VALUES
-- dramas
(N'Shw', N'Secrets of the Lost City', N'A thrilling drama that takes you on a journey through the mysteries of an ancient city.', N'https://afzvoa.blob.core.windows.net/img/voa_img/SecretsoftheLostCity.png', N'AR'),
(N'Shw', N'The Quest', N'A drama that takes you on a journey to find a lost treasure.', N'https://afzvoa.blob.core.windows.net/img/voa_img/TheQuest.png', N'FC'),
(N'Shw', N'The Dark Castle', N'A drama that takes you on a journey through a haunted castle.', N'https://afzvoa.blob.core.windows.net/img/voa_img/TheDarkCastle.png', N'SF'),
-- musicals
(N'Shw', N'Fantasy Dreams', N'A magical musical that takes you on a journey through a world of fantasy and wonder.', N'https://afzvoa.blob.core.windows.net/img/voa_img/FantasyDreams.png', N'FC'),
(N'Shw', N'Space Odyssey', N'A musical that takes you on a journey through the vastness of space.', N'https://afzvoa.blob.core.windows.net/img/voa_img/SpaceOdyssey.png', N'SF'),
(N'Shw', N'Wild Rhythm', N'A musical that takes you on a journey through the rhythms of the wild.', N'https://afzvoa.blob.core.windows.net/img/voa_img/WildRhythm.png', N'WK'),
-- comedies
(N'Shw', N'Laugh Out Loud', N'A comedy that will make you laugh out loud with its hilarious jokes and antics.', N'https://afzvoa.blob.core.windows.net/img/voa_img/LaughOutLoud.png', N'AR'),
(N'Shw', N'Fantasy Follies', N'A comedy that takes you on a journey through a world of fantasy and humor.', N'https://afzvoa.blob.core.windows.net/img/voa_img/FantasyFollies.png', N'FC'),
(N'Shw', N'Galactic Giggles', N'A comedy that takes you on a journey through the galaxy with its funny and quirky characters.', N'https://afzvoa.blob.core.windows.net/img/voa_img/GalacticGiggles.png', N'SF'),
-- horrors
(N'Shw', N'The Haunted Mansion', N'A horror show that takes you on a journey through a haunted mansion.', N'https://afzvoa.blob.core.windows.net/img/voa_img/TheHauntedMansion.png', N'FC'),
(N'Shw', N'Invasion of the Aliens', N'A horror show that takes you on a journey to fight off an alien invasion.', N'https://afzvoa.blob.core.windows.net/img/voa_img/InvasionoftheAliens.png', N'SF'),
(N'Shw', N'The Curse of the Mummy', N'A horror show that takes you on a journey through a cursed tomb.', N'https://afzvoa.blob.core.windows.net/img/voa_img/TheCurseoftheMummy.png', N'WK'),
-- adventures
('Shw', 'Jungle Expedition', 'Join our intrepid explorers on a thrilling journey through the heart of the jungle. Along the way, they encounter dangerous creatures and overcome obstacles to reach their ultimate goal.', 'https://afzvoa.blob.core.windows.net/img/voa_img/JungleExpedition.png', 'AR'),
('Shw', 'Pirate Adventure', 'Avast, mateys! Join our pirate crew as they sail the high seas in search of treasure. Along the way, they face fierce battles and daring escapes.', 'https://afzvoa.blob.core.windows.net/img/voa_img/PirateAdventure.png', 'AR'),
('Shw', 'Survival Challenge', 'Are you up for the ultimate test of survival? Join our contestants as they face harsh conditions and tough challenges in this adrenaline-fueled competition.', 'https://afzvoa.blob.core.windows.net/img/voa_img/SurvivalChallenge.png', 'AR');


DECLARE @tem_shows TABLE
    (
     Row_Num NUMERIC (5) NOT NULL ,
     Accessibility NUMERIC (1) NOT NULL ,
     Price NUMERIC (8,2) NOT NULL ,
     Duration NUMERIC(3) NOt NULL,
     Show_Type_ID NUMERIC (2) NOT NULL
    )
INSERT INTO @tem_shows
    (Row_Num, accessibility, price, Duration, show_type_id)
VALUES
    (1, 1, 25.00, 20, 1),
    (2, 0, 15.00, 30, 1),
    (3, 1, 20.00, 13, 1),
    (4, 1, 30.00, 32, 2),
    (5, 1, 25.00, 22, 2),
    (6, 0, 20.00, 19, 2),
    (7, 1, 25.00, 32, 3),
    (8, 0, 15.00, 33, 3),
    (9, 1, 20.00, 15, 3),
    (10, 1, 30.00, 20, 4),
    (11, 1, 25.00, 20, 4),
    (12, 1, 30.00, 30, 4),
    (13, 1, 25.00, 19, 5),
    (14, 0, 20.00, 32, 5),
    (15, 1, 25.00, 30, 5);

DECLARE @tem_shows_sch TABLE
    (
     Start_Time datetime NOT NULL ,
     End_Time datetime NOT NULL ,
     row_number NUMERIC (10) NOT NULL
    )
INSERT INTO @tem_shows_sch
    (Start_Time, End_Time, row_number)
VALUES
    ('2023-04-01 07:00', dateadd(minute, 20, '2023-04-01 07:00'), 1),
    ('2023-04-01 07:00', dateadd(minute, 30, '2023-04-01 07:00'), 2),
    ('2023-04-01 07:00', dateadd(minute, 13, '2023-04-01 07:00'), 3),
    ('2023-04-01 07:00', dateadd(minute, 32, '2023-04-01 07:00'), 4),
    ('2023-04-01 07:00', dateadd(minute, 22, '2023-04-01 07:00'), 5),
    ('2023-04-01 07:00', dateadd(minute, 19, '2023-04-01 07:00'), 6),
    ('2023-04-01 07:00', dateadd(minute, 32, '2023-04-01 07:00'), 7),
    ('2023-04-01 07:00', dateadd(minute, 33, '2023-04-01 07:00'), 8),
    ('2023-04-01 07:00', dateadd(minute, 15, '2023-04-01 07:00'), 9),
    ('2023-04-01 07:00', dateadd(minute, 20, '2023-04-01 07:00'),10),
    ('2023-04-01 07:00', dateadd(minute, 20, '2023-04-01 07:00'),11),
    ('2023-04-01 07:00', dateadd(minute, 30, '2023-04-01 07:00'),12),
    ('2023-04-01 07:00', dateadd(minute, 19, '2023-04-01 07:00'),13),
    ('2023-04-01 07:00', dateadd(minute, 32, '2023-04-01 07:00'),14),
    ('2023-04-01 07:00', dateadd(minute, 30, '2023-04-01 07:00'),15);

INSERT INTO voa.dbo.AFZ_Shows (Accessibility, Price, Duration, Show_Type_ID, Facility_ID)
SELECT a.accessibility, a.Price, a.Duration, a.Show_Type_ID, i.Facility_ID
FROM @tem_shows a
JOIN (SELECT Facility_ID, ROW_NUMBER() OVER (ORDER BY Facility_ID) AS Row_Num
FROM @insertedShwIds) i ON i.Row_Num = a.Row_Num;

INSERT INTO voa.dbo.AFZ_Show_Schedule (Start_Time, End_Time, Show_Facility_ID)
SELECT a.Start_Time, a.End_Time, i.Facility_ID
FROM @tem_shows_sch a
JOIN (SELECT Facility_ID, ROW_NUMBER() OVER (ORDER BY Facility_ID) AS Row_Num
FROM @insertedShwIds) i ON i.Row_Num = a.row_number;



-- add stores
DECLARE @insertedStrIds TABLE (Facility_ID INT);

INSERT INTO voa.dbo.AFZ_Facility (Source_Type, Facility_URL, Facility_Description, Facility_Name, Location_Section_ID)
OUTPUT inserted.Facility_ID INTO @insertedStrIds
VALUES
    ('Sto','https://afzvoa.blob.core.windows.net/img/voa_img/TheHungryPanda.png', '','The Hungry Panda', N'AR'),
    ('Sto','https://afzvoa.blob.core.windows.net/img/voa_img/SweetTreats.png', '','Sweet Treats', N'FC'),
    ('Sto','https://afzvoa.blob.core.windows.net/img/voa_img/CasadiPizza.png', '','Casa di Pizza', N'SF'),
    ('Sto','https://afzvoa.blob.core.windows.net/img/voa_img/TheSouvenirShop.png', '','The Souvenir Shop', N'FC'),
    ('Sto','https://afzvoa.blob.core.windows.net/img/voa_img/Fashionista.png', '','Fashionista', N'SF'),
    ('Sto','https://afzvoa.blob.core.windows.net/img/voa_img/BurgersN''Fries.png', '','Burgers N'' Fries', N'WK'),
    ('Sto','https://afzvoa.blob.core.windows.net/img/voa_img/TheIceCreamShoppe.png', '','The Ice Cream Shoppe', N'AR'),
    ('Sto','https://afzvoa.blob.core.windows.net/img/voa_img/LaCantina.png', '','La Cantina', N'FC'),
    ('Sto','https://afzvoa.blob.core.windows.net/img/voa_img/TheToyChest.png', '','The Toy Chest', N'SF'),
    ('Sto','https://afzvoa.blob.core.windows.net/img/voa_img/ShoeEmporium.png', '','Shoe Emporium', N'FC'),
    ('Sto','https://afzvoa.blob.core.windows.net/img/voa_img/TacoStop.png', '','Taco Stop', N'SF'),
    ('Sto','https://afzvoa.blob.core.windows.net/img/voa_img/SundaeFunday.png', '','Sundae Funday', N'WK'),
    ('Sto','https://afzvoa.blob.core.windows.net/img/voa_img/PastaPalace.png', '','Pasta Palace', N'AR'),
    ('Sto','https://afzvoa.blob.core.windows.net/img/voa_img/TheBoutique.png', '','The Boutique', N'AR'),
    ('Sto','https://afzvoa.blob.core.windows.net/img/voa_img/TheTradingPost.png', '','The Trading Post', N'AR');



DECLARE @tem_store TABLE
    (
     Row_Num NUMERIC (5) NOT NULL ,
     Store_Category_ID NUMERIC (2) NOT NULL,
     Open_Time Time not null ,
     Close_Time Time not null
    )
INSERT INTO @tem_store
    (Row_Num, Store_Category_ID, Open_Time, Close_Time)
VALUES
    (1, 1, '9:00:00', '17:00:00'),
    (2, 2, '9:00:00', '17:00:00'),
    (3, 3, '9:00:00', '17:00:00'),
    (4, 4, '9:00:00', '17:00:00'),
    (5, 5, '9:00:00', '17:00:00'),
    (6, 1, '9:00:00', '17:00:00'),
    (7, 2, '9:00:00', '17:00:00'),
    (8, 3, '9:00:00', '17:00:00'),
    (9, 4, '9:00:00', '17:00:00'),
    (10, 5, '9:00:00', '17:00:00'),
    (11, 1, '9:00:00', '17:00:00'),
    (12, 2, '9:00:00', '17:00:00'),
    (13, 3, '9:00:00', '17:00:00'),
    (14, 5, '9:00:00', '17:00:00'),
    (15, 4, '9:00:00', '17:00:00');

INSERT INTO voa.dbo.AFZ_Store (Facility_ID, Category_ID, Open_Time, Close_Time)
SELECT i.Facility_ID, a.Store_Category_ID, a.Open_Time, a.Close_Time
FROM @tem_store a
JOIN (SELECT Facility_ID, ROW_NUMBER() OVER (ORDER BY Facility_ID) AS Row_Num
FROM @insertedStrIds) i ON i.Row_Num = a.Row_Num;

-- add Item_Store
DECLARE @minPrice NUMERIC(6, 2) = 5.00;
INSERT INTO voa.dbo.AFZ_Item_Store (Item_ID, Facility_ID, Unit_Price)
SELECT TOP 35 i.Item_ID, s.Facility_ID,
              @minPrice +
              CAST((CAST((ABS(CHECKSUM(NewId())) % 20 )AS NUMERIC(5, 2))) +
                   (CAST((ABS(CHECKSUM(NewId())) % 100 )AS NUMERIC(5, 2)) / 100) AS NUMERIC(5, 2))
FROM voa.dbo.AFZ_Item i CROSS JOIN voa.dbo.AFZ_Store s
ORDER BY NEWID();

-- add Visitor Type
INSERT INTO voa.dbo.AFZ_Visitor_Type (Visitor_Type) VALUES
     (N'Individual'),(N'Group'),(N'Member'),(N'Student');

-- add Ticket Method
INSERT INTO voa.dbo.AFZ_Ticket_Method (Method_Type, Discount) VALUES
     (N'Online' , 0.95),(N'Onsite', 1);

-- add Ticket Type
INSERT INTO voa.dbo.AFZ_Ticket_Type (Ticket_Type, Discount)
VALUES
       (N'Child' , 0.85),
       (N'Adult', 1),
       (N'Member', 0.9),
       (N'Senior', 0.85),
       (N'Child-Member', 0.85 * 0.9),
       (N'Senior-Member', 0.85 * 0.9);

-- add Visitor
INSERT INTO afz_visitors (fname, lname, city, email, cell_number, birthdate, visitor_type_id, password)
VALUES
('John', 'Doe', 'New York', 'john.doe@example.com', 5555551234, '1990-01-01', 1, '50955ca570ed920a88bc1a3d6a8482afb535715ae053cd7a4eba068d737f7b1f'),
('Jane', 'Doe', 'Los Angeles', 'jane.doe@example.com', 5555555678, '1995-05-05', 2, '50955ca570ed920a88bc1a3d6a8482afb535715ae053cd7a4eba068d737f7b1f'),
('Bob', 'Smith', 'Chicago', 'bob.smith@example.com', 5555552468, '1980-12-31', 3, '50955ca570ed920a88bc1a3d6a8482afb535715ae053cd7a4eba068d737f7b1f'),
('Alice', 'Johnson', 'Houston', 'alice.johnson@example.com', 5555553691, '1985-08-15', 1, '50955ca570ed920a88bc1a3d6a8482afb535715ae053cd7a4eba068d737f7b1f'),
('David', 'Brown', 'Philadelphia', 'david.brown@example.com', 5555557890, '1998-11-11', 4, '50955ca570ed920a88bc1a3d6a8482afb535715ae053cd7a4eba068d737f7b1f'),
('Sarah', 'Wilson', 'Phoenix', 'sarah.wilson@example.com', 5555551357, '2020-02-28', 3, '50955ca570ed920a88bc1a3d6a8482afb535715ae053cd7a4eba068d737f7b1f'),
('Michael', 'Taylor', 'San Diego', 'michael.taylor@example.com', 5555552468, '1992-07-17', 4, '50955ca570ed920a88bc1a3d6a8482afb535715ae053cd7a4eba068d737f7b1f'),
('Emily', 'Davis', 'Dallas', 'emily.davis@example.com', 5555558024, '2018-04-30', 2, '50955ca570ed920a88bc1a3d6a8482afb535715ae053cd7a4eba068d737f7b1f'),
('Daniel', 'Miller', 'San Francisco', 'daniel.miller@example.com', 5555554680, '1999-09-22', 3, '50955ca570ed920a88bc1a3d6a8482afb535715ae053cd7a4eba068d737f7b1f'),
('Linda', 'Clark', 'Miami', 'linda.clark@example.com', 5555551357, '1955-03-15', 4, '50955ca570ed920a88bc1a3d6a8482afb535715ae053cd7a4eba068d737f7b1f'),
('James', 'Martinez', 'Seattle', 'james.martinez@example.com', 5555558024, '1983-06-12', 2, '50955ca570ed920a88bc1a3d6a8482afb535715ae053cd7a4eba068d737f7b1f'),
('Karen', 'Lee', 'Denver', 'karen.lee@example.com', 5555557890, '1960-09-04', 3, '50955ca570ed920a88bc1a3d6a8482afb535715ae053cd7a4eba068d737f7b1f'),
('Steven', 'Wright', 'Boston', 'steven.wright@example.com', 5555553691, '1994-12-25', 1, '50955ca570ed920a88bc1a3d6a8482afb535715ae053cd7a4eba068d737f7b1f'),
('Megan', 'Garcia', 'Austin', 'megan.garcia@example.com', 5555551234, '1997-03-05', 4, '50955ca570ed920a88bc1a3d6a8482afb535715ae053cd7a4eba068d737f7b1f'),
('Robert', 'Perez', 'Las Vegas', 'robert.perez@example.com', 5555554680, '1982-08-08', 3, '50955ca570ed920a88bc1a3d6a8482afb535715ae053cd7a4eba068d737f7b1f');

-- add order
INSERT INTO voa.dbo.AFZ_Activity (Visitor_ID, Facility_ID, Source_Type, Activity_Date)
SELECT TOP 25 v.Visitor_ID, s.Facility_ID, 'Sto', DATEADD(second, ABS(CHECKSUM(NEWID())) % (86400 * 7), '2023-04-01')
FROM voa.dbo.AFZ_Visitors v CROSS JOIN voa.dbo.AFZ_Item_Store s
ORDER BY NEWID();

INSERT INTO voa.dbo.AFZ_Order (Activity_ID, Quantity, Order_Date, Item_ID, Store_Facility_ID)
SELECT TOP 35 A.Activity_ID, (CAST((ABS(CHECKSUM(NewId())) % 10 + 1 )AS NUMERIC(5))), A.Activity_Date, AIS.Item_ID, AIS.Facility_ID
FROM voa.dbo.AFZ_Item_Store AIS
INNER JOIN voa.dbo.AFZ_Activity A ON AIS.Facility_ID = A.Facility_ID
WHERE A.Source_Type = 'Sto' and A.Facility_ID IN (
    SELECT A.Facility_ID
    FROM voa.dbo.AFZ_Item_Store A
)
ORDER BY NEWID();

-- ADD TICKET
INSERT INTO voa.dbo.AFZ_Activity (Visitor_ID, Source_Type, Activity_Date)
SELECT TOP 15 v.Visitor_ID, 'Tic', DATEADD(second, ABS(CHECKSUM(NEWID())) % (86400 * 7), '2023-03-01')
FROM voa.dbo.AFZ_Visitors v CROSS JOIN voa.dbo.AFZ_Store s
ORDER BY NEWID();

INSERT INTO voa.dbo.AFZ_Tickets (Method_Type_ID, Ticket_Type_ID, Purchase_Date, Visit_Date, Price, Activity_ID)
SELECT TOP 15
              (CAST((ABS(CHECKSUM(NewId())) % 2 + 1 )AS NUMERIC(5))),
              2, -- default by the adult ticket
              A.Activity_Date,
              DATEADD(second, ABS(CHECKSUM(NEWID())) % (86400 * 7), '2023-04-01'),
              100,
              A.Activity_ID
FROM voa.dbo.AFZ_Activity A
WHERE A.Source_Type = 'Tic';

-- add parking
INSERT INTO voa.dbo.AFZ_Activity (Visitor_ID, Source_Type, Activity_Date)
SELECT TOP 15 v.Visitor_ID, 'Par', Visit_Date
FROM voa.dbo.AFZ_Visitors v
JOIN AFZ_Activity AA on v.Visitor_ID = AA.Visitor_ID
JOIN AFZ_Tickets A on AA.Activity_ID = A.Activity_ID
ORDER BY NEWID();

INSERT INTO voa.dbo.AFZ_Parking (Activity_ID, Time_In, Time_Out, Spot_Number, Parking_Section_ID, Fee)
SELECT TOP 15 A.Activity_ID,
              A.Activity_Date,
              DATEADD(hour, (CAST((ABS(CHECKSUM(NewId())) % 24 + 1 )AS NUMERIC(2))), A.Activity_Date),
              (CAST((ABS(CHECKSUM(NewId())) % 50 + 1 )AS NUMERIC(2))),
              (CAST((ABS(CHECKSUM(NewId())) % 4 + 1 )AS NUMERIC(2))),
              1
FROM voa.dbo.AFZ_Activity A
WHERE A.Source_Type = 'Par';

-- add show invoice
INSERT INTO voa.dbo.AFZ_Activity (Visitor_ID, Source_Type, Activity_Date, Facility_ID)
SELECT TOP 25 v.Visitor_ID, 'Shw', ss.Start_Time, s.Facility_ID
FROM voa.dbo.AFZ_Visitors v CROSS JOIN voa.dbo.AFZ_Shows s
Join voa.dbo.AFZ_Show_Schedule ss on s.Facility_ID = ss.Show_Facility_ID
ORDER BY NEWID();

INSERT INTO voa.dbo.AFZ_Activity (Visitor_ID, Source_Type, Activity_Date, Facility_ID)
SELECT TOP 25 v.Visitor_ID, 'Att', DATEADD(hour, (CAST((ABS(CHECKSUM(NewId())) % 2 + 1 )AS NUMERIC(2))), Visit_Date), AATT.Facility_ID
FROM voa.dbo.AFZ_Visitors v
INNER JOIN AFZ_Activity AA on v.Visitor_ID = AA.Visitor_ID
INNER JOIN AFZ_Tickets ATs ON ATS.Activity_ID = AA.Activity_ID
CROSS JOIN voa.dbo.AFZ_Attractions AATT
ORDER BY NEWID();

-- add payment
INSERT INTO voa.dbo.AFZ_Payment (Activity_ID, Payment_Amount, Payment_Date, Payment_Method, Facility_ID)
SELECT top 40 A.Activity_ID, A.Amount_Due, DATEADD(hour, (CAST((ABS(CHECKSUM(NewId())) % 24 + 1 )AS NUMERIC(2))), A.Activity_Date),
       'Card', a.Facility_ID
FROM voa.dbo.AFZ_Activity A
WHERE Amount_Due IS NOT NULL
ORDER BY NEWID();

INSERT INTO voa.dbo.AFZ_Payment (Activity_ID, Payment_Amount, Payment_Date, Payment_Method, Facility_ID)
SELECT A.Activity_ID, A.Amount_Due, DATEADD(hour, (CAST((ABS(CHECKSUM(NewId())) % 24 + 1 )AS NUMERIC(2))), A.Activity_Date),
       'Cash', a.Facility_ID
FROM voa.dbo.AFZ_Activity A
WHERE Amount_Due IS NOT NULL
ORDER BY NEWID()
OFFSET 40 ROWS
FETCH NEXT 40 ROWS ONLY;

INSERT INTO AFZ_Card_Payment (Payment_ID, Card_Number, Holder_FName, Holder_LName, CVV, Expiration_Date, Card_Type)
VALUES
  (1, 4539859758147605, 'John', 'Doe', 123, '2025-06-30', 'credit'),
  (2, 376166444143588, 'Jane', 'Doe', 456, '2023-09-30', 'debit'),
  (3, 5450258001841699, 'Bob', 'Smith', 789, '2024-12-31', 'credit'),
  (4, 6011346804642873, 'Sarah', 'Johnson', 234, '2023-03-31', 'debit'),
  (5, 4929415677866153, 'Mike', 'Brown', 567, '2026-08-31', 'credit'),
  (6, 4532648285106349, 'Emily', 'Jones', 890, '2025-11-30', 'debit'),
  (7, 4916615658124520, 'Alex', 'Lee', 123, '2024-02-28', 'credit'),
  (8, 5232911839877406, 'Kelly', 'Wang', 456, '2026-07-31', 'debit'),
  (9, 4929245292931742, 'Tom', 'Davis', 789, '2023-10-31', 'credit'),
  (10, 5289458203825902, 'Anna', 'Miller', 234, '2025-05-31', 'debit'),
  (11, 5450258001841699, 'Bob', 'Smith', 123, '2024-12-31', 'credit'),
  (12, 376166444143588, 'Jane', 'Doe', 456, '2023-09-30', 'debit'),
  (13, 4532648285106349, 'Emily', 'Jones', 789, '2025-11-30', 'credit'),
  (14, 5289458203825902, 'Anna', 'Miller', 234, '2025-05-31', 'debit'),
  (15, 4539859758147605, 'John', 'Doe', 567, '2025-06-30', 'credit'),
  (16, 4916615658124520, 'Alex', 'Lee', 890, '2024-02-28', 'debit'),
  (17, 4929245292931742, 'Tom', 'Davis', 123, '2023-10-31', 'credit'),
  (18, 5232911839877406, 'Kelly', 'Wang', 456, '2026-07-31', 'debit'),
  (19, 4929415677866153, 'Mike', 'Brown', 789, '2026-08-31', 'credit'),
  (20, 6011346804642873, 'Sarah', 'Johnson', 234, '2023-03-31', 'debit'),
  (21, 4532648285106349, 'Emily', 'Jones', 789, '2025-11-30', 'credit'),
  (22, 5289458203825902, 'Anna', 'Miller', 234, '2025-05-31', 'debit'),
  (23, 4539859758147605, 'John', 'Doe', 567, '2025-06-30', 'credit'),
  (24, 4916615658124520, 'Alex', 'Lee', 890, '2024-02-28', 'debit'),
  (25, 4929245292931742, 'Tom', 'Davis', 123, '2023-10-31', 'credit'),
  (26, 4929245292931742, 'Tom', 'Davis', 789, '2023-10-31', 'credit'),
  (27, 5289458203825902, 'Anna', 'Miller', 234, '2025-05-31', 'debit'),
  (28, 5450258001841699, 'Bob', 'Smith', 123, '2024-12-31', 'credit'),
  (29, 376166444143588, 'Jane', 'Doe', 456, '2023-09-30', 'debit'),
  (30, 4532648285106349, 'Emily', 'Jones', 789, '2025-11-30', 'credit'),
  (31, 376166444143588, 'Jane', 'Doe', 456, '2023-09-30', 'debit'),
  (32, 4532648285106349, 'Emily', 'Jones', 789, '2025-11-30', 'credit'),
  (33, 5289458203825902, 'Anna', 'Miller', 234, '2025-05-31', 'debit'),
  (34, 4539859758147605, 'John', 'Doe', 567, '2025-06-30', 'credit'),
  (35, 4916615658124520, 'Alex', 'Lee', 890, '2024-02-28', 'debit'),
  (36, 4929245292931742, 'Tom', 'Davis', 123, '2023-10-31', 'credit'),
  (37, 5232911839877406, 'Kelly', 'Wang', 456, '2026-07-31', 'debit'),
  (38, 4929415677866153, 'Mike', 'Brown', 789, '2026-08-31', 'credit'),
  (39, 6011346804642873, 'Sarah', 'Johnson', 234, '2023-03-31', 'debit'),
  (40, 4532648285106349, 'Emily', 'Jones', 789, '2025-11-30', 'credit')

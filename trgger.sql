CREATE TRIGGER AFZ_Payment_Assign_date
AFTER INSERT ON AFZ_Payment
FOR EACH ROW
BEGIN
   UPDATE AFZ_Payment SET Payment_date = NOW() WHERE id = NEW.id;
END;

CREATE TRIGGER AFZ_Activity_Assign_date
AFTER INSERT ON AFZ_Activity
FOR EACH ROW
BEGIN
   UPDATE AFZ_Activity SET Activity_date = NOW() WHERE id = NEW.id;
END;

CREATE TRIGGER AFZ_Tickets_Assign_date
AFTER INSERT ON AFZ_Tickets
FOR EACH ROW
BEGIN
   UPDATE AFZ_Tickets SET Visit_date = NOW() WHERE id = NEW.id;
   UPDATE AFZ_Tickets SET Purchase_date = NOW() WHERE id = NEW.id;
END;
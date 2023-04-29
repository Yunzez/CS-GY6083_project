import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "./server";
import sql, { ConnectionPool } from "mssql";

let connection: sql.ConnectionPool;

let data = {};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await pool.connect().then((newConnection) => {
      connection = newConnection;
    });
    console.log("Connected to database");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }

  try {
    const { facilityId, num, visitorId, sourceType } = req.body;
    if(sourceType!=='Tic' && !facilityId) {
        return res
        .status(401)
        .send({ error: "incorrect information, missing facilityId" });
    }
    if ( !num || !visitorId || !sourceType) {
      return res
        .status(401)
        .send({ error: "incorrect information, missing visitorId, num, or sourceType" });
    }
    let amount = null;
    const today = new Date();
    const activityResult = await connection
      ?.request()
      .input("facilityId", facilityId)
      .input("visitorId", visitorId)
      .input("sourceType", sourceType)
      .input("date", today).query(`
    DECLARE @InsertedActivityIDs TABLE (Activity_ID INT);
    INSERT INTO AFZ_Activity (Facility_ID, Source_Type, Visitor_ID, Activity_Date)
    OUTPUT inserted.Activity_ID INTO @InsertedActivityIDs
    VALUES ( @facilityId, @sourceType, @visitorId, @date);
    SELECT * FROM @InsertedActivityIDs;
  `);

    const activityId = activityResult?.recordset[0]?.Activity_ID;
    console.log(activityId, activityResult);
    const amountResult = await connection?.request().input("id", activityId)
      .query(`
    SELECT Amount_Due FROM AFZ_Activity WHERE Activity_ID = @id;
  `);

    console.log(
      "activityInfo:",
      activityResult?.recordset[0]?.Activity_ID,
      amountResult?.recordset[0]?.Amount_Due
    );

    amount = amountResult?.recordset[0]?.Amount_Due;

    if (sourceType == "Tik") {
      console.log("insert entrance ticket");
      const{Visit_Date} = req.body
      let iteration = num;  
      while (iteration > 0) {
        iteration--;
        await connection
          ?.request()
          .input("activityId", activityId)
          .input("ticketTypeId", 2)
          .input("ticketMethod", 2)
          .input("purchaseDate", today)
          .input("price", 100)
          .input("visitDate", Visit_Date).query(`
        INSERT INTO AFZ_Tickets (Method_Type_ID, Ticket_Type_ID, Purchase_Date, Visit_Date, Price, Activity_ID)
        VALUES (@ticketMethod, @ticketTypeId, @purchaseDate, @visitDate, @price, @activityId)
      `);
      }
    }

    const result = await connection
      ?.request()
      .input("input_id", visitorId)
      .execute(`dbo.get_summary_data_by_user_id`);
    console.log(result);
    res.status(200).send({ success: "success", summary: result.recordset });

    pool.close();
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
}

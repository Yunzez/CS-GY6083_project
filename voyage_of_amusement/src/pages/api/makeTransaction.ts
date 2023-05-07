import type { NextApiRequest, NextApiResponse } from 'next'
import runMiddleware from '@/component/Middleware';
import { pool } from "./server";
import sql, { ConnectionPool } from "mssql";

let connection: sql.ConnectionPool;

let data = {};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res);
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
    const ticketIDs = [];

    if (sourceType == "Tic") {
      console.log("insert entrance ticket");
      const{visitDate} = req.body
      let iteration = num;  
      while (iteration > 0) {
        iteration--;
        let ticketResult = await connection
          ?.request()
          .input("activityId", activityId)
          .input("ticketTypeId", 2)
          .input("ticketMethod", 1) // 1 is online
          .input("purchaseDate", today)
          .input("price", 100)
          .input("visitDate", visitDate).query(`
        DECLARE @InsertedTicketIDs TABLE (Ticket_ID INT);
        INSERT INTO AFZ_Tickets (Method_Type_ID, Ticket_Type_ID, Purchase_Date, Visit_Date, Price, Activity_ID)
        OUTPUT inserted.Ticket_ID INTO @InsertedTicketIDs
        VALUES (@ticketMethod, @ticketTypeId, @purchaseDate, @visitDate, @price, @activityId);
        select * from @InsertedTicketIDs;
      `);
        ticketIDs.push(ticketResult?.recordset[0]);
      }
    }

    const result = await connection
      ?.request()
      .input("input_id", visitorId)
      .execute(`dbo.get_summary_data_by_user_id`);
    console.log(result);
    const sendBody = { success: "success", summary: result.recordset, activityId: activityId, amount: amount, ticketIDs: ticketIDs};
    res.status(200).send(sendBody);

    pool.close();
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
}

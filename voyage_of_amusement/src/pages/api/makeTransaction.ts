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
    if (!facilityId || !num || !visitorId || !sourceType) {
      return res
        .status(401)
        .send({ error: "incorrect information, missing facilityId or num" });
    }

    if(sourceType == 'Att') {
       await connection
        ?.request()
        .input("facilityId", facilityId)
        .input("amount", null)
        .input("visitorId", visitorId)
        .input("sourceType", sourceType)
        .input("date", new Date()).query(`INSERT INTO AFZ_Activity 
        (Amount_Due, Facility_ID, Source_Type, Visitor_ID,Activity_Date) 
        VALUES 
        (@amount, @facilityId ,@sourceType, @visitorId, @date)`);
  
      //     const result = await connection?.request().query(`select * from AFZ_Facility`)
      
      const result = await connection?.request()
          .input('input_id', visitorId)
          .execute(`dbo.get_summary_data_by_user_id`);
        console.log(result)
      res.status(200).send({ success: 'success', summary: result.recordset });
    }
   
    pool.close();
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
}

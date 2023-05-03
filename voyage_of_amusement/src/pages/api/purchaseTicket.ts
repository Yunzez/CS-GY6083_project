import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "./server";
import sql, { ConnectionPool } from "mssql";

let connection: sql.ConnectionPool;

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
    const { 
      email,
      phone,
      fname,
      lname,
      dob,
      city,
      visitor_id,
      visit_date,
      master_activity_id
    } = req.body;
    console.log(req.body);
    const result = await connection
      ?.request()
      .input("fname", fname)
      .input("lname", lname)
      .input("email", email)
      .input("phone", phone)
      .input("dob", dob)
      .input("city", city)
      .input("visitor_id", visitor_id)
      .input("method_id", 1) // 1 for online
      .input("visit_date", visit_date)
      .input("master_activity_id", master_activity_id == -1 ? null : master_activity_id)
      .execute(`dbo.buy_ticket`);
    console.log("buy ticket result")
    console.log(JSON.stringify((result['recordsets'] as Array<any>)));
    const summary_result = await connection
      ?.request()
      .input("input_id", visitor_id)
      .execute(`dbo.get_summary_data_by_user_id`);
    const sendBody = { success: "success", summary: summary_result.recordset, ticket: (result['recordsets'] as Array<any>)[0][0],activity_id: (result['recordsets'] as Array<any>)[1][0].Activity_ID};
    res.status(200).send(sendBody);
    
    
    pool.close();
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
}

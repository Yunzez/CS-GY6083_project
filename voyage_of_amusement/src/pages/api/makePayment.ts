import type { NextApiRequest, NextApiResponse } from 'next'
import runMiddleware from '@/component/Middleware';
import { pool } from "./server";
import sql, { ConnectionPool } from "mssql";

let connection: sql.ConnectionPool;

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
    const { 
      firstname,
      lastname,
      cardnumber,
      cvc,
      expdate,
      activityID
    } = req.body;
    console.log(req.body);
    const result = await connection
      ?.request()
      .input("FirstName", firstname)
      .input("LastName", lastname)
      .input("cardNumber", cardnumber)
      .input("cvc", cvc)
      .input("exp", expdate)
      .input("Activity_ID", activityID)
      .execute(`dbo.online_pay_for_activity`);
    console.log(JSON.stringify(result));
    res.status(200).send({ success: "success", result: result});
    

    pool.close();
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
}

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
    console.log('start get user info')
  try {
    await pool.connect().then((newConnection) => {
      connection = newConnection;
    });
    console.log("Connected to database");
    try {
      const { userId } = req.query;
      console.log("get user id");
      if (!userId) {
        res.status(400).json({ message: "Invalid userID" });
        return;
      }
      const result = await connection
        ?.request()
        .input("input_id", Number(userId))
        .execute(`dbo.get_summary_data_by_user_id`);

      const payment = await connection
        ?.request()
        .input("inputId", Number(userId))
        .query(
          `select * from AFZ_Payment join AFZ_Activity AA on AFZ_Payment.Activity_ID = AA.Activity_ID where Visitor_ID = @inputId`
        );

      res.status(200).send({ summary: result.recordset, payment: payment.recordset });
      console.log("after query for user info", payment.recordset );
    } catch (err) {
      console.error(err);
      console.log("error he");
      res.status(500).send("Internal server error");
    }
    pool.close();
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
}

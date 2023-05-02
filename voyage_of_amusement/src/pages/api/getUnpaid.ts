import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "./server";
import sql, { ConnectionPool } from "mssql";

let connection: sql.ConnectionPool;

let data = {};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    console.log('start get user unpaid activity')
  try {
    await pool.connect().then((newConnection) => {
      connection = newConnection;
    });
    console.log("Connected to database");
    try {
      const { userId } = req.query;
      console.log('get user id')
      if (!userId) {
        res.status(400).json({ message: "Invalid userID" });
        return;
      }
      const result = await connection
        ?.request()
        .input("input_id", Number(userId))
        .execute(`dbo.get_unpaid_activity_by_user_id`);
      res.status(200).send({ summary: result.recordset });
      console.log('after query for user info')
      
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
    pool.close();
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
}

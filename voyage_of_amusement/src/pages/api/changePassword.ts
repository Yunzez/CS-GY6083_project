import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "./server";
import sql, { ConnectionPool } from "mssql";
import bcrypt from "bcryptjs";
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
    try {
      const { email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await connection
        ?.request()
        .input("email", email)
        .input("password", hashedPassword)
        .query(
          `UPDATE AFZ_Visitors SET Password = @password WHERE Email = @email`
        );

      return res.status(200).send('success')
      
    } catch (err) {
      console.log(err);
      console.error(err);
      res.status(500).send("In  2ternal server error");
    }
    pool.close();
  } catch (err) {
    console.log(err);
    console.error(err);
    res.status(500).send("Internal server error");
  }
}

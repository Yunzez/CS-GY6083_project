import type { NextApiRequest, NextApiResponse } from 'next'
import runMiddleware from '@/component/Middleware';
import { pool } from "./server";
import sql, { ConnectionPool } from "mssql";
import bcrypt from "bcryptjs";
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
    try {
      const {email, password} = req.body;
      const result = await connection
        ?.request()
        .input("email", email)
        .query(`select Password from AFZ_Visitors where Email = @email`);
        const currentPassword = result.recordset[0].Password
      console.log(" ran query", result, email);
      bcrypt.compare(password, currentPassword, async function (err, isValid) {
        console.log(password,currentPassword, isValid, err);
        if (!isValid) {
          // Incorrect password 
          return res.status(200).send(false);
        } else {
           return res.status(200).send(true);
        }
      });

    
    } catch (err) {
      console.log(err);
      console.error(err);
      res.status(500).send("Internal server error");
    }
    pool.close();
  } catch (err) {
    console.log(err);
    console.error(err);
    res.status(500).send("Internal server error");
  }
}

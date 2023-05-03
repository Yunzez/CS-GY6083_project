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

    try {
      console.log("try to get all visiter");
      const users = await connection
        ?.request()
        .query(`select *from AFZ_Visitors join AFZ_Visitor_Type AVT on AFZ_Visitors.Visitor_Type_ID = AVT.Visitor_Type_ID`);
    const ticket = await connection
    ?.request()
    .query(`select * from AFZ_Tickets`);
      console.log(" ran query");
      
      return res.status(200).send({ user: users.recordset, ticket: ticket.recordset  });
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

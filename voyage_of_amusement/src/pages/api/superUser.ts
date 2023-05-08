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

    try {
      console.log("try to get all visiter");
      const users = await connection
        ?.request()
        .query(`select *from AFZ_Visitors join AFZ_Visitor_Type AVT on AFZ_Visitors.Visitor_Type_ID = AVT.Visitor_Type_ID`);
    const ticket = await connection
    ?.request()
    .query(`SELECT Ticket_ID, 100 AS 'Origin_Price', Price * Att.Discount * ATM.Discount as 'Sold_Price', Ticket_Type, Method_Type, concat(ATT.Discount * 100, '% * ', ATM.Discount * 100, '% = ', ATT.Discount * ATM.Discount * 100 , '%') AS 'Discount', Method_Type, Activity_Date
    From AFZ_Tickets
    join AFZ_Activity AA on AFZ_Tickets.Activity_ID = AA.Activity_ID
    join AFZ_Ticket_Type ATT on AFZ_Tickets.Ticket_Type_ID = ATT.Ticket_Type_ID
    join AFZ_Ticket_Method ATM on ATM.Method_Type_ID = AFZ_Tickets.Method_Type_ID;`);
      console.log(" ran query");
      console.log('check act', ticket.recordset)
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

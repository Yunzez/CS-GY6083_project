import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from './server';
import sql, { ConnectionPool } from 'mssql';

let connection:  sql.ConnectionPool;


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await pool.connect().then(newConnection => { connection = newConnection });
        console.log('Connected to database');

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }

    try {
        const result = await connection?.request().query(`select * from AFZ_Holidays
        `)

        console.log(result.recordset)
        res.status(200).send({ data: result.recordset });
        pool.close();


    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}



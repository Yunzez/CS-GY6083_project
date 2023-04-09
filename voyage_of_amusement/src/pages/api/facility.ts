import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from './server';
import sql, { ConnectionPool } from 'mssql';

let connection:  sql.ConnectionPool;

let data = {}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await pool.connect().then(newConnection => { connection = newConnection });
        console.log('Connected to database');

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }

    try {
        const result = await connection?.request().query(`select * from AFZ_Facility`)
        res.status(200).send({data: result.recordset});
        pool.close();
        console.log('result', result, res)

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}



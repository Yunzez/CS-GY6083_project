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
        // const result = await connection?.request().query(`select * from AFZ_Facility`)
        const { facilityId, num } = req.query;
        console.log(facilityId, num)
        res.status(200).send({ data: {id: facilityId, num: num} });
        pool.close();
        console.log('result')

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}



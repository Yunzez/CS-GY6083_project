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

        const facilities = await Promise.all(
            result.recordset.map(async (row) => {
                if (row.Source_Type === 'Att') {
                    // Fetch additional data for the 'attr' category from the AFZ_Attraction table
                    const result = await pool.request().query(`
                        SELECT *
                        FROM AFZ_Attractions
                        WHERE facility_id = ${row.Facility_ID}
                    `);
                    const additionalData = result.recordset[0];
                    return { ...row, ...additionalData };
                } else if (row.attraction_type === 'Sto') {
                    // Fetch additional data for the 'show' category from the AFZ_Show table
                    const result = await pool.request().query(`
                        SELECT *
                        FROM AFZ_Shows
                        WHERE facility_id = ${row.id}
                    `);
                    const additionalData = result.recordset[0];
                    return {
                        ...row, ...additionalData 
                    };
                } else {
                    return {
                     ...row
                    };
                }
            })
        );
        res.status(200).send({ data: facilities });
        pool.close();

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}



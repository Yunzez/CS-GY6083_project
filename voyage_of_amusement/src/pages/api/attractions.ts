import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from './server';
import sql, { ConnectionPool } from 'mssql';

let connection:  sql.ConnectionPool;

async function connectToDatabase(req: NextApiRequest, res: NextApiResponse, next: () => void) {
    try {
        await pool.connect().then(newConnection => { connection = newConnection });
        console.log('Connected to database');
        next();

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}

function validateRequest(req: NextApiRequest, res: NextApiResponse, next: () => void) {

    next();
}


let data = {}
async function createUser(req: NextApiRequest, res: NextApiResponse, next: () => void) {
    const { firstname, lastname, email, password } = req.body;
    try {
        const result = await connection?.request().query('SELECT * FROM AFZ_Visitors ')
        console.log('result', result, res)
        data = result
        next();

    } catch (err) {
        console.error(err);
        res.status(500).send('Cannot connect to database');
    }


}



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { type } = req.query;
    console.log('type: ', type)
    let tableName;
    switch (type) {
        case 'store':
            tableName = 'AFZ_Store'
            break;
        case 'parking':
            tableName = 'AFZ_Parking_Sections'
            break;
        case 'shows':
            tableName = 'AFZ_Shows'
            break;
        case 'attractions':
            tableName = 'AFZ_Attractions'
            break;
        default:
            tableName = ''
    }
    console.log(tableName)
    try {
        await pool.connect().then(newConnection => { connection = newConnection });
        console.log('Connected to database');
        if(tableName !== '') {
            const result = await connection?.request().query(`SELECT * FROM ${tableName} `)
            res.status(200).send({data: result.recordset});
            pool.close();
            console.log('result', result, res)
        } else {
            res.status(500).send('No such data');
        }
       

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}



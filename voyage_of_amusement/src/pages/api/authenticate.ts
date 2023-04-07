import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from './server';

let connection
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
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  console.log('email', email)
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

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

async function fetchUser(req: NextApiRequest, res: NextApiResponse, next: () => void) {
  console.log('fetch user data')
  
  next()
}

function sendResponse(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: 'Authentication successful', 'data': data });
  
}

function closeDB(req: NextApiRequest, res: NextApiResponse , next: () => void) {
  pool.close(); 
  next()
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { type } = req.query;
  let pipeline = [];

  if (type === 'signup') {
    pipeline = [connectToDatabase, validateRequest, createUser, fetchUser,closeDB, sendResponse];
    // pipeline = [connectToDatabase, validateRequest, createUser]
  } else if (type === 'login') {
    pipeline = [validateRequest, fetchUser, sendResponse];
  } else {
    res.status(400).json({ message: 'Invalid authentication type' });
    return;
  }

  pipeline.reduce(async (prev, curr) => {
    await prev;
    await curr(req, res, async () => {});
  }, Promise.resolve());
}


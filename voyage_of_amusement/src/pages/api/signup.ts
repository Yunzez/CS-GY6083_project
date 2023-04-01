import { NextApiRequest, NextApiResponse } from 'next';

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

async function createUser(req: NextApiRequest, res: NextApiResponse, next: () => void) {
  const { firstname, lastname, email, password } = req.body;

  // TODO: Implement user creation logic here.

  next();
}

function sendResponse(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: 'User created successfully' });
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const pipeline = [validateRequest, createUser, sendResponse];

  pipeline.reduce((prev, curr) => {
    return () => curr(req, res, prev);
  }, (error) => {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  })();
}

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

async function fetchUser(req: NextApiRequest, res: NextApiResponse, next: () => void) {
  console.log('fetch user data')
  next()
}

function sendResponse(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: 'User created successfully' });
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { type } = req.query;
  let pipeline = [];

  if (type === 'signup') {
    pipeline = [validateRequest, createUser, fetchUser, sendResponse];
  } else if (type === 'login') {
    pipeline = [validateRequest, fetchUser, sendResponse];
  } else {
    res.status(400).json({ message: 'Invalid authentication type' });
    return;
  }

  pipeline.reduce((prev, curr) => {
    return () => curr(req, res, prev);
  }, () => {
    // this function is called as the final "next" function
    // when all the middleware functions in the pipeline have been executed
    res.status(200).json({ message: 'Authentication successful' });
  })(); // call the reduce function immediately to start the pipeline
}

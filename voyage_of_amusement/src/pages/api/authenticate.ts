import type { NextApiRequest, NextApiResponse } from 'next'
import runMiddleware from '@/component/Middleware';
import { pool } from "./server";
import sql, { ConnectionPool } from "mssql";
import bcrypt from "bcryptjs";
let connection: sql.ConnectionPool;
async function connectToDatabase(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  try {
    await pool.connect().then((newConnection) => {
      connection = newConnection;
    });
    console.log("Connected to database");
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
}

function validateRequest(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  const { firstname, lastname, email, password } = req.body;
  const { type } = req.query;
  if (type === "signup") {
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    console.log("email", email);
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }
  } else if (type === "login") {
    if (!email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }
  }

  next();
}

let data = {};
async function createUser(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  const { firstname, lastname, email, password, dob, vType, phone, city } = req.body;
  try {
    const request = connection?.request();
    request.input("email", email);
    const checkEmailQuery = "SELECT * FROM AFZ_Visitors WHERE Email = @email";

    // Check if the email already exists
    const emailCheckResult = await request.query(checkEmailQuery);
    if (emailCheckResult.recordset.length > 0) {
      return res.status(409).json({ error: "Email already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // data = result
    // Hash the password
    request.input("firstname", firstname);
    request.input("lastname", lastname);
    request.input("hashedPassword", hashedPassword);
    request.input("BirthDay", dob);
    request.input("Cell_Number", phone);
    request.input("Visitor_Type_ID", vType);
    request.input("City", city);
    const query = `INSERT INTO AFZ_Visitors 
      (Fname, Lname, City, Email,Birthdate, Cell_Number, Password, Visitor_Type_ID) 
      VALUES 
      (@firstname, @lastname,@City, @email, @BirthDay,@Cell_Number, @hashedPassword, @Visitor_Type_ID)`;

    const result = await request.query(query);
    
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err });
  }
}

async function fetchUser(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  console.log("fetch user data");
  const { email, password } = req.body;
  console.log(email, password);
  try {
    // Retrieve the hashed password from the database based on the user's email
    const result = await connection
      ?.request()
      .input("email", email)
      .query(`SELECT * FROM AFZ_Visitors av 
      join AFZ_Visitor_Type at 
      on at.Visitor_Type_ID = av.Visitor_Type_ID 
      WHERE email = @email`);
    const user = result.recordset[0]; // Assuming the first record is the user

    if (!user) {
      // User not found
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the provided password with the hashed password from the database

    bcrypt.compare(password, user.Password, async function (err, isValid) {
      console.log(password, user.Password, isValid, err);
      if (!isValid) {
        // Incorrect password 
        return res.status(401).json({ error: "Incorrect password" });
      } else {
        const userId = user.ID; // Replace 'ID' with the actual column name for the user ID
        const request = connection?.request();
        // Run the stored procedure with the user ID
     
          const result = await connection?.request()
          .input('input_id', userId)
          .execute(`dbo.get_summary_data_by_user_id`);
        console.log(result, user)
          res.status(200).send({user:user, summary:  result.recordset});
      }
    }); // Pass err, isValid, and res to the callback function
    // Password matches, continue with the next middleware or handler
  } catch (err) {
    console.error(err);
    res.status(500).send("Cannot connect to database");
  }
}

function sendResponse(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: "Authentication successful", data: data });
}

function closeDB(req: NextApiRequest, res: NextApiResponse, next: () => void) {
  pool.close();
  next();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res);
  const { type } = req.query;
  let pipeline = [];

  if (type === "signup") {
    pipeline = [
      connectToDatabase,
      validateRequest,
      createUser,
      fetchUser
    ];
    // pipeline = [connectToDatabase, validateRequest, createUser]
  } else if (type === "login") {
    pipeline = [connectToDatabase, validateRequest, fetchUser];
  } else {
    res.status(400).json({ message: "Invalid authentication type" });
    return;
  }

  pipeline.reduce(async (prev, curr) => {
    await prev;
    await curr(req, res, async () => {});
  }, Promise.resolve());
}

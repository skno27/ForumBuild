import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

const auth: RequestHandler = (req, res, next) => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET!;
    const authHeader = req.headers.authorization!;
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);
    req.user = decoded;

    next();
  } catch (err) {
    res.sendStatus(401).json();
  }
};

export default auth;

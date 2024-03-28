import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prisma.js";
import env from "dotenv";
import bcrypt from "bcrypt";

env.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export const login: RequestHandler = async (req, res) => {
  const { username } = req.body;

  const user = await prisma.user.findFirst({
    where: { username },
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid username" });
  }
  const passwordValid = await bcrypt.compare(req.body.password, user.password);
  if (!passwordValid) {
    return res.status(401).json({ message: "Invalid password" });
  }
  console.log("Logging In");

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: "6h",
  });
  res.json({ token });
};

// describes user controller
import express, { NextFunction, Request, Response } from "express";
import prisma from "../prisma.js";
import { RequestHandler } from "express-serve-static-core";

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json({ users });
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
      },
    });
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req: Request, res: Response) => {
  res.json({ message: "hit" });
};

export const updateUser: RequestHandler = (req, res) => {
  res.json({ message: "hit" });
};

export const deleteUser: RequestHandler = (req, res) => {
  res.json({ message: "hit" });
};

export const getUserPosts: RequestHandler = (req, res) => {
  res.json({ message: "hit" });
};

export const getUserLikedPosts: RequestHandler = (req, res) => {
  res.json({ message: "hit" });
};

export const getUserFollowedPosts: RequestHandler = (req, res) => {
  res.json({ message: "hit" });
};

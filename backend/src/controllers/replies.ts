// describes user controller
import express, { NextFunction, Request, Response } from "express";
import prisma from "../prisma.js";
import { RequestHandler } from "express-serve-static-core";

export const getReply: RequestHandler = (req, res) => {
  res.json({ message: "hit" });
};

export const updateReply: RequestHandler = (req, res) => {
  res.json({ message: "hit" });
};

export const deleteReply: RequestHandler = (req, res) => {
  res.json({ message: "hit" });
};

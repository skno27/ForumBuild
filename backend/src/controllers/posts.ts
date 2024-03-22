// describes user controller
import express, { NextFunction, Request, Response } from "express";
import prisma from "../prisma.js";
import { RequestHandler } from "express-serve-static-core";

export const getPosts: RequestHandler = async (req, res) => {
  res.json({ message: "hit" });
};

export const createPost: RequestHandler = async (req, res) => {
  res.json({ message: "hit" });
};

export const getPost: RequestHandler = async (req, res) => {
  res.json({ message: "hit" });
};

export const updatePost: RequestHandler = (req, res) => {
  res.json({ message: "hit" });
};

export const deletePost: RequestHandler = (req, res) => {
  res.json({ message: "hit" });
};

export const createLike: RequestHandler = (req, res) => {
  res.json({ message: "hit" });
};

export const deleteLike: RequestHandler = (req, res) => {
  res.json({ message: "hit" });
};

export const createFollow: RequestHandler = (req, res) => {
  res.json({ message: "hit" });
};

export const deleteFollow: RequestHandler = (req, res) => {
  res.json({ message: "hit" });
};

export const getReplies: RequestHandler = (req, res) => {
  res.json({ message: "hit" });
};

export const createReply: RequestHandler = (req, res) => {
  res.json({ message: "hit" });
};

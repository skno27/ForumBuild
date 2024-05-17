// describes user controller
import express, { NextFunction, Request, Response } from "express";
import prisma from "../prisma.js";
import { RequestHandler } from "express-serve-static-core";

export const getReply: RequestHandler = async (req, res, next) => {
  const replyId = parseInt(req.params.id);
  const reply = await prisma.reply.findUnique({
    where: { reply_id: replyId },
  });

  if (!reply) return next(new Error("404"));

  res.json({ reply });
};

export const updateReply: RequestHandler = async (req, res) => {
  const replyId = parseInt(req.params.id);
  const reply = await prisma.reply.update({
    where: { reply_id: replyId },
    data: req.body,
  });

  res.json({ reply });
};

export const deleteReply: RequestHandler = async (req, res) => {
  const replyId = parseInt(req.params.id);
  const deleted = await prisma.reply.delete({
    where: { reply_id: replyId },
  });

  console.log(`Post with ID '${deleted.reply_id}' DELETED successfully `);

  res.sendStatus(200);
};

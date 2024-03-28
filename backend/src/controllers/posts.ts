// describes user controller
import express, { NextFunction, Request, Response } from "express";
import prisma from "../prisma.js";
import { RequestHandler } from "express-serve-static-core";

export const getPosts: RequestHandler = async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json({ posts });
};

export const createPost: RequestHandler = async (req, res) => {
  const body = req.body;
  body.userId = req.user.id;
  const post = await prisma.post.create({
    data: body,
  });
  res.status(201).json(post);
};

export const getPost: RequestHandler = async (req, res, next) => {
  const postId = Number.parseInt(req.params.id);
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    return next(new Error("404"));
  }
  console.log("Post found!");
  res.json({ post });
};

export const updatePost: RequestHandler = async (req, res) => {
  const postId = parseInt(req.params.id);
  const post = await prisma.post.update({
    where: { id: postId },
    data: req.body,
  });
  console.log("Update successful!");
  res.json({ post });
};

export const deletePost: RequestHandler = async (req, res) => {
  const postId = parseInt(req.params.id);
  const result = await prisma.post.delete({
    where: { id: postId },
  });
  console.log(`Post '...${result.title}..' deleted`);
  res.sendStatus(200);
};

export const createLike: RequestHandler = async (req, res) => {
  const postId = Number.parseInt(req.params.id);
  const userId = req.user.id;

  console.log(userId);

  const post = await prisma.post.update({
    where: { id: postId },
    data: {
      likes: {
        connect: {
          id: userId,
        },
      },
    },
    include: {
      _count: true,
    },
  });
  res.status(201).json({ postLikeCount: post._count.likes });
};

export const deleteLike: RequestHandler = async (req, res) => {
  const userId = req.user.id;
  const postId = parseInt(req.params.id);
  const post = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      likes: {
        disconnect: {
          id: userId,
        },
      },
    },
    include: {
      _count: true,
    },
  });
  res.status(201).json({ postLikeCount: post._count.likes });
};

export const createFollow: RequestHandler = async (req, res) => {
  const postId = Number.parseInt(req.params.id);
  const userId = req.user.id;

  console.log(userId);

  const post = await prisma.post.update({
    where: { id: postId },
    data: {
      follows: {
        connect: {
          id: userId,
        },
      },
    },
    include: {
      _count: true,
    },
  });
  res.status(201).json({ postFollowCount: post._count.follows });
};

export const deleteFollow: RequestHandler = async (req, res) => {
  const userId = req.user.id;
  const postId = parseInt(req.params.id);
  const post = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      follows: {
        disconnect: {
          id: userId,
        },
      },
    },
    include: {
      _count: true,
    },
  });
  res.status(201).json({ postFollowCount: post._count.follows });
};

export const getReplies: RequestHandler = async (req, res, next) => {
  const postId = Number.parseInt(req.params.id);
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      comments: true,
      _count: true,
    },
  });

  if (!post) {
    return next(new Error("404"));
  }
  console.log("Returning comments...");
  res.json({ replies: post.comments });
};

export const createReply: RequestHandler = async (req, res) => {
  const postId = parseInt(req.body.id);
  const body = req.body;
  body.userId = req.user.id;

  const reply = await prisma.reply.create({
    data: body,
  });
  res.json({ reply });
};

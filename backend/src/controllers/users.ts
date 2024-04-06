// describes user controller
import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import prisma from "../prisma.js";
import bcrypt from "bcrypt";

export const getUsers: RequestHandler = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json({ users });
};

export const getUser: RequestHandler = async (req, res, next) => {
  const id = Number.parseInt(req.params.id);
  const user = await prisma.user.findUnique({
    where: { id: id },
  });

  if (!user) {
    return next(new Error("404"));
  }

  console.log("User Found!");
  res.send({ user });
};

export const updateUser: RequestHandler = async (req, res, next) => {
  const userId = req.user.id;
  console.log("from updateUser", req.user);
  const user = await prisma.user.update({
    where: { id: userId },
    data: req.body,
  });

  if (!user) {
    return next(new Error("404"));
  }
  console.log("user updated successfully");
  res.json(user);
};

export const deleteUser: RequestHandler = async (req, res) => {
  const userId = req.user.id;
  const result = await prisma.user.delete({
    where: { id: userId },
  });

  res.sendStatus(200);
  console.log(`User ${result.username} deleted`);
};

export const getUserPosts: RequestHandler = async (req, res, next) => {
  const id = Number.parseInt(req.params.id);
  const user = await prisma.user.findUnique({
    where: { id: id },
    include: {
      posts: true,
    },
  });

  if (!user) {
    return next(new Error("404"));
  }
  console.log("User Found!");
  res.send({ posts: user.posts });
};

export const getUserLikedPosts: RequestHandler = async (req, res, next) => {
  const id = Number.parseInt(req.params.id);
  const user = await prisma.user.findUnique({
    where: { id: id },
    include: {
      postsLiked: true,
    },
  });

  if (!user) {
    return next(new Error("404"));
  }
  console.log("User Found!");
  res.send({ posts: user.postsLiked });
};

export const getUserFollowedPosts: RequestHandler = async (req, res, next) => {
  const id = Number.parseInt(req.params.id);
  const user = await prisma.user.findUnique({
    where: { id: id },
    include: {
      postsFollowed: true,
    },
  });

  if (!user) {
    return next(new Error("404"));
  }
  console.log("User Found!");
  res.send({ posts: user.postsFollowed });
};

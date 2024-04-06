import express from "express";
import * as usersController from "../controllers/users.js";
import * as validation from "../middleware/validation.js";

const router = express.Router();

router.get("/", usersController.getUsers);

router.get("/:id", usersController.getUser);
router.patch("/", validation.updateUser, usersController.updateUser);
router.delete("/", usersController.deleteUser);

router.get("/:id/posts", usersController.getUserPosts);
router.get("/:id/posts-liked", usersController.getUserLikedPosts);
router.get("/:id/posts-followed", usersController.getUserFollowedPosts);

export default router;

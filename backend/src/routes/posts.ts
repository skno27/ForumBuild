import express from "express";
import * as postsController from "../controllers/posts.js";
import validation from "../middleware/validation.js";

const router = express.Router();

router.get("/", postsController.getPosts);
router.post("/", postsController.createPost);

router.get("/:id", postsController.getPost);
router.put("/:id", postsController.updatePost);
router.delete("/:id", postsController.deletePost);

router.post("/:id/likes", postsController.createLike);
router.delete("/:id/likes", postsController.deleteLike);

router.post("/:id/follows", postsController.createFollow);
router.delete("/:id/follows", postsController.deleteFollow);

router.get("/:id/replies", postsController.getReplies);
router.post("/:id/replies", postsController.createReply);

export default router;

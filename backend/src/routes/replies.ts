import express from "express";
import * as repliesController from "./../controllers/replies.js";
import * as validation from "../middleware/validation.js";

const router = express.Router();

router.get("/:id", repliesController.getReply);
router.patch("/:id", repliesController.updateReply);
router.delete("/:id", repliesController.deleteReply);

export default router;

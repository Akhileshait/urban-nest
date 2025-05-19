import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { addPost, deletePost, editPost, getPost, getPosts } from '../controllers/post.controller.js';

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/addPost", verifyToken,addPost);
router.put("/:id", verifyToken,editPost);
router.delete("/:id",verifyToken, deletePost);


export default router;
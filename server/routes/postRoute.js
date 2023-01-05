import express from 'express'
const router = express.Router();
import { getPosts, getPost, createPost, updatePost, deletePost, likePost } from '../controllers/postController.js';

router.get('/posts', getPosts);
router.get('/posts/:id',getPost)
router.post('/posts', createPost);
router.patch('/posts/:id',updatePost)
router.delete('/posts/:id',deletePost);
router.patch("/posts/:id/likes", likePost);

export default router;
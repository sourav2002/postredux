import express from 'express'
const router = express.Router();
import { getPosts, getPost, createPost, updatePost, deletePost, likePost } from '../controllers/postController.js';

router.get('/posts', getPosts);
router.get('/post',getPost)
router.post('/posts', createPost);
router.patch('/posts',updatePost)
router.delete('/:id',deletePost);
router.patch("/posts/likes", likePost);


export default router;
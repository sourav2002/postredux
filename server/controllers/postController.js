import express from 'express';
import mongoose from 'mongoose';
import PostData from '../models/postSchema.js';

const router = express.Router();

export const getPosts = async(req, res) => {
    try {
        const posts = await PostData.find();
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}

export const getPost = async(req, res) =>{
    const {id} = req.query;
 if(id){
    const post = await PostData.findById(id)

 res.json(post)
}}

export const createPost = async (req, res) =>{
    const { title, content, user } = req.body;
    const newPost = new PostData({ title, content, user })
    try{
        await newPost.save();
        res.status(201).json(newPost)
    }catch(error){
        res.status(409).json({message : error.message})
    }
}

export const updatePost = async (req, res) => {
    const { title, content, user,id } = req.body;
     
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { title, content, user, _id: id };

    await PostData.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.query;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostData.findByIdAndRemove(id);
    res.json({ message: "Post deleted successfully." });
}

export const likePost =  async (req, res) => {
        const {id,reactions} = req.body.data    
       
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const updatedPost = await PostData.findByIdAndUpdate(id );
    const save = await updatedPost.update({ reactions})
    if(save){
        res.json({success : "Likes Saved"})
    }
}

export default router;

import express from "express";
import mongoose from "mongoose";
import PostData from "../models/postSchema.js";

const router = express.Router();

export const getPosts = async (req, res) => {
  try {
    const posts = await PostData.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostData.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const { title, content, user } = req.body;
  const newPost = new PostData({ title, content, user });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { title, content, user, _id } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No post with id: ${_id}`);

  const updatedPostData = { title, content, user, _id, date : new Date() };
  const updated = await PostData.findByIdAndUpdate(_id, updatedPostData, { new: true });
  res.status(200).json(updated);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  await PostData.findByIdAndRemove(id);
  res.status(200).json({ message: "Post deleted successfully." });
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  const { reactions } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
  return res.status(404).send(`No post with id: ${id}`);
  await PostData.findByIdAndUpdate(id, {reactions }, { new: true });
  res.status(200).json(req.body);
};

export default router;

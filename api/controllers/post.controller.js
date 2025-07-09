import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import { Post, SavedPost, PostDetail } from "../models/post.model.js";

const getPosts = async (req, res) => {
  const query = req.query;
  console.log(query);
  try {
    const posts = await Post.find({
      ...(query.city && { city: query.city }),
      ...(query.type && { type: query.type }),
      ...(query.property && { property: query.property }),
      ...(query.bedroom && { bedroom: parseInt(query.bedroom) }),
      price: {
        $gte: query.minPrice ? parseInt(query.minPrice) : 0,
        $lte: query.maxPrice ? parseInt(query.maxPrice) : 100000000,
      },
    });

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get posts!" });
  }
};

const getPost = async (req, res) => {
  const id = req.params.id;

  console.log(`Getting post with ID: ${id}`);

  try {
    const post = await Post.findById(id).populate({
      path: "user",
      select: "username avatar",
    });

    const postDetail = await PostDetail.findOne({ postId: id });

    console.log("postDetail:", post);

    // to ckeck if the user is logged in and saved the above post
    let userId;

    const token = req.cookies.token;

    if (!token) {
      userId = null;
    } else {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) {
          userId = null;
        } else {
          userId = payload.id;
        }
      });
    }

    const saved = await SavedPost.findOne({
      userId: userId,
      postId: id,
    });

    res
      .status(200)
      .json({ ...post.toObject(), postDetail, isSaved: saved ? true : false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get post!" });
  }
};

const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  try {
    console.log(body);

    const newPost = await Post.create({
      ...body.postData,
      userId: tokenUserId,
    });

    // 2. Now create postDetail with the postId reference
    const postDetailDoc = await PostDetail.create({
      ...body.postDetail,
      postId: newPost._id,
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to add post!" });
  }
};

const editPost = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to edit post!" });
  }
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  console.log(tokenUserId);
  try {
    const post = await Post.findById(id);

    if (post.userId !== tokenUserId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this message" });
    }
    await Post.findByIdAndDelete(id);

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete posts!" });
  }
};

export { getPosts, editPost, deletePost, getPost, addPost };

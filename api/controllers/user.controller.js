import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { SavedPost, Post } from "../models/post.model.js";
import Chat from "../models/chat.model.js";

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log("Users fetched successfully:", users);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get users!" });
  }
};

const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get user!" });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { password, avatar, ...inputs } = req.body;

  console.log("Updating user with ID:", id);

  if (id != tokenUserId) {
    return res
      .status(403)
      .json({ message: "You are not authorized to update this user" });
  }
  let hashedPassword = null;
  try {
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(id, {
      ...inputs,
      ...(hashedPassword && { password: hashedPassword }),
      ...(avatar && { avatar }),
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update user!" });
  }
};
const deleteUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  if (id != tokenUserId) {
    return res
      .status(403)
      .json({ message: "You are not authorized to delete this user" });
  }

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete user!" });
  }
};

const savePost = async (req, res) => {
  const postId = req.body.postId;
  const tokenUserId = req.userId;

  console.log("Saving post with ID:", postId);
  console.log("User ID:", tokenUserId);

  try {
    const savedPost = await SavedPost.findOne({
      userId: tokenUserId, // Directly query by userId
      postId: postId, // Directly query by postId
    });

    if (savedPost) {
      // If already saved, remove it
      await SavedPost.deleteOne({
        userId: tokenUserId,
        postId: postId,
      });
      return res
        .status(200)
        .json({ message: "Post removed from saved list successfully!" });
    } else {
      // If not saved, create a new saved post
      await SavedPost.create({
        userId: tokenUserId,
        postId,
      });
      console.log("Post saved successfully!");

      return res.status(200).json({ message: "Post saved successfully!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to save post!" });
  }
};

const profilePosts = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const userPosts = await Post.find({
      userId: tokenUserId,
    });

    console.log(tokenUserId);
    const saved = await SavedPost.find({ userId: tokenUserId })
      .populate("postId")
      .exec();

    const savedPosts = saved.map((item) => item.postId);

    res.status(200).json({ userPosts, savedPosts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get Profile Posts!" });
  }
};

const getNotificationNumber = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const number = await Chat.countDocuments({
      userIDs: { $in: [tokenUserId] },
      seenBy: { $nin: [tokenUserId] },
    });
    res.status(200).json(number);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get profile posts!" });
  }
};

export {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  savePost,
  profilePosts,
  getNotificationNumber,
};

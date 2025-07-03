import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get users!" });
  }
};

const getUser = async (req, res) => {
  const id = req.userId;

  try {
    const user = await prisma.user.findUnique({ where: { id: id } });
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

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(hashedPassword && { password: hashedPassword }),
        ...(avatar && { avatar }),
      },
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
    await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete user!" });
  }
};

const savePost = async (req, res) => {
  const postId = req.body.postId;
  const tokenUserId = req.userId;

  try {
    const savedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId: tokenUserId,
          postId,
        },
      },
    });

    if (savedPost) {
      // If already saved, remove it
      await prisma.savedPost.delete({
        where: {
          id: savedPost.id,
        },
      });
      return res
        .status(200)
        .json({ message: "Post removed from saved list successfully!" });
    } else {
      // If not saved, create a new saved post
      await prisma.savedPost.create({
        data: {
          userId: tokenUserId,
          postId,
        },
      });
      return res.status(200).json({ message: "Post saved successfully!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to save post!" });
  }
};

const profilePosts = async (req, res) => {
  console.log("Fetching profile posts...");
  const tokenUserId = req.userId;
  try {
    const userPosts = await prisma.post.findMany({
      where: { userId: tokenUserId },
    });
    const saved = await prisma.post.findMany({
      where: { userId: tokenUserId },
      include: {
        post: true,
      },
    });

    console.log("Saved posts:", saved);
    console.log("User posts:", userPosts);

    const savedPosts = saved.map((item) => item.post);

    res.status(200).json({ userPosts, savedPosts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get Profile Posts!" });
  }
};

export const getNotificationNumber = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const number = await prisma.chat.count({
      where: {
        userIDs: {
          hasSome: [tokenUserId],
        },
        NOT: {
          seenBy: {
            hasSome: [tokenUserId],
          },
        },
      },
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


import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";

export const getChats = async (req, res) => {
  const tokenUserId = req.userId;

  console.log("Fetching chats for user:", tokenUserId);

  try {
    const chats = await Chat.find({
      userIDs: tokenUserId,
    }).lean();

    const userIdObject = new mongoose.Types.ObjectId(tokenUserId);

    for (const chat of chats) {
      const receiverId = chat.userIDs.find((id) => !id.equals(userIdObject));

      const receiver = await User.findById(receiverId).select(
        "username avatar"
      );

      chat.receiver = receiver;
    }

    console.log("Chats fetched successfully:", chats);

    res.status(200).json(chats);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chats!" });
  }
};

export const getChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chat = await Chat.findOne({
      _id: req.params.id,
      userIDs: tokenUserId,
    }).populate({
      path: "messages",
      options: { sort: { createdAt: 1 } }, // sort messages by createdAt ASC
    });

    await Chat.findByIdAndUpdate(req.params.id, {
      $addToSet: { seenBy: tokenUserId },
    });
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chat!" });
  }
};

export const addChat = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const newChat = await Chat.create({
      userIDs: [tokenUserId, req.body.receiverId],
    });
    res.status(200).json(newChat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add chat!" });
  }
};

export const readChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chat = await Chat.findOneAndUpdate(
      {
        _id: req.params.id,
        userIDs: tokenUserId,
      },
      {
        seenBy: [tokenUserId],
      },
      {
        new: true,
      }
    );

    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to read chat!" });
  }
};

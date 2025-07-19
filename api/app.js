import express from "express";
import authRoute from "./routes/auth.routes.js";
import postRoute from "./routes/post.routes.js";
import userRoute from "./routes/user.routes.js";
import chatRoute from "./routes/chat.routes.js";
import messageRoute from "./routes/message.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import testRoute from "./routes/test.routes.js";
import dotenv from "dotenv";
import io from "./socket/socket.js";
io.listen("4000");
dotenv.config();

import mongoose from "mongoose";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

//Connecting to mongo DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

app.listen(process.env.PORT || 3800, () => {
  connectDB();
  console.log("Server is running on port 3800");
});

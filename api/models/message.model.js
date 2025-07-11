import mongoose from "mongoose";

// --- 6. Message Schema ---
const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User who sent the message
  chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true }, // Chat this message belongs to
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;

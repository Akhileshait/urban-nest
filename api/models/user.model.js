import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
 
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  avatar: { type: String }, // Optional
  createdAt: { type: Date, default: Date.now },

  chatIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }], // Array of Chat IDs
});

const User = mongoose.model("User", userSchema);

export default User;

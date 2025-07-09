import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId, // Mongoose automatically adds this

  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Store hashed passwords!
  avatar: { type: String }, // Optional
  createdAt: { type: Date, default: Date.now },

  // Mongoose doesn't explicitly define inverse relations like Prisma's `Post[]`
  // You'd typically use .populate() on the other side (e.g., Post.find().populate('userId'))
  // or define virtuals if you want to access them directly from the user object.
  // For chatIDs, you'd store an array of references.
  chatIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }], // Array of Chat IDs
});

const User = mongoose.model("User", userSchema);

export default User;

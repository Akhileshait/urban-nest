import mongoose from "mongoose";

const TypeEnum = ["buy", "rent"];
const PropertyEnum = ["apartment", "house", "condo", "land"];

// --- 1. Post Schema ---
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: [String], default: [] }, // Array of strings for image URLs
  address: { type: String, required: true },
  city: { type: String, required: true },
  bedroom: { type: Number, required: true },
  bathroom: { type: Number, required: true },
  latitude: { type: Number, required: true }, // Float in Prisma maps to Number in Mongoose
  longitude: { type: Number, required: true },

  type: {
    type: String,
    enum: TypeEnum, // Enforce enum values
    required: true,
  },
  property: {
    type: String,
    enum: PropertyEnum, // Enforce enum values
    required: true,
  },
  // One-to-Many relationship: A Post belongs to a User
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

// Add index for common queries
postSchema.index({ city: 1, price: 1, type: 1, property: 1 });
postSchema.index({ latitude: 1, longitude: 1 });

const Post = mongoose.model("Post", postSchema);

// --- 2. PostDetail Schema ---
const postDetailSchema = new mongoose.Schema({
  desc: { type: String, required: true },
  utilities: { type: String },
  pet: { type: String },
  income: { type: String },
  size: { type: Number },
  school: { type: Number },
  bus: { type: Number },
  restaurant: { type: Number },

  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
    unique: true,
  },
});

const PostDetail = mongoose.model("PostDetail", postDetailSchema);

// --- 3. SavedPost Schema ---
const savedPostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  createdAt: { type: Date, default: Date.now },
});

savedPostSchema.index({ userId: 1, postId: 1 }, { unique: true });

const SavedPost = mongoose.model("SavedPost", savedPostSchema);

export { Post, PostDetail, SavedPost };

import mongoose from "mongoose";

// --- Enum Definitions (Mongoose handles these as simple strings with validation) ---
const TypeEnum = ['buy', 'rent'];
const PropertyEnum = ['apartment', 'house', 'condo', 'land'];

// --- 1. Post Schema ---
const postSchema = new mongoose.Schema({
  // Prisma's @id @default(auto()) @map("_id") @db.ObjectId maps directly to Mongoose's default _id
  // _id: mongoose.Schema.Types.ObjectId, // Mongoose automatically adds this

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
    required: true
  },
  property: {
    type: String,
    enum: PropertyEnum, // Enforce enum values
    required: true
  },
  // One-to-Many relationship: A Post belongs to a User
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },

  // One-to-One relationship: A Post can have one PostDetail.
  // We'll typically reference PostDetail from Post, or embed it if PostDetail is small and always accessed with Post.
  // Given your Prisma setup, it's a separate model, so referencing is appropriate.
  // You might add a 'postDetailId' here if you want to explicitly reference it from Post,
  // but Mongoose's populate on PostDetail's postId field is often sufficient.
  // For simplicity, we'll rely on PostDetail referencing Post.
  // postDetail: { type: mongoose.Schema.Types.ObjectId, ref: 'PostDetail' }, // Optional reference
});

// Add index for common queries
postSchema.index({ city: 1, price: 1, type: 1, property: 1 });
postSchema.index({ latitude: 1, longitude: 1 });


const Post = mongoose.model('Post', postSchema);



// --- 2. PostDetail Schema ---
const postDetailSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId, // Mongoose automatically adds this

  desc: { type: String, required: true },
  utilities: { type: String }, // Optional
  pet: { type: String },       // Optional
  income: { type: String },    // Optional
  size: { type: Number },      // Optional
  school: { type: Number },    // Optional
  bus: { type: Number },       // Optional
  restaurant: { type: Number }, // Optional

  // One-to-One relationship: PostDetail belongs to a Post (unique reference)
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true, unique: true },
});

const PostDetail = mongoose.model('PostDetail', postDetailSchema);

// --- 3. SavedPost Schema ---
const savedPostSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId, // Mongoose automatically adds this

  // Many-to-Many relationship intermediary: User saves Post
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  createdAt: { type: Date, default: Date.now },
});

// Compound unique index to enforce @@unique([userId, postId]) from Prisma
savedPostSchema.index({ userId: 1, postId: 1 }, { unique: true });

const SavedPost = mongoose.model('SavedPost', savedPostSchema);


export { Post, PostDetail, SavedPost };
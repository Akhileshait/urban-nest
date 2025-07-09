const chatSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId, // Mongoose automatically adds this

  // Many-to-Many relationship: Users in a Chat
  userIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  createdAt: { type: Date, default: Date.now },
  seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of user IDs
  lastMessage: { type: String }, // Optional
  // 'messages' are handled by Message referencing Chat
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['system', 'user', 'assistant'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const chatSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default: 'New Chat'
    },
    messages: [messageSchema],
    userId: {
      type: String,
      required: false, // Can be required if you implement authentication
    }
  },
  {
    timestamps: true // createdAt, updatedAt
  }
);

const Chat = mongoose.model('Chat', chatSchema);

export default Chat; 
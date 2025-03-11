import express from 'express';
import { 
  getChats, 
  getChatById, 
  createChat, 
  sendMessage, 
  deleteChat 
} from '../controllers/chat.controller.js';

const router = express.Router();

// Get all chats or filtered by userId
router.get('/', getChats);

// Get a single chat by ID
router.get('/:id', getChatById);

// Create a new chat
router.post('/', createChat);

// Send a message to an existing chat
router.post('/:id/messages', sendMessage);

// Delete a chat
router.delete('/:id', deleteChat);

export default router; 
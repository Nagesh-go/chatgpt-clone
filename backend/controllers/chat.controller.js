import Chat from '../models/chat.model.js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// OpenAI API configuration
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// Get all chats or by userId if provided
export const getChats = async (req, res) => {
  try {
    const { userId } = req.query;
    const filter = userId ? { userId } : {};
    
    const chats = await Chat.find(filter).sort({ updatedAt: -1 });
    res.status(200).json(chats);
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single chat by ID
export const getChatById = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    
    res.status(200).json(chat);
  } catch (error) {
    console.error('Error fetching chat:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new chat
export const createChat = async (req, res) => {
  try {
    const { title, userId, message } = req.body;
    
    // Create initial messages array with system and user messages
    const messages = [
      {
        role: 'system',
        content: 'You are ChatGPT, a large language model trained by OpenAI. Follow the user\'s instructions carefully. Respond using markdown.'
      }
    ];
    
    // Add user message if provided
    if (message) {
      messages.push({
        role: 'user',
        content: message
      });
      
      // Get response from OpenAI
      if (OPENAI_API_KEY) {
        const openaiResponse = await axios.post(
          OPENAI_API_URL,
          {
            model: 'gpt-3.5-turbo',
            messages: messages,
            temperature: 0.7
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${OPENAI_API_KEY}`
            }
          }
        );
        
        // Add assistant's response to messages
        if (openaiResponse.data.choices && openaiResponse.data.choices.length > 0) {
          messages.push(openaiResponse.data.choices[0].message);
        }
      }
    }
    
    const newChat = new Chat({
      title: title || 'New Chat',
      userId,
      messages
    });
    
    const savedChat = await newChat.save();
    res.status(201).json(savedChat);
  } catch (error) {
    console.error('Error creating chat:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Send a message to an existing chat
export const sendMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }
    
    // Find the chat
    const chat = await Chat.findById(id);
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    
    // Add user message
    chat.messages.push({
      role: 'user',
      content: message
    });
    
    // Get OpenAI response
    if (OPENAI_API_KEY) {
      try {
        const openaiResponse = await axios.post(
          OPENAI_API_URL,
          {
            model: 'gpt-3.5-turbo',
            messages: chat.messages,
            temperature: 0.7
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${OPENAI_API_KEY}`
            }
          }
        );
        
        // Add assistant's response to messages
        if (openaiResponse.data.choices && openaiResponse.data.choices.length > 0) {
          chat.messages.push(openaiResponse.data.choices[0].message);
        }
      } catch (aiError) {
        console.error('OpenAI API error:', aiError.response?.data || aiError.message);
        // Still save the user message even if OpenAI fails
      }
    }
    
    // Set chat title from first message if it's "New Chat"
    if (chat.title === 'New Chat' && chat.messages.length > 0) {
      const userMessages = chat.messages.filter(msg => msg.role === 'user');
      if (userMessages.length > 0) {
        const firstMessage = userMessages[0].content;
        chat.title = firstMessage.length > 30 
          ? firstMessage.substring(0, 30) + '...' 
          : firstMessage;
      }
    }
    
    // Save the updated chat
    const updatedChat = await chat.save();
    res.status(200).json(updatedChat);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a chat
export const deleteChat = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedChat = await Chat.findByIdAndDelete(id);
    
    if (!deletedChat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    
    res.status(200).json({ message: 'Chat deleted successfully' });
  } catch (error) {
    console.error('Error deleting chat:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 
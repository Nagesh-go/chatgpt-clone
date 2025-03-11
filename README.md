# ChatGPT Clone

A full-stack application that mimics the functionality of OpenAI's ChatGPT using the OpenAI API.

## Features

- Chat interface similar to ChatGPT
- Conversation history
- Integration with OpenAI API
- MongoDB database for storing conversations
- RESTful API

## Tech Stack

- **Frontend**: React, Vite
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **API**: OpenAI

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- MongoDB (local installation or MongoDB Atlas account)
- OpenAI API key

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
OPENAI_API_KEY=your_openai_api_key
MONGO_URI=mongodb://localhost:27017/chatgpt-clone
PORT=5000
NODE_ENV=development
```

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd chatgpt-clone
```

2. Install dependencies:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../
npm install
```

3. Start the development servers:

```bash
# Start backend server (from root directory)
npm run dev

# Start frontend development server (in another terminal)
npm run dev
```

4. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## API Endpoints

### Chat Endpoints

- **GET /api/chats** - Get all chats
- **GET /api/chats/:id** - Get a single chat by ID
- **POST /api/chats** - Create a new chat
- **POST /api/chats/:id/messages** - Send a message to a chat
- **DELETE /api/chats/:id** - Delete a chat

## Deployment

For production deployment:

1. Build the frontend:

```bash
npm run build
```

2. Set the NODE_ENV to "production" in your environment variables
3. Start the server:

```bash
npm start
```

The Express server will serve the built frontend files.

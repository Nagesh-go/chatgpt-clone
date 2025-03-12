import React, { useState } from 'react';
import './Home.css';

const Home = () => {
  const [input, setInput] = useState('');
  const [chats, setChats] = useState([[]]);
  const [currentChat, setCurrentChat] = useState(0);
  const [renderKey, setRenderKey] = useState(0); // For forcing re-render

  const API_KEY = 'GEMINI_API_KEY'; // Replace with your actual API key

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', parts: [{ text: input }] };
    const updatedChats = chats.map((chat, index) =>
      index === currentChat ? [...chat, { role: 'user', content: input }] : chat
    );
    setChats(updatedChats);
    console.log('Updated Chats (User Message):', updatedChats); // Log updated state
    setRenderKey((prevKey) => prevKey + 1); // Force re-render
    setInput('');

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro-001:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: input }] }],
          }),
        }
      );

      if (!response.ok) {
        console.error('HTTP error! Status:', response.status);
        const errorText = await response.text();
        console.error('Error body:', errorText);
        return;
      }

      const data = await response.json();
      console.log('API Response:', data);

      if (
        data &&
        data.candidates &&
        data.candidates[0] &&
        data.candidates[0].content &&
        data.candidates[0].content.parts &&
        data.candidates[0].content.parts[0] &&
        data.candidates[0].content.parts[0].text
      ) {
        const botMessage = { role: 'bot', content: data.candidates[0].content.parts[0].text };
        const newChats = chats.map((chat, index) =>
          index === currentChat ? [...chat, botMessage] : chat
        );
        setChats(newChats);
        console.log('Updated Chats (Bot Message):', newChats); // Log updated state
        setRenderKey((prevKey) => prevKey + 1); // Force re-render
      }
    } catch (error) {
      console.error('Error communicating with Google Gemini API:', error);
    }
  };

  const handleNewChat = () => {
    setChats([...chats, []]);
    setCurrentChat(chats.length);
  };

  return (
    <div key={renderKey} className="app-container">
      <div className="sidebar">
        <button className="new-chat" onClick={handleNewChat}>
          + New Chat
        </button>
        <div className="history">
          {chats.map((_, index) => (
            <div
              key={index}
              className={`chat-history-item ${index === currentChat ? 'active' : ''}`}
              onClick={() => setCurrentChat(index)}
            >
              Chat {index + 1}
            </div>
          ))}
        </div>
      </div>
      <div className="main-content">
        <div className="message-box">
          {chats[currentChat].map((msg, index) => {
            console.log('Message:', msg);
            return (
              <div key={index} className={`message ${msg.role}`}>
                {msg.content}
              </div>
            );
          })}
        </div>
        <div className="input-area">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
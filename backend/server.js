require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Endpoint to handle chat requests
app.post('/chat-api', async (req, res) => {
  try {
    const { message } = req.body;
    const openaiApiKey = process.env.OPENAI_API_KEY;
    const url = 'https://api.openai.com/v1/chat/completions';  
    const headers = {
      'Authorization': `Bearer ${openaiApiKey}`,
      'Content-Type': 'application/json'
    };
    const data = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }]
    };

    const response = await axios.post(url, data, { headers });
    const answer = response.data.choices[0].message.content;

    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

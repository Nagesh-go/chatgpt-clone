const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { OpenAI } = require("openai");


dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON requests
app.use(cors({ origin: "http://localhost:5173" })); // Allow React frontend

// OpenAI setup
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Chatbot API Route
app.post("/chat", async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await openai.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
        });

        res.json({ response: response.choices[0].message.content });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Something went wrong!" });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

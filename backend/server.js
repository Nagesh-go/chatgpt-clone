import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

import { connectDB } from "./config/db.js";

import chatRoutes from "./routes/chat.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// Middleware
app.use(express.json()); // allows us to accept JSON data in the req.body
app.use(cors()); // Enable CORS for all routes

// API Routes
app.use("/api/chats", chatRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
	res.status(200).json({ status: "ok", message: "Server is running" });
});

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
	connectDB();
	console.log("Server started at http://localhost:" + PORT);
});
import express from "express";
import cors from "cors";
import { globalErrorHandler } from "./middleware/globalErrorHandler.js";
import router from "./routes/routes.js";
import { notFound } from "./middleware/notFound.js";

const app = express();
// Parser
app.use(express.json());

// Set CORS options
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://conversa-beta.vercel.app",
    "https://conversa-chat-application.netlify.app",
  ],
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Application routes
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to my server",
  });
});

// Global error handler
app.use(globalErrorHandler);

// Not found routes
app.use(notFound);

export default app;

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
    origin: "http://localhost:5173", // Frontend origin
    methods: "GET, POST, PATCH, PUT, DELETE, HEAD",
    credentials: true, // Allow cookies
};

app.use(cors(corsOptions));

// Middleware for parsing JSON (limit added to prevent abuse)
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Parse cookies
app.use(cookieParser());

// Import and use routers
import userRouter from "./routers/user.routers.js";
import postRouter from "./routers/post.routers.js";
import commentRouter from "./routers/comment.routers.js";
import followerRouter from "./routers/follower.routers.js";
import likeRouter from "./routers/like.routers.js";
import videoRouter from "./routers/video.routers.js";

// Route mappings
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/followers", followerRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/videos",videoRouter);
// Export the app instance
export { app };

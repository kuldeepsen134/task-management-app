import express from "express";
import cors from "cors";
import helmet from "helmet";

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import userRoutes from "./routes/user.routes.js";

import errorHandler from "./middlewares/error.middleware.js";
import rateLimiter from "./middlewares/rateLimiter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet());

// ✅ Global Rate Limiter (All APIs protected)
app.use(rateLimiter);

app.get('/api/', (req, res) => {
    res.status(200).send({
        message: "Welcome to Task-management",
        success: true
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// ✅ Always last
app.use(errorHandler);

export default app;
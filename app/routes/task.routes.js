import express from "express";
import * as controller from "../controllers/task.controller.js";
import auth from "../middlewares/auth.middleware.js";
import cache from "../middlewares/cache.middleware.js";

const router = express.Router();

router.post("/", auth, controller.createTask);

router.get("/", auth, cache("tasks"), controller.getTasks);

// Update Task (NEW)
router.patch("/:id", auth, controller.updateTask);

// Complete Task
router.patch("/:id/complete", auth, controller.completeTask);

// Delete Task (NEW)
router.delete("/:id", auth, controller.deleteTask);

router.get("/analytics/me", auth, cache("analytics"), controller.getMyAnalytics);
router.get("/analytics/all", auth, cache("analytics"), controller.getAllAnalyticsAll);

export default router;
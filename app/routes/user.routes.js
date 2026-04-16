import express from "express";
import auth from "../middlewares/auth.middleware.js";
import * as controller from "../controllers/user.controller.js";
import cache from "../middlewares/cache.middleware.js";

const router = express.Router();
router.get("/", auth, cache("users"), controller.getAllUsers);
router.get("/me", auth, cache("profile"), controller.getProfile);
router.patch("/me", auth, controller.updateUser);
router.delete("/me", auth, controller.deleteUser);

export default router;
import redisClient from "../config/redis.js";
import * as service from "../services/user.service.js";
import { clearCache } from "../utils/clearCache.js";
import { clearUserCache } from "../utils/helper.js";
import { successResponse } from "../utils/response.js";
import { updateUserSchema } from "../validators/user.validator.js";


export const getAllUsers = async (req, res, next) => {
  try {
    const users = await service.getAllUsers(req.query);
    return successResponse(
      res,
      users,
      "Users List fetched successful."
    );
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await service.getProfile(req.user.id);
    return successResponse(
      res,
      user,
      "User profile fetched successful."
    );
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { error } = updateUserSchema.validate(
      req.body
    );

    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    const user = await service.updateUser(
      req.user.id,
      req.body
    );

    // clear cache
    await clearUserCache(req.user.id);

    return successResponse(
      res,
      user,
      "User profile updated successful."
    );
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await service.deleteUser(req.user.id);
    await clearUserCache(req.user.id);
    return successResponse(
      res,
      [],
      "User deleted successful."
    );
  } catch (error) {
    next(error);
  }
};
import * as service from "../services/task.service.js";
import { clearCache } from "../utils/clearCache.js";
import { clearTaskCache } from "../utils/helper.js";
import { successResponse } from "../utils/response.js";
import { createTaskSchema, updateTaskSchema } from "../validators/task.validator.js";


// CREATE TASK
export const createTask = async (req, res, next) => {
  try {

    const { error } =
      createTaskSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.message
      });
    }

    const task = await service.createTask({
      ...req.body,
      userId: req.user.id
    });

    // Clear Cache
    await clearTaskCache(req.user.id);

    return successResponse(
      res,
      task,
      "Tasks created successfully."
    );

  } catch (error) {
    next(error);
  }
};


// GET TASKS
export const getTasks = async (req, res, next) => {
  try {

    const tasks =
      await service.getTasks(
        req.user.id,
        req.query
      );

    return successResponse(
      res,
      tasks,
      "Tasks list fetched successfully."
    );

  } catch (error) {
    next(error);
  }
};


// UPDATE TASK
export const updateTask = async (req, res, next) => {
  try {

    const { error } =
      updateTaskSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.message
      });
    }

    const task =
      await service.updateTask(
        req.params.id,
        req.user.id,
        req.body
      );

    // Clear Cache
    await clearTaskCache(req.user.id);

    return successResponse(
      res,
      task,
      "Task updated successfully."
    );

  } catch (error) {
    next(error);
  }
};


// COMPLETE TASK  (IMPORTANT FIX)
export const completeTask = async (req, res, next) => {
  try {

    const task =
      await service.completeTask(
        req.params.id,
        req.user.id
      );

    // Clear Cache (MISSING BEFORE)
    await clearTaskCache(req.user.id);

    return successResponse(
      res,
      task,
      "Task completed."
    );

  } catch (error) {
    next(error);
  }
};


// DELETE TASK
export const deleteTask = async (req, res, next) => {
  try {

    await service.deleteTask(
      req.params.id,
      req.user.id
    );

    // Clear Cache
    await clearTaskCache(req.user.id);

    return successResponse(
      res,
      [],
      "Task deleted successful."
    );

  } catch (error) {
    next(error);
  }
};


// MY ANALYTICS
export const getMyAnalytics = async (req, res, next) => {
  try {

    const data =
      await service.getAnalytics(
        req.user.id
      );

    return successResponse(
      res,
      data,
      "My productivity analytics fetched successful."
    );

  } catch (error) {
    next(error);
  }
};


// ALL ANALYTICS
export const getAllAnalyticsAll = async (req, res, next) => {
  try {

    const data =
      await service.getAnalytics();

    return successResponse(
      res,
      data,
      "Productivity analytics fetched successful."
    );

  } catch (error) {
    next(error);
  }
};
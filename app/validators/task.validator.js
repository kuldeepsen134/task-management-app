import Joi from "joi";

export const createTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  priority: Joi.string().valid("low", "medium", "high"),
  status: Joi.string().valid("pending", "in-progress", "high", "completed"),
  dueDate: Joi.date(),
  estimatedTime: Joi.number(),
  tags: Joi.array().items(Joi.string()),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string().allow(""),
  priority: Joi.string().valid("low", "medium", "high"),
  estimatedTime: Joi.number(),
  status: Joi.string().valid(
    "pending",
    "in-progress",
    "completed"
  ),
  dueDate: Joi.date(),
  tags: Joi.array().items(Joi.string()),
});
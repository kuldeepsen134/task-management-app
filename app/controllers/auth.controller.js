import * as service from "../services/auth.service.js";
import { successResponse } from "../utils/response.js";
import { registerSchema, loginSchema, } from "../validators/auth.validator.js";

export const register = async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    const user = await service.register(req.body);
    return successResponse(
      res,
      user,
      "User Registered successful."
    );
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return errorResponse(
        res,
        error.message,
        400
      );
    }

    const data = await service.login(req.body);

    return successResponse(
      res,
      data,
      "Login successful"
    );

  } catch (error) {
    next(error);
  }
};
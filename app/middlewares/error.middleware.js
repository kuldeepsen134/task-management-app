import logger from "../utils/logger.js";
import { errorResponse } from "../utils/response.js";

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  return errorResponse(
    res,
    err.message,
    err.statusCode || 500
  );
};

export default errorHandler;
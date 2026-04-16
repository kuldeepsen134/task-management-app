export const successResponse = (
  res,
  data = null,
  message = "Success",
  statusCode = 200,
  meta = {}
) => {

  return res.status(statusCode).json({
    success: true,
    message,
    data,
    meta
  });

};



export const errorResponse = (
  res,
  message = "Something went wrong",
  statusCode = 500,
  error = null
) => {

  return res.status(statusCode).json({
    success: false,
    message,
    error
  });

};
import httpStatus from "http-status";

export const notFound = (req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Api Not Found",
    error: "",
  });
};

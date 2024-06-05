import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import config from "../config/index.js";
import User from "../model/User.model.js";
const auth = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized user",
        error: true,
      });
    }
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, config.jwt_access_screate);
    if (!decoded) {
      return res.status(httpStatus.FORBIDDEN).json({
        success: false,
        message: "Invalid Token",
        error: true,
      });
    }
    const user = await User.findById(decoded?.userId).select("-password");

    if (!user) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;

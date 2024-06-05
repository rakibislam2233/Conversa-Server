import jwt from "jsonwebtoken";
import { User } from "../modules/User/user.model.js";
import config from "../config/config.js";
const protectRoute = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized",
        error: true,
      });
    }
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, config.jwt_token);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
        error: true,
      });
    }
    const user = await User.findById(decoded?.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export default protectRoute;

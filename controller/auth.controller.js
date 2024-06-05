import httpStatus from "http-status";
import { authService } from "../service/auth.service.js";
import User from "../model/User.model.js";
const register = async (req, res, next) => {
  try {
    const response = await authService.register(req.body);
    const result = await User.findById(response._id).select("-password");
    res.status(httpStatus.OK).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json({
      success: true,
      message: "User login successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const authController = {
  register,
  login,
};

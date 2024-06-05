import { messageService } from "../service/message.service.js";
import { userService } from "../service/user.service.js";
import httpStatus from "http-status";

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(httpStatus.OK).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};
const getParticipants = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const participants = await messageService.getParticipants(userId);
    res.status(httpStatus.OK).json({
      success: true,
      message: "Participants and last messages retrieved successfully",
      data: participants,
    });
  } catch (error) {
    next(error);
  }
};

export const userController = {
  getAllUsers,
  getParticipants,
};

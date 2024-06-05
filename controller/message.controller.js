import httpStatus from "http-status";
import { messageService } from "../service/message.service.js";

const sendMessage = async (req, res, next) => {
  try {
    const { receiverId } = req.params;
    const senderId = req.user._id;
    const result = await messageService.sendMessage(
      senderId,
      receiverId,
      req.body
    );
    res.status(200).json({
      success: true,
      message: "Message send successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getMessage = async (req, res, next) => {
  try {
    const { receiverId } = req.params;
    const senderId = req.user._id;
    const messages = await messageService.getMessage(senderId, receiverId);
    res.status(httpStatus.OK).json({
      success: true,
      message: "Message retrived successfully",
      data: messages,
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
      message: "Participants retrieved successfully",
      data: participants,
    });
  } catch (error) {
    next(error);
  }
};

const updateStatusMessage = async (req, res, next) => {
  try {
    const { messageId } = req.params;
    const result = await messageService.updateStatusMessage(messageId);
    res.status(httpStatus.OK).json({
      success: true,
      message: "Message status updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteMessage = async (req, res, next) => {
  try {
    const { messageId } = req.params;
    const result = await messageService.deleteMessage(messageId);
    res.status(httpStatus.OK).json({
      success: true,
      message: "Message deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const messageController = {
  sendMessage,
  getMessage,
  getParticipants,
  updateStatusMessage,
  deleteMessage,
};

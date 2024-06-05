import { Router } from "express";
import { authController } from "../controller/auth.controller.js";
import { upload } from "../utils/sendImageToCloudinary.js";
import { messageController } from "../controller/message.controller.js";
import auth from "../middleware/auth.js";
import { userController } from "../controller/user.controller.js";
const router = Router();

//auth relate route
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
export default router;

//user related route
router.get("/user/getAllUsers", userController.getAllUsers);
//get participan user
router.get("/user/participants", auth, userController.getParticipants);

//message related route
router.post(
  "/message/sendMessage/:receiverId",
  auth,
  messageController.sendMessage
);

router.patch(
  "/message/updateStatus/:messageId",
  messageController.updateStatusMessage
);
router.delete(
  "/message/deletedMessage/:messageId",
  messageController.deleteMessage
);

//get authUser messages
router.get(
  "/message/getMessage/:receiverId",
  auth,
  messageController.getMessage
);

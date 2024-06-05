import User from "../model/User.model.js";
const getAllUsers = async () => {
  return await User.find().select("-password");
};
export const userService = {
  getAllUsers,
};

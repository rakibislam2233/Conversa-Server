import config from "../config/index.js";
import User from "../model/User.model.js";
import { createJwtToken } from "../utils/createJwtToken.js";
import bcrypt from "bcrypt";
const register = async (payload) => {
  const { username, email } = payload;
  const isUsernameExists = await User.findOne({ username });
  if (isUsernameExists) {
    throw new Error("user name already exists given another username");
  }
  const isEmailExists = await User.findOne({ email });
  if (isEmailExists) {
    throw new Error("email already exists given another email");
  }
  const result = await User.create(payload);

  return result;
};

const login = async (payload) => {
  const { username, password } = payload;
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordMatched = await bcrypt.compare(password, user?.password);
  if (!isPasswordMatched) {
    throw new Error("Password is incorrect");
  }

  const userInfo = {
    userId: user?._id,
    username: user.username,
    email: user.email,
    profileImage: user.profileImage,
  };
  const token = createJwtToken(userInfo, config.jwt_access_screate, "365d");
  return {
    token,
  };
};

export const authService = { register, login };

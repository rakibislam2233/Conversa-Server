import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import config from "../config/index.js";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    fullName: {
      type: String,
      required: [true, "fullName is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    profileImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

//pre hook Middleware
userSchema.pre("save", async function (next) {
  //hashedPassword
  const userPassword = this?.password;
  const hashedPassword = await bcrypt.hash(
    userPassword,
    Number(config.bcrypt_salt_round)
  );
  this.password = hashedPassword;
  next();
});

const User = model("User", userSchema);
export default User;

import jwt from "jsonwebtoken";
export const createJwtToken = (userIfo, secret, expiresIn) => {
  return jwt.sign(userIfo, secret, {
    expiresIn,
  });
};

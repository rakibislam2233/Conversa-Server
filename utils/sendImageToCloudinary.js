import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import fs from "fs";
cloudinary.config({
  cloud_name: "dwddmg323",
  api_key: "566415819512521",
  api_secret: "MKULexIEGZd1JWYFFowuqCX3sHg",
});
export const sendImageToCloudinary = (path, imageName) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName },
      function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
          fs.unlink(path, (err) => {
            if (err) {
            } else {
            }
          });
        }
      }
    );
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB er limit
});

import { v2 as cloudinary } from "cloudinary";
import { RequestHandler } from "express";
import { Readable } from "stream";
import config from "../app/config";

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret, 
});

export const UploadToCloudinary: RequestHandler = async function (
  req,
  res,
  next
) {
  const buffer = req.file?.buffer!;
  if (req.body.data) {
    req.body = JSON.parse(req.body.data);
  }

  return new Promise((res, rej) => {
    if (buffer) {
      const theTransformStream = cloudinary.uploader.upload_stream(
        {
          public_id: req.file?.originalname,
          resource_type: "auto",
        },
        (err, result) => {
          if (err) return rej(err);
          if (result) {
            req.body.thumbnail = result?.secure_url;
            next();
          }
        }
      );
      const stream = Readable.from(buffer).pipe(theTransformStream);
    } else {
      next();
    }
  });
};

import mongoose, { Schema, models } from "mongoose";

const imageSchema = new Schema(
  {
    image_url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    imageName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ImageUser = models.ImageUser
  ? models.ImageUser
  : mongoose.model("ImageUser", imageSchema);

export default ImageUser;

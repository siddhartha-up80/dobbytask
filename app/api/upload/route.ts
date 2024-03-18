//@ts-nocheck

import { connectToDB } from "@/lib/database";
import { UploadImage } from "@/lib/upload-image";
import ImageUser from "@/models/Image-model";
import { NextRequest, NextResponse } from "next/server";

connectToDB();
export const GET = async (req: Request, res: Response) => {
  const { searchParams } = new URL(req.url);
  const param = searchParams.get("userId");
  console.log(param);

  const Images = await ImageUser.find({ user_id: param });

  return NextResponse.json(
    { images: Images, total: Images.length },
    {
      status: 200,
    }
  );
};

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();

  try {
    const image = formData.get("image") as unknown as File;
    const user_id = formData.get("userId") as string;
    const imageName = formData.get("imageName") as string;

    // console.log(user_id);

    // console.log(image);

    const data = await UploadImage(image, "user-images");

    await ImageUser.create({
      image_url: data?.secure_url,
      public_id: data?.public_id,
      user_id: user_id,
      imageName: imageName,
    });

    return NextResponse.json(
      { msg: data },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error occurred during uploading:", error);
    return new Response(JSON.stringify({ message: "Failed to upload image" }), {
      status: 500,
    });
  }
};

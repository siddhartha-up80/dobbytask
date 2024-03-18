"use client";

import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { Input } from "@/components/ui/input";

const Page = () => {
  const router = useRouter();
  const [decodedToken, setDecodedToken] = useState({
    userId: "",
    username: "",
  });
  const [images, setImages] = useState<
    {
      image_url: string;
      public_id: string;
      _id: string;
      imageName: string;
    }[]
  >([]);

  const [originalImages, SetOriginalImages] = useState<
    {
      image_url: string;
      public_id: string;
      _id: string;
      imageName: string;
    }[]
  >([]);

  // const token: any = localStorage.getItem("token");

  //   console.log(decodedToken);

  const fetchImages = async () => {
    const userId = decodedToken.userId;
    console.log(userId);
    try {
      const {
        data: { images },
      } = await axios.get(`/api/upload?userId=${userId}`);

      SetOriginalImages(images);
      setImages(images);
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = async () => {
    const token =  typeof window !== "undefined" ? localStorage.getItem("token"): null;
    if (!token) {
      router.push("/login");
    }

    if (token) {
      const login: any = jwtDecode(token);
      setDecodedToken(login);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (!decodedToken.userId) {
      return;
    }
    fetchImages();
  }, [decodedToken]);

  const [search, setSearch] = useState("");

  const filterImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value.toLowerCase();
    setSearch(searchText);

    const filteredImages = originalImages.filter((image) =>
      image.imageName.toLowerCase().includes(searchText)
    );

    // Check if the search text is empty
    if (searchText === "") {
      // If the search text is empty, reset the images to their original state
      setImages(originalImages);
    } else {
      // If the search text is not empty, set the filtered images
      setImages(filteredImages);
    }
  };

  return (
    <div>
      <section className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
        <h1 className="text-4xl font-bold leadi sm:text-5xl">
          Welcome {decodedToken.username && decodedToken.username}!
        </h1>
        <p className="px-8 mt-8 mb-12 text-lg">
          View all your uploaded your images here. A simple and easy way to view
          collection of images.
        </p>

        <div>
          <Input
            value={search}
            onChange={filterImages}
            placeholder="Search for images"
          />
        </div>
        <div className="flex flex-wrap justify-center">
          {images?.map((image) => (
            <div
              key={image.public_id}
              className=" p-2 m-2 bg-white rounded-lg shadow-md"
            >
              <Image
                width={200}
                height={200}
                src={image.image_url}
                alt={image.public_id}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Page;

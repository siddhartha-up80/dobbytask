"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import axios from "axios";

const Page = () => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageName, setImageName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [decodedToken, setDecodedToken] = useState({
    userId: "",
    username: "",
  });

  useEffect(() => {
    const token =  typeof window !== "undefined" ? localStorage.getItem("token"): null;
    if (!token) {
      router.push("/login");
    }

    if (token) {
      const login: any = jwtDecode(token);
      setDecodedToken(login);
    }
  }, []);

  const token: any =  typeof window !== "undefined" ? localStorage.getItem("token"): null;

  //   console.log(decodedToken);

  const userId = decodedToken.userId;
  const username = decodedToken.username;

  //   console.log("User ID:", userId);
  //   console.log("Username:", username);

  const handleFileChange = (e: any) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleImageNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageName(e.target.value);
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        setError("Please select an image to upload.");
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("userId", userId);
      formData.append("username", username);
      formData.append("imageName", imageName);

      // Upload image to backend (Cloudinary)
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Image uploaded successfully:", response.data);

      setLoading(false);
      setError("");
      setShowSuccess(true);
    } catch (error) {
      console.error("Failed to upload image:", error);
      setLoading(false);
      setError("Failed to upload image. Please try again.");
    }
  };

  return (
    <div>
      <section className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
        <h1 className="text-4xl font-bold leadi sm:text-5xl">
          Welcome {username}!
        </h1>
        <p className="px-8 mt-8 mb-12 text-lg">
          Upload your images here, and view them later. A simple and easy way to
          view collection of images.
        </p>
        <div className="flex flex-wrap justify-center space-y-2 max-w-md mx-auto">
          <Input type="file" onChange={handleFileChange} />
          <Input
            type="text"
            value={imageName}
            onChange={handleImageNameChange}
            placeholder="Image Name"
          />
          <Button
            onClick={handleUpload}
            disabled={loading}
            className="px-8 py-3 m-2 text-lg font-semibold bg-rose-600"
          >
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {showSuccess && (
          <p className="text-green-500">Image uploaded successfully.</p>
        )}
      </section>
    </div>
  );
};

export default Page;

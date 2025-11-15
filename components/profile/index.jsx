"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { cameraIcon } from "../image";
import { CircularProgress, TextField } from "@mui/material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useLoginData } from "../../providers/LoginProvider";

const Profile = () => {
  const {
    uploadFile,
    profileForm,
    setProfileForm,
    submitProfile,
    isLoading,
    handleRemoveImage,
  } = useLoginData();

  const fileInputRef = useRef(null);
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (value, fieldName) => {
    setProfileForm((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    submitProfile();
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-gray-800">
          Add Your Details
        </h2>
        <form onSubmit={onSubmit} className="">
          <div
            onClick={handleClick}
            className="flex flex-col justify-center cursor-pointer items-center align-middle p-4 rounded-xl border-dashed border-2 h-36 border-[#CECECE] w-1/3 mx-auto mt-4"
          >
            <input
              accept=".png, .jpeg"
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={uploadFile}
            />
            {profileForm?.profile_image?.preview ? (
              <div className="relative">
                <Image
                  width={10}
                  height={10}
                  src={profileForm?.profile_image?.preview}
                  alt="profile preview"
                  className="w-30 h-30 rounded-lg object-cover"
                />
                <div
                  onClick={handleRemoveImage}
                  className="absolute h-6 w-6 flex justify-center items-center rounded-full bg-[#1C3141] top-1 right-1 text-white"
                >
                  <ClearOutlinedIcon fontSize="small" />
                </div>
              </div>
            ) : (
              <>
                <Image src={cameraIcon} alt="cameraIcon" className="w-8 h-8" />
                <p className="text-[#CECECE] text-[9px] font-light">
                  Add your profile picture
                </p>
              </>
            )}
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <TextField
              label="Name"
              type="text"
              required
              value={profileForm?.name}
              onChange={(e) => handleInputChange(e.target.value, "name")}
            />

            <TextField
              label="Email"
              required
              value={profileForm?.email}
              onChange={(e) => handleInputChange(e.target.value, "email")}
            />

            <TextField
              label="Qualification"
              type="text"
              required
              value={profileForm?.qualification}
              onChange={(e) =>
                handleInputChange(e.target.value, "qualification")
              }
            />
          </div>

          <button
            type="submit"
            aria-live="polite"
            className="w-full mt-4 cursor-pointer bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            {isLoading ? (
              <CircularProgress size={20} color="white" />
            ) : (
              "Get Started"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

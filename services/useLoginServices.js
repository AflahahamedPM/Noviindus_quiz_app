"use client";
import React, { useRef, useState } from "react";
import APIRequest from "../utils/apiRequest";
import { API_ENDPOINTS } from "../config/api";
import useAlert from "../hooks/useAlert";
import { CheckValidation } from "../utils/validation";
import { useRouter } from "next/navigation";

const profileFields = {
  profile_image: {},
  name: "",
  email: "",
  qualification: "",
};

const useLoginServices = () => {
  const [mobileNo, setMobileNo] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { publishNotification } = useAlert();
  const [profileForm, setProfileForm] = useState(profileFields);
  const lastPreviewRef = useRef(null);
  const router = useRouter();

  const handleLogin = async () => {
    if (!mobileNo) {
      publishNotification("Mobile number is required", "error");
      return;
    }

    if (mobileNo.length !== 10) {
      publishNotification("Mobile number must be 10 digits", "error");
      return;
    }

    try {
      setIsLoading(true);
      const form = new FormData();
      form.append("mobile", "+91" + mobileNo);

      const response = await APIRequest.multipartFormDataRequest(
        "POST",
        API_ENDPOINTS.sendOtp,
        form
      );

      if (response?.success) {
        publishNotification("OTP sent successfully", "success");
        setIsOtpSent(true);
      } else {
        publishNotification(response?.message || "Login failed", "error");
      }
    } catch (err) {
      console.error("Login error:", err);
      publishNotification(
        err?.message || "An error occurred during login",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      publishNotification("OTP is required", "error");
      return;
    }
    if (otp.length !== 6) {
      publishNotification("OTP must be 6 digits", "error");
      return;
    }
    try {
      setIsLoading(true);
      const form = new FormData();
      form.append("mobile", "+91" + mobileNo);
      form.append("otp", otp);
      const response = await APIRequest.multipartFormDataRequest(
        "POST",
        API_ENDPOINTS.verifyOtp,
        form
      );

      if (response?.success && response?.login) {
        publishNotification("Login successful", "success");
        let accessToken = response?.access_token;
        let refreshToken = response?.refresh_token;
        accessToken = accessToken.replace(/^Bearer\s+/i, "");
        refreshToken = refreshToken.replace(/^Bearer\s+/i, "");
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setIsLoggedIn(true);
      } else {
        publishNotification(
          response?.message || "OTP verification failed",
          "error"
        );
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      publishNotification(
        err?.message || "An error occurred during OTP verification",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const uploadFile = (e) => {
    const file = e?.target?.files?.[0];
    if (!file) return;

    // revoke previous preview if any
    if (lastPreviewRef.current) {
      URL.revokeObjectURL(lastPreviewRef.current);
      lastPreviewRef.current = null;
    }

    // create object url preview
    const preview = URL.createObjectURL(file);
    lastPreviewRef.current = preview;

    // store file and preview in profileForm
    setProfileForm((prev) => ({
      ...prev,
      profile_image: { file, preview },
    }));
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setProfileForm((prev) => ({
      ...prev,
      profile_image: {},
    }));
  };

  const submitProfile = async () => {
    const missingFields = await CheckValidation(profileForm);
    if (!profileForm?.profile_image?.preview) {
      publishNotification("Profile Picture is required", "error");
      return;
    }
    if (missingFields?.length > 0) {
      publishNotification("Please fill all the required fields", "error");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(profileForm?.email)) {
      publishNotification("Please enter a valid email", "error");
      return;
    }

    try {
      setIsLoading(true);
      const form = new FormData();
      form.append("mobile", "+91" + mobileNo);
      form.append("email", profileForm?.email);
      form.append("name", profileForm?.name);
      form.append("qualification", profileForm?.qualification);

      const file =
        profileForm?.profile_image?.file ?? profileForm?.profile_image;
      if (!file) {
        publishNotification("Profile picture is required", "error");
        return;
      }
      form.append("profile_image", file);

      const response = await APIRequest.multipartFormDataRequest(
        "POST",
        API_ENDPOINTS?.profile,
        form
      );
      if (response?.success) {
        publishNotification("Profile updated successfully", "success");
        let accessToken = response?.access_token;
        let refreshToken = response?.refresh_token;
        accessToken = accessToken.replace(/^Bearer\s+/i, "");
        refreshToken = refreshToken.replace(/^Bearer\s+/i, "");
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        router.push("/home");
      } else {
        publishNotification(response?.message, "error");
      }
    } catch (err) {
      publishNotification(
        err?.message || "An error occurred during profile updation",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mobileNo,
    setMobileNo,
    handleLogin,
    isOtpSent,
    otp,
    setOtp,
    verifyOtp,
    isLoading,
    isLoggedIn,
    uploadFile,
    profileForm,
    setProfileForm,
    submitProfile,
    handleRemoveImage,
  };
};

export default useLoginServices;

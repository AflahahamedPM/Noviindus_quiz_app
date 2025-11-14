"use client";
import { useRouter } from "next/navigation";
import React from "react";
import useAlert from "./useAlert";
import APIRequest from "@/utils/apiRequest";
import { API_ENDPOINTS } from "@/config/api";

const useLogout = () => {
  const router = useRouter();
  const { publishNotification } = useAlert();

  const logout = async () => {
    try {
      const response = await APIRequest.multipartFormDataRequest(
        "POST",
        API_ENDPOINTS.logout
      );
      if (response?.success) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        publishNotification(response?.message, "success");
        router.push("/");
      }
    } catch (error) {
      publishNotification(error?.message || "Error while logging out", "error");
    }
  };

  return {
    logout,
  };
};

export default useLogout;

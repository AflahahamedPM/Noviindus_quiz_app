import React from "react";
import { flagImg } from "../image";
import Image from "next/image";
import { TextField, InputAdornment, CircularProgress } from "@mui/material";
import { useLoginData } from "../../providers/LoginProvider";

const LoginInputField = () => {
  const {
    mobileNo,
    setMobileNo,
    handleLogin,
    isOtpSent,
    otp,
    setOtp,
    verifyOtp,
    isLoading
  } = useLoginData();

  const handleInputChange = (e) => {
    if (isOtpSent) {
      const value = e.target.value;
      if (/^\d*$/.test(value) && value.length <= 6) {
        setOtp(value);
      }
    } else {
      const value = e.target.value;
      if (/^\d*$/.test(value) && value.length <= 10) {
        setMobileNo(value);
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-gray-800">
          {isOtpSent
            ? "Enter the code we texted you"
            : "Enter your phone number"}
        </h2>
        <p className="text-sm text-gray-600">
          {isOtpSent
            ? `We’ve sent an SMS to +91 ${mobileNo}`
            : "We use your mobile number to identify your account"}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <TextField
            placeholder={isOtpSent ? "123456" : "1234 567891"}
            required
            fullWidth
            label={isOtpSent ? "SMS Code" : "Mobile Number"}
            InputProps={{
              startAdornment: !isOtpSent && (
                <InputAdornment position="start">
                  <div className="flex items-center justify-center gap-2">
                    <Image
                      src={flagImg}
                      alt="flag"
                      className="w-15 object-contain h-15"
                    />
                  </div>
                </InputAdornment>
              ),
            }}
            onChange={handleInputChange}
            value={isOtpSent ? otp : mobileNo}
          />
        </div>

        <p className="text-xs text-gray-500 text-center">
          {isOtpSent ? (
            "Your 6 digit code is on its way. This can sometimes take a few moments to arrive."
          ) : (
            <>
              By tapping Get started, you agree to the
              <span className="text-[#1C3141] cursor-pointer">
                Terms & Conditions
              </span>
            </>
          )}
        </p>

        {isOtpSent && (
          <p
            onClick={handleLogin}
            className="underline text-[#1C3141] text-sm font-semibold cursor-pointer"
          >
            Resend code
          </p>
        )}

        <button
          onClick={isOtpSent ? verifyOtp : handleLogin}
          className="w-full md:mt-40 cursor-pointer bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          {
            isLoading ? <CircularProgress size={20} color="white"/> : "Get Started"
          }
        </button>
      </div>
    </div>
  );
};

export default LoginInputField;

"use client";
import Image from "next/image";
import React from "react";
import { bgImg, loginImg } from "../image";
import LoginInputField from "./LoginInputField";
import Profile from "../profile";
import { useLoginData } from "../../providers/LoginProvider";

const Login = () => {
  const { isLoggedIn } = useLoginData();

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <Image
        src={bgImg}
        alt="dark_bg_img"
        fill
        className="object-cover z-0"
        priority
      />

      <div className="relative z-10 flex justify-center items-center min-h-screen px-4 py-8">
        <div className="bg-white rounded-lg shadow-2xl flex flex-col md:flex-row w-full max-w-4xl  overflow-hidden">
          <aside className=" md:flex flex-1 bg-linear-to-b from-[#1c3141] to-[#487EA7] items-center justify-center p-8">
            <Image
              src={loginImg}
              alt="login_img"
              width={400}
              height={500}
              className="object-contain"
            />
          </aside>

          <section className="flex-1 flex p-6 md:p-8">
            {isLoggedIn ? <Profile /> : <LoginInputField />}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Login;

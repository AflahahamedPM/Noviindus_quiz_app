"use client";
import React from "react";
import { headerLogo } from "../image";
import Image from "next/image";
import useLogout from "@/hooks/useLogout";

const Header = () => {
  const { logout } = useLogout();
  return (
    <header className="bg-white shadow-md">
      <nav
        aria-label="Main Navigation"
        className="w-full py-4 px-6 flex items-center"
      >
        <div className="flex-1" />
        <div className="flex-none">
          <Image src={headerLogo} alt="Header Logo" width={120} height={100} />
        </div>
        <div className="flex-1 flex justify-end">
          <button
            className="bg-[#177A9C] text-white font-medium py-1 sm:px-6  px-3 rounded-lg transition-colors cursor-pointer"
            onClick={logout}
          >
            Log out
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;

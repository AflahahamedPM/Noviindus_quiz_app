import React from 'react'
import { headerLogo } from '../image';
import Image from 'next/image';

const Header = () => {
  return (
    <header>
        <div className="w-full bg-white shadow-md py-4 px-6 flex items-center">
            <div className="flex-1" />
            <div className="flex-none">
                <Image src={headerLogo} alt="Header Logo" width={120} height={100} />
            </div>
            <div className="flex-1 flex justify-end">
                <button className="bg-[#177A9C] text-white font-medium py-1 px-6 rounded-lg transition-colors">
                    Log out
                </button>
            </div>
        </div>
    </header>
  )
}

export default Header;
"use client";

import { MenuLateralProps } from "@/types/interfaces";
import Link from "next/link";
import Image from "next/image";
import { LogoTupan } from "../../public/export";

export const MenuLateral = ({ menuData }: MenuLateralProps) => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
      />

      <div className="h-full min-h-full w-fit flex flex-row bg-gray-100">
        {/* Logo */}
        <div className="flex flex-col w-56 h-full overflow-hidden">
          <div className="bg-transparent p-4">
            <div className="flex items-center justify-center h-20">
              <Image src={LogoTupan} alt="Logo" priority width={200} height={100} />
            </div>
          </div>
          <div className="bg-gradient-to-t min-h-full from-indigo-500">
            {/* Menu */}
            <ul className="flex flex-col py-4">
              {/* Mapeia cada item do menu */}
              
              {menuData.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.path}
                    className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-indigo-800 hover:text-green-600"
                  >
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                      <i className={item.icone}></i>
                    </span>
                    <span className="text-sm font-medium">{item.nome}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

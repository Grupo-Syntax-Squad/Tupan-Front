import { NavTopProps } from "@/types/interfaces";
import React from "react";

export const NavTop = ({ nome, path }: NavTopProps) => {
  return (
    <div className="flex flex-col bg-gradient-to-l from-green-300 p-6">
      <React.Fragment>
        <span className="text-start pr-2">{path}</span>
      </React.Fragment>
      <h1 className="text-right pr-2">{nome}</h1>
    </div>
  );
};
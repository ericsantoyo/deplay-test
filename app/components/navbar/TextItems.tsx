"use client";
import React, { useState } from "react";
import Link from "next/link";
import { navLinks } from "@/constants";

interface NavLink {
  id: string;
  title: string;
}

interface TextItemsProps {
  classNameDiv: string;
  classNameUL: string;
  classNameLI: string;
}

const TextItems: React.FC<TextItemsProps> = ({
  classNameDiv,
  classNameLI,
  classNameUL,
}) => {
  const [navbar, setNavbar] = useState(false);
  return (
    <div
      className={` ${classNameDiv} 
                
              `}
    >
      <ul
        className={` ${classNameUL}
              flex justify-center items-center text-center 
              flex-row md:gap-x-6 md:mr-6 md:ml-4 first-letter 
              my-2 
              `}
      >
        {navLinks.map((nav: NavLink) => (
          <li
            key={nav.id}
            className={`
                  ${classNameLI}
                    w-full h-full cursor-pointer text-md text-center
                    group relative hover:opacity-80 transition-all                
                    dark:text-neutral-300 
                    `}
          >
            <Link onClick={() => setNavbar(!navbar)} href={`${nav.id}`}>
              {nav.title}
            </Link>
            <span
              className="
              absolute left-1/2 transform -translate-x-1/2 -bottom-1 md:-bottom-2 h-[3px] group-hover:w-[90%]
              bg-red-700 transition-all
                     
                      "
            ></span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TextItems;

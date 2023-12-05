import Image from "next/image";
import Link from "next/link";
import React from "react";
import IconButton from "@mui/material/IconButton";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import GamesIcon from "./GamesIcon";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Button } from "@/components/ui/button";
import Tooltip from "@mui/material/Tooltip";

interface SocialIconsProps {
  className: string;
}

const SocialIcons = ({ className }: SocialIconsProps) => {
  return (
    <div className={`${className} `}>
      {/* YOUTUBE LOGO */}
      <Link className="" target="_blank" href="https://www.youtube.com/">
        <Tooltip
          PopperProps={{
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, -7],
                },
              },
            ],
          }}
          title="YouTube"
        >
          <Button
            variant="default"
            size={"icon"}
            className={`group transition-all bg-neutral-50 dark:bg-neutral-300 dark:hover:bg-red-600 hover:bg-red-600`}
          >
            <YouTubeIcon
              color="error"
              className="group-hover:text-neutral-100 transition "
            />
          </Button>
        </Tooltip>
      </Link>

      {/* TWITTER LOGO */}
      <Link className="" target="_blank" href="https://twitter.com/home">
        <Tooltip
          PopperProps={{
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, -7],
                },
              },
            ],
          }}
          title="Twitter"
        >
          <Button
            variant="default"
            size={"icon"}
            className={` group transition-all bg-neutral-50 dark:bg-neutral-300 dark:hover:bg-sky-600 hover:bg-sky-600`}
          >
            <TwitterIcon
            color="primary"
            className="group-hover:text-neutral-100 transition  "
          />
          </Button>
        </Tooltip>
      </Link>

      {/* <ThemeSwitcher className="" /> */}

      {/* THREADS LOGO */}
      {/* <Link className="bg-gradient-to-r from-white to-white hover:from-[#7a7a7a] hover:to-[#7a7a7aab] transition flex justify-center items-center rounded-full w-7 h-7 align-middle drop-shadow-md shadow-black" target="_blank" href="https://threads.net/">
            <span className="">
                <Image 
                src="/threads.svg" 
                height={20} 
                width={20}
                alt='Threads'
                className='hover:invert' />
              </span>
          </Link> */}

      {/* FACEBOOK LOGO */}
      {/* <Link className="bg-gradient-to-r from-white to-white hover:from-[#4267B2] hover:to-[#4267b2ab] transition flex justify-center items-center rounded-full w-7 h-7 align-middle drop-shadow-md shadow-black" target="_blank" href="https://facebook.com/">
            <span className="">
                <Image 
                src="/facebook.svg" 
                height={20} 
                width={20}
                alt='Facebook'
                className='hover:invert' />
              </span>
          </Link> */}

      {/* INSTAGRAM LOGO */}
      {/* <Link className="bg-gradient-to-r from-white to-white hover:from-pink-500 hover:to-yellow-500 transition flex justify-center items-center rounded-full w-7 h-7 align-middle drop-shadow-md shadow-black" target="_blank" href="https://instagram.com/">
            <span className="">
                <Image 
                src="/instagram.svg" 
                height={20} 
                width={20}
                alt='Instagram'
                className='hover:invert' />
              </span>
          </Link> */}
    </div>
  );
};

export default SocialIcons;

import GamesIcon from "@/app/components/navbar/GamesIcon";
import Logo from "@/app/components/navbar/Logo";
import SearchBox from "@/app/components/navbar/SearchBox";
import SocialIcons from "@/app/components/navbar/SocialIcons";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import Link from "next/link";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";

import { getAllMatches } from "@/database/client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import GamesSheet from "../GamesSheet";
import MenuIcon from "@mui/icons-material/Menu";

type Props = {};

const TopBar = (props: Props) => {
  const handleSearch = (query: string) => {};

  return (
    <>
      <div
        className="
        container flex justify-between items-center 
        mx-auto max-w-6xl w-full  flex-nowrap 
        "
      >
        {/* --- GAMES & SEARCH ICONS --- */}
        <div className="md:order-2 shrink-0 md:ml-3">
          <div className="shrink-0 flex justify-between items-center ">
            {/* <SearchBox divClassName="hidden" /> */}
            <div className="md:ml-3">
              <Sheet>
                <SheetTrigger asChild>
                  <GamesIcon className="" />
                </SheetTrigger>
                <SheetContent className=" w-[350px] h-full p-0 flex flex-col bg-neutral-50  shadow-lg shadow-neutral-300">
                  <GamesSheet />
                </SheetContent>
              </Sheet>
            </div>
            <SearchBox divClassName="md:order-first ml-3 md:ml-0" />
          </div>
        </div>

        {/* --- LOGO --- */}
        <div className="md:flex-shrink-0 md:grow md:order-first shrink-0">
          <Logo className="" />
        </div>

        {/* --- SOCIAL ICONS --- */}
        <SocialIcons className=" shrink-0 flex justify-between items-center space-x-3" />

        {/* MENU WITH TEXT AND ICONS */}
        <div className="hidden md:flex order-last md:order-first mr-12 justify-between items-center  md:gap-2 lg:gap-8  flex-nowrap font-semibold ">
          {/* MARKET BUTTON */}
          <Link
            href="/market"
            className="group w-16 flex flex-col justify-center items-center"
          >
            <p className="transition-all text-transparent text-center text-[14px] p-0 m-0">_______</p>
            <IconButton sx={{ padding: 0 }}>
              <QueryStatsIcon
                className="text-neutral-800 "
                sx={{ fontSize: 36 }}
              />
            </IconButton>
            <p className="transition-all group-hover:text-inherit text-transparent text-center text-[14px] p-0 m-0">Mercado</p>
          </Link>

          {/* NEWS BUTTON */}
          <Link
            href="/news"
            className="group w-16 flex flex-col justify-center items-center"
          >
            <p className="transition-all text-transparent text-center text-[14px] p-0 m-0">_______</p>
            <IconButton sx={{ padding: 0 }}>
              <NewspaperIcon
                className="text-neutral-800"
                sx={{ fontSize: 36 }}
              />
            </IconButton>
            <p className="transition-all group-hover:text-inherit text-transparent text-center text-[14px] p-0 m-0">Noticias</p>
          </Link>

          {/* STATS BUTTON */}
          <Link
            href="/stats"
            className="group w-16 flex flex-col justify-center items-center"
          >
            <p className="transition-all text-transparent text-center text-[14px] p-0 m-0">_______</p>
            <IconButton sx={{ padding: 0 }}>
              <TroubleshootIcon
                className="text-neutral-800"
                sx={{ fontSize: 36 }}
              />
            </IconButton>
            <p className="transition-all group-hover:text-inherit text-transparent text-center text-[14px] p-0 m-0">Stats</p>
          </Link>

          {/* STATS BUTTON */}
          <Link
            href="/calendar"
            className="group w-16 flex flex-col justify-center items-center"
          >
            <p className="transition-all text-transparent text-center text-[14px] p-0 m-0">_______</p>
            <IconButton sx={{ padding: 0 }}>
              <CalendarMonthIcon
                className="text-neutral-800"
                sx={{ fontSize: 36 }}
              />
            </IconButton>
            <p className="transition-all group-hover:text-inherit text-transparent text-center text-[14px] p-0 m-0">Calendario</p>
          </Link>

          {/* MYTEAM BUTTON */}
          <Link
            href="/myteam"
            className="group w-16 flex flex-col justify-center items-center"
          >
            <p className="transition-all text-transparent text-center text-[14px] p-0 m-0">_______</p>
            <IconButton sx={{ padding: 0 }}>
              <AssignmentIndIcon
                className="text-neutral-800"
                sx={{ fontSize: 36 }}
              />
            </IconButton>
            <p className="transition-all group-hover:text-inherit text-transparent text-center text-[14px] p-0 m-0">MyTeam</p>
          </Link>
        </div>
       
      </div>
    </>
  );
};

export default TopBar;

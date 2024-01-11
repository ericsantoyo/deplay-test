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
        <div className="hidden lg:flex order-last md:order-first justify-between items-center  md:gap-2 lg:gap-8  flex-nowrap font-semibold mr-4">
          {/* MARKET BUTTON */}
          <Link
            href="/market"
            className="w-16 flex flex-col justify-center items-center"
          >
            <IconButton sx={{ padding: 0 }}>
              <QueryStatsIcon
                className="text-neutral-800 "
                sx={{ fontSize: 28 }}
              />
            </IconButton>
            <p className="text-center text-[14px] p-0 m-0">Mercado</p>
          </Link>

          {/* NEWS BUTTON */}
          <Link
            href="/news"
            className="w-16 flex flex-col justify-center items-center"
          >
            <IconButton sx={{ padding: 0 }}>
              <NewspaperIcon
                className="text-neutral-800"
                sx={{ fontSize: 28 }}
              />
            </IconButton>
            <p className="text-center text-[14px] p-0 m-0">Noticias</p>
          </Link>

          {/* STATS BUTTON */}
          <Link
            href="/stats"
            className="w-16 flex flex-col justify-center items-center"
          >
            <IconButton sx={{ padding: 0 }}>
              <TroubleshootIcon
                className="text-neutral-800"
                sx={{ fontSize: 28 }}
              />
            </IconButton>
            <p className="text-center text-[14px] p-0 m-0">Stats</p>
          </Link>

          {/* STATS BUTTON */}
          <Link
            href="/calendar"
            className="w-16 flex flex-col justify-center items-center"
          >
            <IconButton sx={{ padding: 0 }}>
              <CalendarMonthIcon
                className="text-neutral-800"
                sx={{ fontSize: 28 }}
              />
            </IconButton>
            <p className="text-center text-[14px] p-0 m-0">Calendario</p>
          </Link>

          {/* MYTEAM BUTTON */}
          <Link
            href="/myteam"
            className="w-16 flex flex-col justify-center items-center"
          >
            <IconButton sx={{ padding: 0 }}>
              <AssignmentIndIcon
                className="text-neutral-800"
                sx={{ fontSize: 28 }}
              />
            </IconButton>
            <p className="text-center text-[14px] p-0 m-0">MyTeam</p>
          </Link>
        </div>
        {/* MENU WITH ONLY ICONS AND TOOLTIP */}
        <div className="hidden md:flex lg:hidden order-last md:order-first justify-between gap-3  flex-nowrap font-semibold mx-4">
          <Link
            href="/market"
            className="w-16 flex flex-col justify-center items-center"
          >
            <Tooltip
              PopperProps={{
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -18],
                    },
                  },
                ],
              }}
              title="Mercado"
            >
              <IconButton>
                <QueryStatsIcon
                  className="text-neutral-800"
                  sx={{ fontSize: 32 }}
                />
              </IconButton>
            </Tooltip>
          </Link>

          <Link
            href="/news"
            className="flex flex-col justify-center items-center"
          >
            <Tooltip
              PopperProps={{
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -18],
                    },
                  },
                ],
              }}
              title="Noticias"
            >
              <IconButton>
                <NewspaperIcon
                  className="text-neutral-800"
                  sx={{ fontSize: 32 }}
                />
              </IconButton>
            </Tooltip>
          </Link>

          <Link
            href="/stats"
            className="flex flex-col justify-center items-center"
          >
            <Tooltip
              PopperProps={{
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -18],
                    },
                  },
                ],
              }}
              title="Stats"
            >
              <IconButton>
                <TroubleshootIcon
                  className="text-neutral-800"
                  sx={{ fontSize: 32 }}
                />
              </IconButton>
            </Tooltip>
          </Link>

          <Link
            href="/calendar"
            className="flex flex-col justify-center items-center"
          >
            <Tooltip
              PopperProps={{
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -18],
                    },
                  },
                ],
              }}
              title="Calendario"
            >
              <IconButton>
                <CalendarMonthIcon
                  className="text-neutral-800"
                  sx={{ fontSize: 32 }}
                />
              </IconButton>
            </Tooltip>
          </Link>

          <Link
            href="/myteam"
            className="flex flex-col justify-center items-center"
          >
            <Tooltip
              PopperProps={{
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -18],
                    },
                  },
                ],
              }}
              title="MyTeam"
            >
              <IconButton>
                <AssignmentIndIcon
                  className="text-neutral-800"
                  sx={{ fontSize: 32 }}
                />
              </IconButton>
            </Tooltip>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TopBar;

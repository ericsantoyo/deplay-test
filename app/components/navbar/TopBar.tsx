import GamesIcon from "@/app/components/navbar/GamesIcon";
import Logo from "@/app/components/navbar/Logo";
import SearchBox from "@/app/components/navbar/SearchBox";
import SocialIcons from "@/app/components/navbar/SocialIcons";
import TextItems from "@/app/components/navbar/TextItems";
import Hamburger from "@/app/components/navbar/Hamburger";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import GroupsTwoToneIcon from "@mui/icons-material/GroupsTwoTone";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import SportsIcon from "@mui/icons-material/Sports";
import Link from "next/link";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

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

// import { UserButton } from "@clerk/nextjs";
// import {
//   SignInButton,
//   SignOutButton,
//   SignedIn,
//   SignedOut,
// } from "@clerk/nextjs";
// import { Button } from "@/components/ui/button";

// CHANGEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE    eeeeeeeeeeeeeeeeeeeeeeeeeeeee start

type Props = {};

const TopBar = (props: Props) => {
  const handleSearch = (query: string) => {};

  return (
    <>
      <div
        className="
        container flex justify-between items-center md:flex-row 
        mx-auto max-w-6xl w-full md:flex-nowrap flex-wrap 
        "
      >
        {/* --- GAMES ICON --- */}
        <div className="md:order-2 shrink-0 md:ml-3">
          <Sheet>
            <SheetTrigger asChild>
              <GamesIcon className="" />
            </SheetTrigger>
            <SheetContent className=" w-[350px] h-full p-0 flex flex-col bg-neutral-50  shadow-lg shadow-neutral-500">
              <GamesSheet />
            </SheetContent>
          </Sheet>
        </div>

        {/* --- LOGO --- */}
        <div className="md:flex-shrink-0 md:grow md:order-first shrink-0">
          <Logo className="" />
        </div>

        {/* --- HAMBURGER MENU --- */}
        <Sheet>
          <div className="md:hidden shrink-0">
            <SheetTrigger asChild>
              <IconButton
                size="large"
                className="w-12 h-12 group"
                sx={{
                  // boxShadow: 2,
                  borderRadius: 1,
                  padding: 0,
                }}
              >
                <MenuIcon
                  fontSize="large"
                  sx={{}}
                  className="transition-all group-hover:scale-110 dark:text-neutral-300 "
                />
              </IconButton>
            </SheetTrigger>
          </div>
          <SheetContent
            side={"top"}
            className=" flex flex-row justify-between items-center pr-14"
          >
            <SearchBox className={``} onSearch={handleSearch} />
            <SocialIcons className=" shrink-0 flex justify-between items-center space-x-3" />
          </SheetContent>
        </Sheet>

        <div
          className={`
          transition-all md:flex md:flex-row justify-between md:items-center  w-full md:w-auto flex-nowrap 
             flex-col items-center" hidden
            }`}
        >
          <div
            className={`transition-all flex flex-row justify-between items-center w-full space-x-3 py-4  `}
          >
            {/* SEARCHBOX */}
            <SearchBox className={`grow `} onSearch={handleSearch} />
            {/* SOCIALS */}
            <SocialIcons className=" shrink-0 flex justify-between items-center space-x-3" />
            {/* THEMETOGGLE */}

            {/* <SignedOut>
              <SignInButton mode="modal">
                <Button variant="usericon" size="rounded" className="shrink-0 group">
                  <User className="group-hover:invert transition p-[1px]" />
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn> */}
            {/* USERBUTTON */}
            {/* <div className="ml-2 shrink-0">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn> */}
          </div>

          {/* TEXT MENU */}
          {/* <TextItems
            classNameDiv={`order-last md:order-first   flex-nowrap font-semibold 
            }`}
            classNameUL={""}
            classNameLI={""}
          /> */}
          <div className="flex order-last md:order-first justify-between items-center gap-8  flex-nowrap font-semibold mr-4">
            {/* MARKET BUTTON */}
            <Link
              href="/market"
              className="flex flex-col justify-center items-center"
            >
              <IconButton sx={{ padding: 0 }}>
                <QueryStatsIcon
                  className="text-neutral-800 "
                  sx={{ fontSize: 32 }}
                />
              </IconButton>
              <p className="text-center text-[14px] p-0 m-0">Mercado</p>
            </Link>

            {/* NEWS BUTTON */}
            <Link
              href="/news"
              className="flex flex-col justify-center items-center"
            >
              
                <IconButton sx={{ padding: 0 }}>
                  <NewspaperIcon
                    className="text-neutral-800"
                    sx={{ fontSize: 32 }}
                  />
                </IconButton>
                <p className="text-center text-[14px] p-0 m-0">Noticias</p>
            </Link>

            {/* STATS BUTTON */}
            <Link
              href="/stats"
              className="flex flex-col justify-center items-center"
            >
              
                <IconButton sx={{ padding: 0 }}>
                  <TroubleshootIcon
                    className="text-neutral-800"
                    sx={{ fontSize: 32 }}
                  />
                </IconButton>
                <p className="text-center text-[14px] p-0 m-0">Stats</p>
            
            </Link>

            {/* STATS BUTTON */}
            <Link
              href="/calendar"
              className="flex flex-col justify-center items-center"
            >
              
                <IconButton sx={{ padding: 0 }}>
                  <CalendarMonthIcon
                    className="text-neutral-800"
                    sx={{ fontSize: 32 }}
                  />
                </IconButton>
                <p className="text-center text-[14px] p-0 m-0">Calendario</p>
             
            </Link>

            {/* MYTEAM BUTTON */}
            <Link
              href="/myteam"
              className="flex flex-col justify-center items-center"
            >
              
                <IconButton sx={{ padding: 0 }}>
                  <AssignmentIndIcon
                    className="text-neutral-800"
                    sx={{ fontSize: 32 }}
                  />
                </IconButton>
                <p className="text-center text-[14px] p-0 m-0">MyTeam</p>
              
            </Link>
          </div>
        </div>
        {/* MENU WITH ONLY ICONS AND TOOLTIP */}
        {/* <div className="flex order-last md:order-first justify-between gap-6  flex-nowrap font-semibold mr-4">
          <Link
            href="/market"
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
        </div> */}
      </div>
    </>
  );
};

export default TopBar;

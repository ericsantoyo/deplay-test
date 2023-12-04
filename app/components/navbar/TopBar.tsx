
import GamesIcon from "@/app/components/navbar/GamesIcon";
import Logo from "@/app/components/navbar/Logo";
import SearchBox from "@/app/components/navbar/SearchBox";
import SocialIcons from "@/app/components/navbar/SocialIcons";
import TextItems from "@/app/components/navbar/TextItems";
import Hamburger from "@/app/components/navbar/Hamburger";
import IconButton from "@mui/material/IconButton";

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
          <TextItems
            classNameDiv={`order-last md:order-first   flex-nowrap font-semibold 
            }`}
            classNameUL={""}
            classNameLI={""}
          />
        </div>
      </div>
    </>
  );
};

export default TopBar;

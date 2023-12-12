"use client";
import useSWR from "swr";
import React, { useEffect, useState } from "react";

import { getAllMatches } from "@/database/client";

import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { getCurrentWeek, slugById } from "@/utils/utils";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Your component
export default function CommingWeek() {
  const [selectedWeek, setSelectedWeek] = useState<number>(1); // Fix 1: Specify the type of selectedWeek as number
  // Using SWR to fetch data
  const {
    data: matches,
    error,
    isLoading,
  } = useSWR("/api/user", getAllMatches);

  useEffect(() => {
    if (matches && Array.isArray(matches.allMatches)) {
      const initialWeek = getCurrentWeek(matches.allMatches);
      setSelectedWeek(initialWeek);
    }
  }, [matches]);

  // Handling errors
  if (error) {
    console.error("Error fetching matches:", error);
    return <div>Error fetching matches</div>;
  }

  const handleWeekChange = (value: string) => {
    // Fix 2: Change the type of value to string
    setSelectedWeek(parseInt(value)); // Fix 3: Parse the string value to number
  };

  const handlePrevWeek = () => {
    setSelectedWeek((prevWeek) => Math.max(1, prevWeek - 1));
  };

  const handleNextWeek = () => {
    setSelectedWeek((prevWeek) => Math.min(38, prevWeek + 1));
  };


  return (
    <div className="flex flex-col justify-start items-center w-full h-full overflow-y-auto grow">
      <div className="flex flex-row justify-center items-center gap-4 pb-2">
        <p className="text-base	 uppercase font-extrabold">
          {matches && `Jornada ${selectedWeek} `}
        </p>
       
        <p className="text-sm capitalize font-semibold">
          {matches &&
            new Date(
              matches.allMatches
                .filter((match) => match.week === selectedWeek)
                .sort(
                  (a, b) =>
                    new Date(a.matchDate).getTime() -
                    new Date(b.matchDate).getTime()
                )[0].matchDate
            ).toLocaleDateString("es-EU", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
        </p>
      </div>
      {/* <Separator className=" mb-4" /> */}
      <div className="flex flex-row justify-between items-center w-full">
        <IconButton onClick={handlePrevWeek} className="mr-3">
          <ChevronLeftIcon />
        </IconButton>

        <div className=" grid grid-cols-2 md:grid-cols-5 gap-x-3 gap-y-2 mx-auto w-full">
          {/* Display matches for the selected week */}
          {matches &&
            matches.allMatches
              .filter((match) => match.week === selectedWeek)
              .sort(
                (a, b) =>
                  new Date(a.matchDate).getTime() -
                  new Date(b.matchDate).getTime()
              )
              .map((match) => (
                <div key={match.matchID}>
                  <Card className="flex flex-col justify-between items-center w-full  h-full py-[6px] text-center rounded-md">
                    {/* <p className="text-[10px] uppercase font-medium text-center">
                    {new Date(match.matchDate).toLocaleDateString("es-EU", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </p> */}
                    <div className="flex flex-row justify-between items-center text-center w-full ">
                      <Image
                        src={`/teamLogos/${slugById(match.localTeamID)}.png`}
                        alt="home"
                        width={48}
                        height={48}
                        style={{ objectFit: "contain" }}
                        className="h-6 "
                      />
                      <div className="flex flex-col justify-center items-center">
                        <div className="flex">
                          <p className="font-semibold">{match.localScore}</p>
                          <p className="mx-1">-</p>
                          <p className="font-semibold">{match.visitorScore}</p>
                        </div>
                      </div>
                      <Image
                        src={`/teamLogos/${slugById(match.visitorTeamID)}.png`}
                        alt="home"
                        width={48}
                        height={48}
                        style={{ objectFit: "contain" }}
                        className="h-6 "
                      />
                    </div>
                    {/* <p className="text-[11px] uppercase font-medium text-center">
                    {new Date(match.matchDate).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p> */}
                  </Card>
                </div>
              ))}
        </div>
        {/* <Separator className=" mt-4" /> */}
        {/* <pre className="text-center">
        {JSON.stringify(matches, null, 2)}
      </pre> */}
        <IconButton onClick={handleNextWeek} className="ml-3">
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
}

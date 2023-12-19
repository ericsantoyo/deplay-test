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
import MatchCountdown from "./MatchCountdown";
import { Button } from "@/components/ui/button";

// Your component
export default function GamesPreview() {
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
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
  const firstMatchDate =
    matches &&
    matches.allMatches
      .filter((match) => match.week === selectedWeek)
      .sort(
        (a, b) =>
          new Date(a.matchDate).getTime() - new Date(b.matchDate).getTime()
      )[0]?.matchDate;

  const weekday = firstMatchDate
    ? new Date(firstMatchDate).toLocaleDateString("es-EU", { weekday: "short" })
    : "";
  const monthDay = firstMatchDate
    ? new Date(firstMatchDate).toLocaleDateString("es-EU", {
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <div className="flex flex-col justify-start items-center w-full h-full overflow-y-auto grow">
      <div className="flex flex-row justify-center items-center gap-2 pb-2">
        <Button variant="outline" onClick={handlePrevWeek} className="mr-3 ">
          <ChevronLeftIcon />
        </Button>
        <p className="text-base	text-neutral-700 uppercase font-extrabold">
          Jornada
        </p>
        <p className="text-xl	text-red-700 uppercase font-extrabold">
          {matches && `${selectedWeek}  `}
        </p>
        <div className="mx-2 h-4 border-l border-neutral-300"></div>
        <p className="text-sm text-neutral-800 capitalize font-semibold">
          {matches && (
            <>
              <span className="font-bold uppercase">{weekday}</span> {monthDay}
            </>
          )}
        </p>

        <Button variant="outline" onClick={handleNextWeek} className="ml-3">
          <ChevronRightIcon />
        </Button>
        {/* <MatchCountdown matches={matches} selectedWeek={selectedWeek} /> */}
      </div>
      {/* <div className="mb-4 w-full border-t border-neutral-300"></div> */}
      {/* <Separator className=" mb-4" /> */}
      <div className="flex flex-row justify-between items-center w-full p-1 ">
        <div className=" grid grid-cols-2 md:grid-cols-5 gap-x-3 gap-y-2 mx-auto w-full  ">
          {/* Display matches for the selected week */}
          {matches &&
            matches.allMatches
              .filter((match) => match.week === selectedWeek)
              .sort(
                (a, b) =>
                  new Date(a.matchDate).getTime() -
                  new Date(b.matchDate).getTime()
              )
              .map((match) => {
                let localTeamClass = "";
                let visitorTeamClass = "";

                if (match.matchState === 7) {
                  if (match.localScore > match.visitorScore) {
                    localTeamClass =
                      "w-2 mt-1 bg-green-500 rounded-full border-2 pb-1 border-green-500";
                    visitorTeamClass =
                      "w-2 mt-1 bg-red-500 rounded-full border-2 pb-1 border-red-500";
                  } else if (match.localScore < match.visitorScore) {
                    localTeamClass =
                      "w-2 mt-1 bg-red-500 rounded-full border-2 pb-1 border-red-500";
                    visitorTeamClass =
                      "w-2 mt-1 bg-green-500 rounded-full border-2 pb-1 border-green-500";
                  } else {
                    // Draw
                    localTeamClass =
                      "w-2 mt-1 bg-yellow-500 rounded-full border-2 pb-1 border-yellow-500";
                    visitorTeamClass =
                      "w-2 mt-1 bg-yellow-500 rounded-full border-2 pb-1 border-yellow-500";
                  }
                }

                return (
                  <div className="" key={match.matchID}>
                    <Card className="flex flex-row justify-between items-center w-full h-full px-4 text-center   ">
                      <div className="flex flex-col justify-center items-center rounded">
                        <Image
                          src={`/teamLogos/${slugById(match.localTeamID)}.png`}
                          alt="home team"
                          width={40}
                          height={40}
                          style={{
                            objectFit: "contain",
                            width: "auto",
                          }}
                          className={`h-10`}
                        />
                        <div className={` ${localTeamClass}`}></div>
                      </div>
                      <div className="flex flex-col justify-between items-center w-full  h-full py-1 text-center rounded-md">
                        <p className="text-[10px] uppercase font-medium text-center">
                          <span className="font-bold">
                            {new Date(match.matchDate).toLocaleDateString(
                              "es-EU",
                              {
                                weekday: "short",
                              }
                            )}
                          </span>{" "}
                          {new Date(match.matchDate).toLocaleDateString(
                            "es-EU",
                            {
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </p>
                        <div className="flex flex-col justify-center items-center">
                          <div className="flex">
                            <p className="font-semibold">{match.localScore}</p>
                            <p className="mx-1">-</p>
                            <p className="font-semibold">
                              {match.visitorScore}
                            </p>
                          </div>
                        </div>
                        <p
                          className={`text-[11px] uppercase font-medium text-center ${
                            match.matchState === 7
                              ? "text-red-800"
                              : "text-green-800"
                          }`}
                        >
                          {match.matchState === 7
                            ? "Final"
                            : new Date(match.matchDate).toLocaleTimeString(
                                "en-GB",
                                {
                                  hour: "numeric",
                                  minute: "2-digit",
                                  hour12: false,
                                }
                              )}
                        </p>
                      </div>
                      <div className="flex flex-col justify-center items-center">
                        <Image
                          src={`/teamLogos/${slugById(
                            match.visitorTeamID
                          )}.png`}
                          alt="visitor team"
                          width={40}
                          height={40}
                          style={{
                            objectFit: "contain",
                            width: "auto",
                          }}
                          className={`h-10`}
                        />
                        <div className={` ${visitorTeamClass}`}></div>
                      </div>
                    </Card>
                  </div>
                );
              })}
        </div>
        {/* <Separator className=" mt-4" /> */}
        {/* <pre className="text-center">
        {JSON.stringify(matches, null, 2)}
      </pre> */}
      </div>
    </div>
  );
}

"use client";
import useSWR from "swr";
import React, { useEffect, useState } from "react";

import { getAllMatches } from "@/database/client";

import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { getCurrentWeek, nicknameById, slugById } from "@/utils/utils";

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
import Link from "next/link";

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
                    localTeamClass = "text-green-600  ";
                    visitorTeamClass = "text-red-600 ";
                  } else if (match.localScore < match.visitorScore) {
                    localTeamClass = "text-red-600 ";
                    visitorTeamClass = "text-green-600 ";
                  } else {
                    // Draw
                    localTeamClass = "text-orange-400 ";
                    visitorTeamClass = "text-orange-400 ";
                  }
                }

                return (
                  <div className="" key={match.matchID}>
                    <Card className="flex flex-row justify-between items-center text-center px-1.5 w-full h-full">
                      {/* LOCAL TEAM */}
                      <Link className="" href={`/team/${match.localTeamID}`}>
                        <div className="flex flex-col justify-center items-center h-16 w-12 shrink-0 py-2">
                          <Image
                            src={`/teamLogos/${slugById(
                              match.localTeamID
                            )}.png`}
                            alt="home team"
                            width={48}
                            height={48}
                            style={{
                              objectFit: "contain",
                              width: "auto",
                            }}
                            className="h-8  "
                            priority
                          />
                          {/* <p className="font-bold text-[11px] p-0 m-0 leading-none">
                            {nicknameById(match.localTeamID)}
                          </p> */}
                        </div>
                      </Link>

                      {/* DATE & SCORE */}
                      <div className="flex flex-col justify-center gap-1 items-center grow w-full h-full whitespace-nowrap py-2 text-center text-[10px] leading-none">
                        <div className={``}>
                          {match.matchState === 7 ? (
                            <div className="flex flex-row justify-center items-center w-16 px-2 ">
                              <p
                                className={`font-bold text-lg	leading-none ${localTeamClass}`}
                              >
                                {match.localScore}
                              </p>
                              <p className="mx-2 text-base font-bold leading-none">
                                -
                              </p>
                              <p
                                className={`font-bold text-lg	leading-none ${visitorTeamClass}`}
                              >
                                {match.visitorScore}
                              </p>
                            </div>
                          ) : (
                            <p className=" uppercase font-bold text-center w-full leading-none">
                              {new Date(match.matchDate).toLocaleDateString(
                                "es-EU",
                                {
                                  weekday: "short",
                                }
                              )}
                            </p>
                          )}
                        </div>
                        {match.matchState === 7 ? (
                          <div className="flex flex-row justify-center items-center w-16 px-2 "></div>
                        ) : (
                          <div className={``}>
                            <p className=" uppercase font-medium text-center w-full leading-none">
                              {new Date(match.matchDate).toLocaleDateString(
                                "es-EU",
                                {
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </p>
                          </div>
                        )}

                        <div className={``}>
                          <p
                            className={` text-center leading-none ${
                              match.matchState === 7
                                ? "text-neutral-700 font-bold"
                                : "text-neutral-700 font-bold"
                            }`}
                          >
                            {match.matchState === 7
                              ? "Finalizado"
                              : new Date(match.matchDate).toLocaleTimeString(
                                  "es-EU",
                                  {
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: false,
                                  }
                                )}
                          </p>
                        </div>
                      </div>

                      {/* VISITOR TEAM */}
                      <Link className="" href={`/team/${match.visitorTeamID}`}>
                        <div className="flex flex-col justify-center items-center h-16 w-12 shrink-0 py-2">
                          <Image
                            src={`/teamLogos/${slugById(
                              match.visitorTeamID
                            )}.png`}
                            alt="visitor team"
                            width={48}
                            height={48}
                            style={{
                              objectFit: "contain",
                              width: "auto",
                            }}
                            className="h-8  "
                            priority
                          />
                          {/* <p className="font-bold text-[11px] p-0 m-0 leading-none">
                            {nicknameById(match.visitorTeamID)}
                          </p> */}
                        </div>
                      </Link>
                    </Card>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ChevronsDown, ChevronsUp } from "lucide-react";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import HomeIcon from "@mui/icons-material/Home";
import FlightIcon from "@mui/icons-material/Flight";

import { Match, PlayerWithStats } from "@/types";
import {
  formatMoney,
  formatter,
  getColor,
  getCurrentWeek,
  getNextGames,
  getNextThreeMatches,
  getPositionBadge,
  getWeeksTotalPointsForPlayer,
  getWeeksTotalPointsFromSinglePlayer,
  getWeeksTotalPointsOnePlayer,
  lastChangeStyle,
  slugById,
} from "@/utils/utils";
import Image from "next/image";
import LastMatches from "./LastMatches";

const MyTeams = ({ teams, matches }: { teams: any; matches: Match[] }) => {
  const [selectedTeam, setSelectedTeam] = useState(teams[0] || null);

  // Determine unique weeks for the selected team
  const uniqueWeeks = useMemo(() => {
    const allWeeks = selectedTeam?.players.flatMap((player) =>
      player.stats.map((stat) => stat.week)
    );
    const weeksSet = new Set(allWeeks);
    return Array.from(weeksSet).sort((a, b) => b - a);
  }, [selectedTeam]);

  const handleTeamSelect = (teamId: string) => {
    const team = teams.find((team) => team.myTeamID.toString() === teamId);
    setSelectedTeam(team || null);
  };

  const selectedTeamPlayers = selectedTeam?.players || [];
  const numberOfPlayers = selectedTeamPlayers.length;
  const totalMarketValue = selectedTeamPlayers.reduce(
    (acc, player) => acc + player.marketValue,
    0
  );
  const totalLastChange = selectedTeamPlayers.reduce(
    (acc, player) => acc + player.lastMarketChange,
    0
  );

  return (
    <>
      <div className="flex flex-col justify-start items-center gap-2">
        <div className="flex w-full md:flex-row flex-col justify-between items-center gap-2">
          <Select
            value={selectedTeam ? selectedTeam.name : "Selecciona un equipo"}
            onValueChange={handleTeamSelect}
          >
            <SelectTrigger className="rounded-sm border bg-card text-card-foreground shadow h-full">
              <SelectValue>
                {selectedTeam ? selectedTeam.name : "Selecciona un equipo"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {teams.map((team) => (
                <SelectItem
                  key={team.myTeamID}
                  value={team.myTeamID.toString()}
                >
                  {team.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Card className="transition-all flex flex-row justify-between items-center gap-6 md:gap-8 md:px-6 px-4 py-2 w-full text-xs md:text-sm h-full md:h-10 ">
            <div className="flex flex-col md:flex-row justify-between items-start gap-2 md:gap-6 w-full ">
              <div className="flex flex-row justify-center items-center">
                <p className=" font-normal mr-2">Valor:</p>
                <p className=" font-bold">
                  {formatter.format(totalMarketValue)}
                </p>
              </div>
              <div className="flex flex-row justify-center items-center">
                <p className=" font-normal mr-2">Cambio:</p>

                {totalLastChange > 0 ? (
                  <ChevronsUp className="w-4 h-4 text-green-600" />
                ) : (
                  <ChevronsDown className="w-4 h-4 text-red-500" />
                )}
                <p
                  className={`font-bold text-right tabular-nums text-xs md:text-sm  tracking-tighter  ${lastChangeStyle(
                    totalLastChange
                  )}`}
                >
                  {" "}
                  {formatter.format(totalLastChange)}
                </p>
              </div>
              <div className="flex flex-row justify-center items-center">
                <p className=" font-normal mr-2	">Jugadores:</p>
                <p className=" font-bold">{numberOfPlayers} /26</p>
              </div>
            </div>
          </Card>
        </div>

        {selectedTeam && (
          <Card className="flex flex-col justify-start items-start  w-full  ">
            <Table className="">
              <TableCaption></TableCaption>
              <TableHeader>
                <TableRow>
                  {/* <TableHead className="w-[100px]">ID</TableHead> */}
                  <TableHead className="text-center w-14">Pos</TableHead>
                  <TableHead className=" text-center min-w-[195px]">Jugador</TableHead>
                  <TableHead className=" text-center ">
                    Proximos Partidos
                  </TableHead>

                  <TableHead className="w-full text-right">Cambio</TableHead>
                  <TableHead className="w-full text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="p-0 m-0">
                {selectedTeamPlayers.map((player) => {
                  const nextThreeMatches = getNextGames(matches, player);

                  return (
                    <TableRow key={player.playerID} className="">
                      {/* <TableCell className="">
                    {player.playerID}
                  </TableCell> */}
                      <TableCell className="">
                        <div
                          className={
                            getPositionBadge(player.positionID).className
                          }
                        >
                          {getPositionBadge(player.positionID).abbreviation}
                        </div>
                      </TableCell>
                      <TableCell className=" p-0 m-0 ">
                        <Link
                          className="flex flex-row justify-start items-center gap-2"
                          href={`/player/${player.playerID}`}
                        >
                          <div className="flex justify-center items-center flex-shrink-0 w-6 h-6">
                            <Image
                              src={`/teamLogos/${slugById(player.teamID)}.png`}
                              alt={player.teamName}
                              width={40}
                              height={40}
                              className="w-auto h-5"
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                          <div className="flex justify-center items-center flex-shrink-0 w-10 h-10">
                            <Image
                              src={player.image}
                              alt={player.nickname}
                              width={40}
                              height={40}
                              className="w-10 h-10"
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                          <div className="text-xs md:text-sm font-semibold whitespace-nowrap shrink-0">
                            {player.nickname}
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell className="">
                        <div className="flex justify-center items-center space-x-2">
                          {/* <div className="mx-1 h-5 border-r border-gray-400"></div> */}
                          {nextThreeMatches.map((match, index) => (
                            <div key={index} className="flex items-center">
                              <div className="flex justify-center items-center w-6">
                                <Image
                                  src={`/teamLogos/${slugById(
                                    match.localTeamID === player.teamID
                                      ? match.visitorTeamID
                                      : match.localTeamID
                                  )}.png`}
                                  alt="opponent"
                                  width={24}
                                  height={24}
                                  className="h-6 w-auto"
                                />
                              </div>
                              <div className="flex justify-center items-center ml-1">
                                {match.visitorTeamID !== player.teamID ? (
                                  <HomeIcon
                                    style={{ fontSize: 18 }}
                                    className="text-neutral-500"
                                  />
                                ) : (
                                  <FlightIcon
                                    style={{ fontSize: 18 }}
                                    className="rotate-45 text-neutral-400"
                                  />
                                )}
                              </div>
                              {index < nextThreeMatches.length - 1 && (
                                <div className="mx-1 h-5 border-r border-gray-400"></div>
                              )}
                            </div>
                          ))}
                          {/* <div className="mx-1 h-5 border-r border-gray-400"></div> */}
                        </div>
                      </TableCell>
                      <TableCell
                        className={`font-bold text-right tabular-nums text-xs md:text-sm  tracking-tighter  ${lastChangeStyle(
                          player.lastMarketChange
                        )}`}
                      >
                        {formatter.format(player.lastMarketChange)}
                      </TableCell>
                      <TableCell className="font-semibold text-right tabular-nums text-xs md:text-sm tracking-tighter ">
                        {formatMoney(player.marketValue)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        )}
        <h2 className="text-lg font-semibold text-center my-1">
          Historia de Puntos
        </h2>
        {selectedTeam && (
          <Card className="flex flex-col justify-start items-start  w-full  ">
            <Table className="">
              <TableCaption></TableCaption>
              <TableHeader>
                <TableRow>
                  {/* <TableHead className="w-[100px]">ID</TableHead> */}
                  <TableHead className="text-center w-14">Pos</TableHead>
                  <TableHead className=" text-center min-w-[195px]">Jugador</TableHead>
                  {/* Dynamically add headers for each unique week */}
                  {uniqueWeeks.map((week) => (
                    <TableHead
                      key={week}
                      className="text-center mx-0 px-1 min-w-[30px]"
                    >
                      J{week}
                    </TableHead>
                  ))}

                  
                </TableRow>
              </TableHeader>
              <TableBody className="p-0 m-0">
                {selectedTeamPlayers.map((player) => {
                  const nextThreeMatches = getNextGames(matches, player);

                  return (
                    <TableRow key={player.playerID} className="">
                      {/* <TableCell className="">
                    {player.playerID}
                  </TableCell> */}
                      <TableCell className="">
                        <div
                          className={
                            getPositionBadge(player.positionID).className
                          }
                        >
                          {getPositionBadge(player.positionID).abbreviation}
                        </div>
                      </TableCell>
                      <TableCell className=" p-0 m-0 ">
                        <Link
                          className="flex flex-row justify-start items-center gap-2"
                          href={`/player/${player.playerID}`}
                        >
                          <div className="flex justify-center items-center flex-shrink-0 w-6 h-6">
                            <Image
                              src={`/teamLogos/${slugById(player.teamID)}.png`}
                              alt={player.teamName}
                              width={40}
                              height={40}
                              className="w-auto h-5"
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                          <div className="flex justify-center items-center flex-shrink-0 w-10 h-10">
                            <Image
                              src={player.image}
                              alt={player.nickname}
                              width={40}
                              height={40}
                              className="w-10 h-10"
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                          <div className="text-xs md:text-sm font-semibold whitespace-nowrap shrink-0">
                            {player.nickname}
                          </div>
                        </Link>
                      </TableCell>
                      {uniqueWeeks.map((week) => {
                        const stat = player.stats.find((s) => s.week === week);
                        const match = matches.find(
                          (m) =>
                            m.week === week &&
                            (m.localTeamID === player.teamID ||
                              m.visitorTeamID === player.teamID)
                        );
                        const opponentTeamID = match
                          ? match.localTeamID === player.teamID
                            ? match.visitorTeamID
                            : match.localTeamID
                          : null;

                        return (
                          <TableCell key={week} className="m-auto px-0  ">
                            {stat ? (
                              <div className="flex flex-row justify-center items-center w-full ">
                                {/* <div className="ml-0 mr-0 h-5 border-l border-gray-400"></div> */}
                                <div className="flex flex-col justify-center items-center gap-1">
                                  <div
                                    className={`text-center border-[0.5px] w-6 h-6 border-neutral-500 rounded flex justify-center items-center ${getColor(
                                      stat.totalPoints
                                    )}`}
                                  >
                                    <p className="text-[15px] items-center align-middle">
                                      {stat.totalPoints}
                                    </p>
                                  </div>
                                  {opponentTeamID && (
                                    <Image
                                      src={`/teamLogos/${slugById(
                                        opponentTeamID
                                      )}.png`}
                                      alt="opponent"
                                      width={20}
                                      height={20}
                                      style={{ objectFit: "contain" }}
                                      className="h-4"
                                    />
                                  )}
                                </div>
                              </div>
                            ) : (
                              <span className="flex justify-center items-center">
                                -
                              </span>
                            )}
                          </TableCell>
                        );
                      })}
                      
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        )}
       
      </div>
    </>
  );
};

export default MyTeams;

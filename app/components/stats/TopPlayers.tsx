"use client";
import React, { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ChevronsDown, ChevronsUp } from "lucide-react";
import Link from "next/link";
import LooksOneOutlinedIcon from '@mui/icons-material/LooksOneOutlined';
import LooksTwoOutlinedIcon from '@mui/icons-material/LooksTwoOutlined';
import Looks3OutlinedIcon from '@mui/icons-material/Looks3Outlined';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import HomeIcon from "@mui/icons-material/Home";
import FlightIcon from "@mui/icons-material/Flight";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import {
  formatMoney,
  formatter,
  getColor,
  getNextGames,
  getPositionBadge,
  lastChangeStyle,
  slugById,
} from "@/utils/utils";
import Image from "next/image";

interface PlayerWithStats extends players {
  stats: stats[];
}

const TopPlayers = ({
  players,
  matches,
}: {
  players: any;
  matches: matches[];
}) => {
  const [selectedTeam, setSelectedTeam] = useState(players[0] || null);

  // Determine unique weeks for the selected team
  const uniqueWeeks = useMemo(() => {
    const allWeeks = selectedTeam?.players.flatMap((player: players) =>
      player.stats.map((stat: stats) => stat.week)
    );
    const weeksSet = new Set(allWeeks);
    return Array.from(weeksSet).sort((a, b) => b - a);
  }, [selectedTeam]);

  const handleTeamSelect = (position: string) => {
    const selected = players.find(
      (player: players) => player.position === position
    );
    setSelectedTeam(selected);
  };

  const selectedTeamPlayers = selectedTeam?.players || [];
  // console.log(selectedTeamPlayers);
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
      {/* <pre className="">{JSON.stringify(matches.slice(0, 30), null, 2)}</pre> */}
      {/* <pre className="">{JSON.stringify(selectedTeamPlayers[1].teamID, null, 2)}</pre> */}
      <div className="flex flex-col justify-start items-center gap-2">
        <div className="flex w-full md:flex-row flex-col justify-between items-center gap-2">
          {/* TEAM SELECT */}

          <Select
            value={
              selectedTeam ? selectedTeam.position : "Selecciona una posición"
            }
            onValueChange={handleTeamSelect}
          >
            <SelectTrigger className="rounded-sm border bg-card text-card-foreground shadow h-full md:w-1/4">
              <SelectValue>
                {selectedTeam
                  ? selectedTeam.position
                  : "Selecciona una posición"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {players.map((player) => (
                <SelectItem
                  key={player.position}
                  value={player.position.toString()}
                >
                  {player.position}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* NEXT MATCHES & VALUE TABLE */}
        {selectedTeam && (
          <Card className="flex flex-col justify-start items-start  w-full  ">
            <Table className="">
              <TableCaption></TableCaption>
              <TableHeader>
                <TableRow>
                  {/* <TableHead className="w-[100px]">ID</TableHead> */}
                  <TableHead className="text-center">Rank</TableHead>
                  {/* <TableHead className="w-text-center w-14">Pos</TableHead> */}
                  <TableHead className=" text-center ">Jugador</TableHead>
                  <TableHead className=" text-center ">
                    Proximos Partidos
                  </TableHead>
                  <TableHead className=" text-center">Puntos</TableHead>
                  <TableHead className=" text-center">Local</TableHead>
                  <TableHead className=" text-center">Visitante</TableHead>
                  <TableHead className=" text-right">Cambio</TableHead>
                  <TableHead className=" text-right">Valor</TableHead>
                  <TableHead className=" text-center p-0 m-0 md:hidden min-w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="p-0 m-0">
                {selectedTeamPlayers.map((player, index) => {
                  const nextThreeMatches = getNextGames(matches, player, 4);
                  return (
                    <TableRow key={player.playerID} className="">
                      <TableCell className="text-center">
                        {index === 0 ? (
                          // Gold medal
                          <LooksOneOutlinedIcon
                            className="w-6 h-6"
                            style={{ color: "#FFD700" }}
                          />
                        ) : index === 1 ? (
                          // Silver medal
                          <LooksTwoOutlinedIcon
                            className="w-6 h-6"
                            style={{ color: "#C0C0C0" }}
                          />
                        ) : index === 2 ? (
                          // Bronze medal
                          <Looks3OutlinedIcon
                            className="w-6 h-6"
                            style={{ color: "#CD7F32" }}
                          />
                        ) : (
                          // Rank number for 4th place and beyond
                          index + 1
                        )}
                        
                      </TableCell>
                      {/* <TableCell className="">
                        <div
                          className={
                            getPositionBadge(player.positionID).className
                          }
                        >
                          {getPositionBadge(player.positionID).abbreviation}
                        </div>
                      </TableCell> */}
                      <TableCell className=" p-0 m-0 truncate min-w-[200px]">
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
                          <div className="flex flex-col justify-start items-center flex-shrink-0 h-10 p-0 m-0 overflow-hidden">
                            <Image
                              src={player.image}
                              alt={player.nickname}
                              width={60}
                              height={60}
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                          <div className="text-xs md:text-sm  font-semibold whitespace-nowrap shrink-0">
                            {player.nickname.includes(" ") &&
                            player.nickname.length > 12
                              ? `${player.nickname.split(" ")[0].charAt(0)}. ${
                                  player.nickname.split(" ")[1]
                                }${
                                  player.nickname.split(" ").length > 2
                                    ? ` ${player.nickname.split(" ")[2]}`
                                    : ""
                                }`
                              : player.nickname}
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell className="bg-neutral-100 border-x-2">
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
                      <TableCell className="text-center ">
                        <div className="flex flex-row justify-center items-center gap-0.5">
                          <p className="font-bold text-base ">
                            {player.points}
                          </p>
                          {/* <p className="text-xs">pts</p> */}
                          <div className="mx-2 h-6 border-l border-neutral-300"></div>
                          <div className="flex flex-col justify-center items-center">
                            <p className="font-bold leading-none">
                              {player.averagePoints.toFixed(2)}
                            </p>
                            <p className="text-[11px] leading-none ">Media</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center bg-neutral-100 border-x-2">
                        <div className="flex flex-row justify-center items-center ">
                          <HomeIcon
                            fontSize="small"
                            className="text-neutral-400"
                          />
                          <p className="font-bold ml-1">
                            {player.pointsData.totalLocalPoints}
                          </p>
                          <div className="mx-2 h-6 border-l border-neutral-300"></div>
                          <div className="flex flex-col justify-center items-center">
                            <p className="font-bold leading-none">
                              {player.pointsData.averageLocalPoints.toFixed(2)}
                            </p>
                            <p className="text-[11px] leading-none ">Media</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex flex-row justify-center items-center ">
                          <FlightIcon
                            fontSize="small"
                            className="rotate-45 text-neutral-400"
                          />
                          <p className="font-bold ml-1">
                            {player.pointsData.totalVisitorPoints}
                          </p>
                          <div className="mx-2 h-6 border-l border-neutral-300"></div>
                          <div className="flex flex-col justify-center items-center">
                            <p className="font-bold leading-none">
                              {player.pointsData.averageVisitorPoints.toFixed(
                                2
                              )}
                            </p>
                            <p className="text-[11px] leading-none">Media</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell
                        className={`bg-neutral-100 border-x-2 font-bold text-right tabular-nums text-xs md:text-sm  tracking-tighter  ${lastChangeStyle(
                          player.lastMarketChange
                        )}`}
                      >
                        {formatter.format(player.lastMarketChange)}
                      </TableCell>
                      <TableCell className="font-semibold text-right tabular-nums text-xs md:text-sm tracking-tighter ">
                        {formatMoney(player.marketValue)}
                      </TableCell>
                      <TableCell className="text-center p-0 m-0 md:hidden">
                        <div className="flex flex-col justify-start items-center flex-shrink-0 h-10 p-0 m-0 overflow-hidden">
                          <Image
                            src={player.image}
                            alt={player.nickname}
                            width={60}
                            height={60}
                            style={{ objectFit: "contain" }}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
             
            </Table>
          </Card>
        )}
        <h2 className="text-lg font-semibold text-center my-1">
          Historial de Puntos
        </h2>
        {/* POINT HISTORY TABLE */}
        {selectedTeam && (
          <Card className="flex flex-col justify-start items-start  w-full  ">
            <Table className="">
              <TableCaption></TableCaption>
              <TableHeader>
                <TableRow>
                  {/* <TableHead className="w-[100px]">ID</TableHead> */}
                  <TableHead className="text-center">Rank</TableHead>
                  {/* <TableHead className="w-text-center w-14">Pos</TableHead> */}
                  <TableHead className=" text-center ">Jugador</TableHead>
                      <TableHead className="text-center">Total</TableHead>
                  <TableHead className=" text-center ">
                    <div className="flex flex-row justify-center items-center w-full divide-x-[1px] ">
                      {uniqueWeeks.map((week) => (
                        <div key={week} className="items-center ">
                          <div className="flex flex-col justify-center items-center gap-2">
                            <div
                              className={`text-center  w-7 h-7  flex justify-center items-center }`}
                            >
                              <p className="text-xs items-center align-middle">
                                J{week}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TableHead>
                  {/* <TableHead className=" text-center ">Puntos</TableHead> */}
                  <TableHead className=" text-center p-0 m-0 md:hidden min-w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="p-0 m-0">
                {selectedTeamPlayers.map((player, index) => {
                  return (
                    <TableRow key={player.playerID} className="">
                      {/* <TableCell className="">
                    {player.playerID}
                  </TableCell> */}
                      <TableCell className="text-center">
                        {index === 0 ? (
                          // Gold medal
                          <LooksOneOutlinedIcon
                            className="w-6 h-6"
                            style={{ color: "#FFD700" }}
                          />
                        ) : index === 1 ? (
                          // Silver medal
                          <LooksTwoOutlinedIcon
                            className="w-6 h-6"
                            style={{ color: "#C0C0C0" }}
                          />
                        ) : index === 2 ? (
                          // Bronze medal
                          <Looks3OutlinedIcon
                            className="w-6 h-6"
                            style={{ color: "#CD7F32" }}
                          />
                        ) : (
                          // Rank number for 4th place and beyond
                          index + 1
                        )}
                        
                      </TableCell>
                      {/* <TableCell className="">
                        <div
                          className={
                            getPositionBadge(player.positionID).className
                          }
                        >
                          {getPositionBadge(player.positionID).abbreviation}
                        </div>
                      </TableCell> */}
                      <TableCell className=" p-0 m-0 truncate min-w-[200px]">
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
                          <div className="flex flex-col justify-start items-center flex-shrink-0 h-10 p-0 m-0 overflow-hidden">
                            <Image
                              src={player.image}
                              alt={player.nickname}
                              width={60}
                              height={60}
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                          <div className="text-xs md:text-sm  font-semibold whitespace-nowrap shrink-0">
                            {player.nickname.includes(" ") &&
                            player.nickname.length > 12
                              ? `${player.nickname.split(" ")[0].charAt(0)}. ${
                                  player.nickname.split(" ")[1]
                                }${
                                  player.nickname.split(" ").length > 2
                                    ? ` ${player.nickname.split(" ")[2]}`
                                    : ""
                                }`
                              : player.nickname}
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell className="text-center bg-neutral-100 border-x-2">
                        <div className="flex flex-row justify-center items-center gap-0.5">
                          <p className="font-bold text-base ">
                            {player.points}
                          </p>
                          {/* <p className="text-xs">pts</p> */}
                          <div className="mx-2 h-6 border-l border-neutral-300"></div>
                          <div className="flex flex-col justify-center items-center">
                            <p className="font-bold leading-none">
                              {player.averagePoints.toFixed(2)}
                            </p>
                            <p className="text-[11px] leading-none ">Media</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex flex-row justify-center items-center w-full divide-x-[1px]">
                          {uniqueWeeks.map((week) => {
                            const stat = player.stats.find(
                              (s) => s.week === week
                            );
                            const match = matches.find(
                              (m) =>
                                m.week === week &&
                                (m.localTeamID === player.teamID ||
                                  m.visitorTeamID === player.teamID)
                            );
                            const opponentTeamID =
                              match?.localTeamID === player.teamID
                                ? match.visitorTeamID
                                : match?.localTeamID;

                            return (
                              <div
                                key={week}
                                className="flex flex-col justify-center items-center "
                              >
                                {stat ? (
                                  <div className="flex flex-row justify-center items-center w-full ">
                                    <div className="flex flex-col justify-center items-center gap-1 ">
                                      <div
                                        className={`text-center w-7 h-7 flex justify-center items-center  ${
                                          stat.isInIdealFormation
                                            ? "border-yellow-500  border-[3px]"
                                            : ""
                                        } ${getColor(stat.totalPoints)}`}
                                      >
                                        <p className="text-[14px] items-center align-middle">
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
                                  <>
                                    <div className="flex flex-col justify-center items-center gap-1">
                                      <div
                                        className={`text-center  w-7 h-7 flex justify-center items-center  ${getColor(
                                          0
                                        )}`}
                                      >
                                        <p className="text-[14px] items-center align-middle">
                                          -
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
                                  </>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </TableCell>
                     
                      <TableCell className="text-center p-0 m-0 md:hidden">
                        <div className="flex flex-col justify-start items-center flex-shrink-0 h-10 p-0 m-0 overflow-hidden">
                          <Image
                            src={player.image}
                            alt={player.nickname}
                            width={60}
                            height={60}
                            style={{ objectFit: "contain" }}
                          />
                        </div>
                      </TableCell>
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

export default TopPlayers;

"use client";
import React, { useState } from "react";
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

import { PlayerWithStats } from "@/types";
import {
  formatMoney,
  formatter,
  getColor,
  getCurrentWeek,
  getNextThreeMatches,
  getPositionBadge,
  getWeeksTotalPointsFromSinglePlayer,
  lastChangeStyle,
  slugById,
} from "@/utils/utils";
import Image from "next/image";
import LastMatches from "./LastMatches";

const teams = [
  {
    id: 1,
    name: "KIKI",
    players: [
      1621, 1255, 650, 1090, 1305, 1351, 1495, 1193, 680, 918, 1072, 1088, 1610,
      1682, 1697, 1819, 247, 275, 666, 1798, 1821, 1368,
    ],
  },
  {
    id: 2,
    name: "OTI mi Bizni",
    players: [
      947, 74, 77, 360, 805, 894, 1179, 1201, 1265, 1707, 127, 238, 1302, 1452,
      1619, 1624, 942, 1318, 1701, 1361, 1442, 184,
    ],
  },
];

const MyTeams = ({
  teamPlayers,
  matches,
}: {
  teamPlayers: PlayerWithStats[];
  matches: matches[];
}) => {
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);

  const handleTeamSelect = (teamId) => {
    const team = teams.find((team) => team.id === parseInt(teamId, 10));
    setSelectedTeam(team);
  };

  const selectedTeamPlayers = teamPlayers
    .filter((player) =>
      selectedTeam?.players?.includes(player.playerData.playerID)
    )
    .sort((a, b) => {
      // First, compare by positionId
      if (a.playerData.positionID < b.playerData.positionID) {
        return -1;
      }
      if (a.playerData.positionID > b.playerData.positionID) {
        return 1;
      }

      // If positionId is the same, then compare by playerId
      return a.playerData.playerID - b.playerData.playerID;
    });

  const totalMarketValue = selectedTeamPlayers.reduce(
    (acc, player) => acc + player.playerData.marketValue,
    0
  );
  const numberOfPlayers = selectedTeamPlayers.length;
  const totalLastChange = selectedTeamPlayers.reduce(
    (acc, player) => acc + player.playerData.lastMarketChange,
    0
  );

  return (
    <>
      <div className="flex flex-col justify-start items-center gap-2">
        <div className="flex md:flex-row flex-col justify-between items-center w-full gap-2 ">
          <div className="flex  w-full md:w-64 h-full md:h-10">
            <Select
              value={selectedTeam ? selectedTeam.name : "Selecciona un equipo"}
              onValueChange={(value) => handleTeamSelect(value)}
            >
              <SelectTrigger className="rounded-sm border bg-card text-card-foreground shadow h-full">
                <SelectValue>
                  {selectedTeam ? selectedTeam.name : "Selecciona un equipo"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {teams.map((team) => (
                  <SelectItem key={team.id} value={team.id.toString()}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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
                  <TableHead className="w-40 ">Jugador</TableHead>
                  <TableHead className="w-52 	 text-center ">
                    Proximos Partidos
                  </TableHead>
                  <TableHead className="w-40	 text-center ">
                    Ultimos Partidos
                  </TableHead>
                  <TableHead className=" text-right">Cambio</TableHead>
                  <TableHead className=" text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="p-0 m-0">
                {selectedTeamPlayers.map((player) => {
                  const nextThreeMatches = getNextThreeMatches(matches, player);

                  return (
                    <TableRow key={player.playerData.playerID} className="">
                      {/* <TableCell className="">
                    {player.playerData.playerID}
                  </TableCell> */}
                      <TableCell className="">
                        <div
                          className={
                            getPositionBadge(player.playerData.positionID)
                              .className
                          }
                        >
                          {
                            getPositionBadge(player.playerData.positionID)
                              .abbreviation
                          }
                        </div>
                      </TableCell>
                      <TableCell className=" p-0 m-0 ">
                        <Link
                          className="flex flex-row justify-start items-center gap-2"
                          href={`/player/${player.playerData.playerID}`}
                        >
                          <div
                            style={{
                              minWidth: "40px",
                              minHeight: "40px",
                              flexShrink: 0,
                            }}
                          >
                            <Image
                              src={player.playerData.image}
                              alt={player.playerData.nickname}
                              width={40}
                              height={40}
                              className="w-10 h-10"
                              style={{ objectFit: "fill" }}
                            />
                          </div>
                          <div className="text-xs md:text-sm font-semibold whitespace-nowrap shrink-0">
                            {player.playerData.nickname?.includes(" ") &&
                            player.playerData.nickname.length > 12
                              ? `${player.playerData.nickname
                                  .split(" ")[0]
                                  .charAt(0)}. ${
                                  player.playerData.nickname.split(" ")[1]
                                }${
                                  player.playerData.nickname.split(" ").length >
                                  2
                                    ? ` ${
                                        player.playerData.nickname.split(" ")[2]
                                      }`
                                    : ""
                                }`
                              : player.playerData.nickname}
                          </div>
                        </Link>
                      </TableCell>

                      <TableCell className="">
                        <div className="flex justify-center items-center space-x-2">
                          {nextThreeMatches.map((match, index) => (
                            <div key={index} className="flex items-center">
                              <div className="flex justify-center items-center w-6">
                                <Image
                                  src={`/teamLogos/${slugById(
                                    match.localTeamID ===
                                      player.playerData.teamID
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
                                {match.visitorTeamID !==
                                player.playerData.teamID ? (
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
                        </div>
                      </TableCell>
                      <TableCell className="">
                        <div className="flex flex-row justify-between items-center w-full ">
                          <div className="flex flex-row justify-center items-center  w-full">
                            {player &&
                              getWeeksTotalPointsFromSinglePlayer(
                                player,
                                5
                              ).map((point) => {
                                // Filter matches for those involving the player's team
                                const playerMatches = matches.filter(
                                  (match) =>
                                    match.localTeamID ===
                                      player.playerData.teamID ||
                                    match.visitorTeamID ===
                                      player.playerData.teamID
                                );

                                const match = playerMatches.find(
                                  (match) => match.week === point.week
                                );

                                if (!match) return null; // Skip rendering if no match is found for this week

                                // Determine the opponent's team ID
                                const opponentTeamID =
                                  match.localTeamID === player.playerData.teamID
                                    ? match.visitorTeamID
                                    : match.localTeamID;

                                return (
                                  <div
                                    className="flex flex-col justify-center items-center "
                                    key={point.week}
                                  >
                                    <div className="flex flex-col justify-center items-center gap-0.5">
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

                                      <div
                                        className={`text-center border-[0.5px] w-6 h-6 border-neutral-500 rounded-xs flex justify-center items-center ${getColor(
                                          point.points
                                        )}`}
                                      >
                                        <p className="text-[13px] items-center align-middle">
                                          {point.points}
                                        </p>
                                      </div>
                                      {/* <div className="text-center text-[11px] md:order-first">
                                        J{point.week}
                                      </div> */}
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell
                        className={`font-bold text-right tabular-nums text-xs md:text-sm  tracking-tighter  ${lastChangeStyle(
                          player.playerData.lastMarketChange
                        )}`}
                      >
                        {formatter.format(player.playerData.lastMarketChange)}
                      </TableCell>
                      <TableCell className="font-semibold text-right tabular-nums text-xs md:text-sm tracking-tighter ">
                        {formatMoney(player.playerData.marketValue)}
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

export default MyTeams;

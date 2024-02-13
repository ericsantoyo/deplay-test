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

const MyTeams = ({ teams, matches }: { teams: any; matches: matches[] }) => {
  const [selectedTeam, setSelectedTeam] = useState(teams[0] || null);

  // Determine unique weeks for the selected team
  const uniqueWeeks = useMemo(() => {
    const allWeeks = selectedTeam?.players.flatMap((player: players) =>
      player.stats.map((stat: stats) => stat.week)
    );
    const weeksSet = new Set(allWeeks);
    return Array.from(weeksSet).sort((a, b) => b - a);
  }, [selectedTeam]);

  const handleTeamSelect = (teamId: string) => {
    const team = teams.find((team) => team.myTeamID.toString() === teamId);
    setSelectedTeam(team || null);
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
        <h2 className="text-lg font-semibold text-center my-1">Mis Equipos</h2>
        <div className="flex w-full md:flex-row flex-col justify-between items-center gap-2">
          {/* TEAM SELECT */}

          <Select
            value={selectedTeam ? selectedTeam.name : "Selecciona un equipo"}
            onValueChange={handleTeamSelect}
          >
            <SelectTrigger className="rounded-sm border bg-card text-card-foreground shadow h-full md:w-1/4">
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

          {/* TEAM INFO CARD */}
          <Card className="transition-all flex flex-row justify-between items-center gap-6 md:gap-8 md:px-6 px-4 py-2 md:w-3/4 w-full text-xs md:text-sm h-full md:h-10 ">
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
        {/* NEXT MATCHES & VALUE TABLE */}
        {selectedTeam && (
          <Card className="flex flex-col justify-start items-start  w-full  ">
            <Table className="">
              <TableCaption></TableCaption>
              <TableHeader>
                <TableRow>
                  {/* <TableHead className="w-[100px]">ID</TableHead> */}
                  <TableHead className="w-text-center w-14">Pos</TableHead>
                  <TableHead className=" text-center ">Jugador</TableHead>
                  <TableHead className=" text-center ">
                    Proximos Partidos
                  </TableHead>
                  <TableHead className=" text-center">Puntos</TableHead>
                  <TableHead className=" text-center">Local</TableHead>
                  <TableHead className=" text-center">Visitante</TableHead>
                  <TableHead className=" text-right">Cambio</TableHead>
                  <TableHead className=" text-right">Valor</TableHead>
                  <TableHead className=" text-center p-0 m-0 md:hidden"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="p-0 m-0">
                {selectedTeamPlayers.map((player) => {
                  const nextThreeMatches = getNextGames(matches, player, 4);
                  return (
                    <TableRow key={player.playerID} className="">
                      <TableCell className="">
                        <div
                          className={
                            getPositionBadge(player.positionID).className
                          }
                        >
                          {getPositionBadge(player.positionID).abbreviation}
                        </div>
                      </TableCell>
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
                          <HomeOutlinedIcon fontSize="small" className="" />
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
                          <FlightIcon fontSize="small" className="rotate-45" />
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
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter className="">
                <TableRow className="bg-neutral-100 text-neutral-800">
                  <TableCell className="text-center" colSpan={3}></TableCell>

                  <TableCell className="text-center">
                    <div className="flex justify-center items-center gap-1">
                      {(
                        selectedTeamPlayers.reduce(
                          (acc, player) => acc + player.averagePoints,
                          0
                        ) / selectedTeamPlayers.length
                      ).toFixed(2)}
                      <p className="text-[11px] leading-none">Media</p>
                    </div>
                  </TableCell>

                  <TableCell className="text-center">
                    <div className="flex justify-center items-center gap-1">
                      {(
                        selectedTeamPlayers.reduce(
                          (acc, player) =>
                            acc + player.pointsData.averageLocalPoints,
                          0
                        ) / selectedTeamPlayers.length
                      ).toFixed(2)}
                      <p className="text-[11px] leading-none">Media</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center items-center gap-1">
                      {(
                        selectedTeamPlayers.reduce(
                          (acc, player) =>
                            acc + player.pointsData.averageVisitorPoints,
                          0
                        ) / selectedTeamPlayers.length
                      ).toFixed(2)}
                      <p className="text-[11px] leading-none">Media</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right ">
                    <div
                      className={`font-bold text-center tabular-nums text-xs md:text-sm  tracking-tighter  ${lastChangeStyle(
                        selectedTeamPlayers.reduce(
                          (acc, player) => acc + player.lastMarketChange,
                          0
                        )
                      )}`}
                    >
                      {formatter.format(
                        selectedTeamPlayers.reduce(
                          (acc, player) => acc + player.lastMarketChange,
                          0
                        )
                      )}
                    </div>
                  </TableCell>
                  <TableCell className=" font-bold text-right tabular-nums text-xs md:text-sm">
                    {formatMoney(
                      selectedTeamPlayers.reduce(
                        (acc, player) => acc + player.marketValue,
                        0
                      )
                    )}
                  </TableCell>
                  <TableCell className="text-center p-0 m-0 md:hidden"></TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </Card>
        )}
        <h2 className="text-lg font-semibold text-center my-1">
          Historia de Puntos
        </h2>
        {/* POINT HISTORY TABLE */}
        {selectedTeam && (
          <Card className="flex flex-col justify-start items-start  w-full  ">
            <Table className="">
              <TableCaption></TableCaption>
              <TableHeader>
                <TableRow>
                  {/* <TableHead className="w-[100px]">ID</TableHead> */}
                  <TableHead className="w-text-center w-14">Pos</TableHead>
                  <TableHead className=" text-center ">Jugador</TableHead>
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
                                    className={`text-center border-[0.5px] w-6 h-6 border-neutral-700 flex justify-center items-center ${getColor(
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

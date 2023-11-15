import { Card } from "@/components/ui/card";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import Link from "next/link";
import {
  getColor,
  formatDate,
  formatMoney,
  getWeeksTotalPointsFromStats,
  formatter,
  getTotalPointsOfTeam,
  getTotalMarketValueOfTeam,
  getNumberOfPlayersOfTeam,
  getNumberOfAvailablePlayersOfTeam,
} from "@/utils/utils";
import { getMatchesByTeamID } from "@/database/client";
import NextMatches from "./NextMatches";

interface PlayerStats {
  statType: string;
  value: number;
}

interface PlayerWithStats {
  playerData: {
    playerID: string;
    name: string;
    position: string;
  };
  stats: PlayerStats[];
}

interface TeamInfoCardProps {
  teamInfo;
  playerInfo;
}

export default async function TeamInfoCard({ teamInfo, playerInfo }) {
  const { data: matchesData } = await getMatchesByTeamID(teamInfo.teamID);

  const teamMatches = matchesData;

  const totalPoints = getTotalPointsOfTeam(playerInfo);
  const totalMarketValue = getTotalMarketValueOfTeam(playerInfo);
  const numberOfPlayers = getNumberOfPlayersOfTeam(playerInfo);
  const numberOfAvailablePlayers =
    getNumberOfAvailablePlayersOfTeam(playerInfo);

  return (
    <>
      <Card className="transition-all flex flex-row justify-between items-center gap-6 md:gap-8 md:px-6 px-4 py-4 text-xs md:text-sm rounded-sm">
        <NextMatches matches={teamMatches} selectedTeam={teamInfo.teamID} />
        {/* <pre className="text-center">{JSON.stringify(teamMatches, null, 2)}</pre> */}
        <div className="order-first md:order-none flex flex-col justify-betweem items-center flex-initial  md:flex-none w-[120px]">
          <Image
            src={teamInfo.image}
            alt={teamInfo.shortName}
            width={96}
            height={96}
            style={{
              objectFit: "contain",
              width: "auto",
            }}
            className="h-20 p-[6px]"
            priority
          />

          <div className="">
            {/* <p>Team name</p> */}
            <p className="font-bold mx-auto	uppercase text-center  ">{teamInfo.name}</p>
          </div>
        </div>
        <div className="hidden md:flex flex-col justify-between items-start gap-2 ">
          <div className="flex flex-row justify-center items-center">
            <p className=" font-normal mr-2">Puntos:</p>
            <p className=" font-bold">{totalPoints}</p>
          </div>
          <div className="flex flex-row justify-center items-center">
            <p className=" font-normal mr-2">Valor:</p>
            <p className=" font-bold">{formatter.format(totalMarketValue)}</p>
          </div>
          <div className="flex flex-row justify-center items-center">
            <p className=" font-normal mr-2	">Disponibles:</p>
            <p className=" font-bold">
              {numberOfAvailablePlayers} /{numberOfPlayers}
            </p>
          </div>
        </div>
      </Card>
    </>
  );
}

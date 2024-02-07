import { getPlayerById, getMatchesByTeamID } from "@/database/client";
import { Player } from "@/types";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import ValueChart from "@/app/components/player/ValueChart";
import { notFound } from "next/navigation";
import {
  getColor,
  getWeeksTotalPointsFromSinglePlayer,
  getWeeksTotalPointsFromStats,
  nicknameById,
  slugById,
} from "@/utils/utils";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MatchesStats from "@/app/components/player/MatchesStats";
import AllValueTable from "@/app/components/player/AllValueTable";
import PlayerStats from "@/app/components/player/PlayerStats";
import { Separator } from "@/components/ui/separator";
import HomeIcon from "@mui/icons-material/Home";
import FlightIcon from "@mui/icons-material/Flight";
import NextMatches from "@/app/components/NextMatches";

import PreviousMatches from "@/app/components/PreviousMatches";
import FantasyStat from "@/app/components/player/FantasyStat";

type Props = {
  playerData: Player;
};

export const revalidate = 0;

export default async function Player({
  params,
}: {
  params: { playerID: number };
}) {
  const { player: playerData, stats: playerStat } = await getPlayerById(
    params.playerID
  );
  if (!playerData) {
    return notFound();
  }
  const { teamMatches: matchesData } = await getMatchesByTeamID(
    playerData.teamID
  );

  function formatPlayerWithStats(playerData: players, playerStat: stats[]) {
    // Filter the stats for the given player
    const playerStats = playerStat.filter(
      (stat) => stat.playerID === playerData.playerID
    );

    // Return the formatted player data with their stats
    return { playerData, stats: playerStats };
  }
  const playerWithStats = formatPlayerWithStats(playerData, playerStat);



  let totalLocalPoints = 0;
  let totalVisitorPoints = 0;
  let localGames = 0;
  let visitorGames = 0;

  playerStat.forEach((stat) => {
    const match = matchesData.find((m) => m.week === stat.week);
    if (match) {
      if (match.localTeamID === playerWithStats.playerData.teamID) {
        localGames++;
        totalLocalPoints += stat.totalPoints;
      } else if (match.visitorTeamID === playerWithStats.playerData.teamID) {
        visitorGames++;
        totalVisitorPoints += stat.totalPoints;
      }
    }
  });

  const averageLocalPoints = localGames > 0 ? totalLocalPoints / localGames : 0;
  const averageVisitorPoints =
    visitorGames > 0 ? totalVisitorPoints / visitorGames : 0;

  return (
    <div className="w-full">
      <Card className="flex flex-row justify-between items-center w-full py-4 px-2 md:p-[18px] gap-x-3  ">
        {/* POINTS INFO */}
        <div className="flex flex-col justify-between items-center  w-1/3">
          <div className="flex flex-row justify-center items-center  w-full">
            <div className="text-lg font-bold uppercase text-center w-min whitespace-nowrap	 ">
              {nicknameById(playerData.teamID)}
            </div>
            <div className="mx-2 h-4 border-l border-neutral-300"></div>
            <Image
              src={`/teamLogos/${slugById(playerData.teamID)}.png`}
              alt={playerData.teamName}
              width={28}
              height={28}
              className="h-6 w-auto"
            />
          </div>
          <div className="my-2 w-24 border-b border-neutral-300"></div>

          <div className="flex flex-col justify-between items-center ">
            <div className="flex flex-col justify-center items-center">
              <div className="flex justify-center items-center gap-2">
                <div className="flex flex-col justify-center items-center">
                  <p className="text-xs uppercase font-medium">Puntos</p>
                  <div className="flex justify-center items-center ">
                    <p className="text-xl md:text-2xl font-bold">
                      {playerData.points}
                    </p>
                    <div className="mx-2 h-6 border-l border-neutral-300"></div>
                    <div className="flex flex-col justify-center items-center">
                      <p className="text-md font-bold">
                        {playerData.averagePoints.toFixed(2)}
                      </p>
                      <p className="text-xs font-medium">Media</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <Separator className="w-28 my-1" /> */}
            <div className="my-1 w-24 border-b border-neutral-300"></div>
            <div className="flex flex-row justify-center items-center">
              <div className="flex flex-col justify-center items-center ">
                <HomeIcon fontSize="small" />
                <p className="text-lg font-bold">{totalLocalPoints}</p>
                <Separator className="w-full my-1" />
                <p className="text-xs font-medium">Media</p>
                <p className="text-md font-bold">
                  {averageLocalPoints.toFixed(2)}
                </p>
              </div>
              {/* <Separator orientation="vertical" className="mx-2 " /> */}
              <div className="mx-2 h-24 border-l border-neutral-300"></div>
              <div className="flex flex-col justify-center items-center">
                <FlightIcon fontSize="small" className="rotate-45" />
                <p className="text-lg font-bold">{totalVisitorPoints}</p>
                <Separator className="w-full my-1" />
                <p className="text-xs font-medium">Media</p>
                <p className="text-md font-bold">
                  {averageVisitorPoints.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* IMAGE & NAME */}
        <div className="flex flex-col justify-center items-center w-1/3">
          <div className="h-48">
            <Image
              src={playerData.image}
              alt={playerData.nickname}
              width={192}
              height={192}
              className="h-48 object-cover object-top rounded-full border-2 border-white drop-shadow-md		 	"
            />
          </div>

          <div className="p-2">
            <h3 className="font-bold text-lg md:text-xl mx-auto text-center whitespace-nowrap">
              {playerData.nickname}
            </h3>
          </div>
        </div>
        
        {/* MATCHES INFO */}
        <div className="flex flex-col md:flex-row justify-center items-stretch w-1/3">
          {/* LAST MATCHES */}
          <div className="flex flex-col justify-start items-center h-full">
            <p className="text-xs uppercase font-bold pb-1 text-center">
              Últimos partidos
            </p>
            <PreviousMatches
              matchesData={matchesData}
              playerWithStats={playerWithStats}
              fetchedPlayer={playerData}
            />
          </div>

          <div className="my-2 md:mx-2 w-24 md:w-0 md:h-20 md:border-l border-b border-neutral-300"></div>
          {/* NEXT MATCHES */}
          <div className="flex flex-col justify-start items-center h-full">
            <p className="text-xs uppercase font-bold pb-1 text-center">
              Próximos partidos
            </p>
            <div className="flex-grow flex flex-col justify-center items-center ">
              <NextMatches
                matches={matchesData}
                selectedTeam={playerData.teamID}
                dateClass="hidden"
                howMany={2}
                pClass="hidden"
              />
            </div>
          </div>
        </div>
      </Card>
      <Tabs defaultValue="puntos" className="grow w-full mx-auto">
        <TabsList className="flex flex-row justify-center items-center mt-2">
          <TabsTrigger className="w-full" value="puntos">
            Puntos
          </TabsTrigger>
          <TabsTrigger className="w-full" value="valor">
            Valor
          </TabsTrigger>
          <TabsTrigger className="w-full" value="stats">
            Stats
          </TabsTrigger>
          <TabsTrigger className="w-full" value="noticias">
            Noticias
          </TabsTrigger>
        </TabsList>

        <TabsContent value="puntos" className="overflow-visible mx-auto">
          <MatchesStats matchesData={matchesData} playerStat={playerStat} playerData={playerData} />
        </TabsContent>
        <TabsContent value="valor" className="overflow-visible mx-auto ">
          {/* GRAPH */}
          <Card className="flex flex-col justify-center items-center py-2">
            <div className="flex w-full h-full justify-start items-center">
              <ValueChart fetchedPlayer={playerData} />
            </div>
            <Separator className="w-full mb-2" />
            <AllValueTable playerData={playerData} playerStat={playerStat} />
          </Card>
        </TabsContent>
        <TabsContent value="stats" className="overflow-visible mx-auto">
          {/* STATS */}
          <FantasyStat
            matchesData={matchesData}
            playerStat={playerStat}
            playerWithStats={playerWithStats}
          />
          
        </TabsContent>
        <TabsContent value="noticias" className="overflow-visible mx-auto">
         
        </TabsContent>
      </Tabs>

    </div>
  );
}

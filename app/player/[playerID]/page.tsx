import { getPlayerById, getMatchesByTeamID } from "@/database/client";
import { Player } from "@/types";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import ValueChart from "@/app/components/player/ValueChart";
import { notFound } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MatchesStats from "@/app/components/player/MatchesStats";
import AllValueTable from "@/app/components/player/AllValueTable";
import PlayerStats from "@/app/components/player/PlayerStats";

type Props = {
  playerData: Player;
};

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

  // <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full"></div>

  return (
    <div className="">
      <Card className="flex flex-col justify-center items-center bg-white shadow-md rounded-lg overflow-hidden">
        {/* IMAGE & NAME */}
        <Image
          src={playerData.image}
          alt={playerData.nickname}
          width={192}
          height={192}
          style={{ objectFit: "contain" }}
          className="h-48"
        />
        <div className="p-4">
          <h3 className="font-bold text-xl mx-auto">{playerData.nickname}</h3>
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
          <MatchesStats matchesData={matchesData} playerStat={playerStat} />
        </TabsContent>
        <TabsContent value="valor" className="overflow-visible mx-auto ">
          {/* GRAPH */}
          <Card className="flex flex-col justify-center items-center py-2">
            <div className="flex w-full h-full justify-start items-center">
              <ValueChart fetchedPlayer={playerData} />
            </div>

            <AllValueTable playerData={playerData} playerStat={playerStat} />
          </Card>
        </TabsContent>
        <TabsContent value="stats" className="overflow-visible mx-auto">
          {/* STATS */}
          <PlayerStats matchesData={matchesData} playerStat={playerStat} playerWithStats={playerWithStats} />
        </TabsContent>
        <TabsContent
          value="noticias"
          className="overflow-visible mx-auto"
        ></TabsContent>
      </Tabs>

      {/* <pre>{JSON.stringify(playerStat, null, 2)}</pre> */}
    </div>
  );
}

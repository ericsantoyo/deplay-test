import {
  getAllPlayers,
  getAllMatches,
  getAllStats,
  getTeamByTeamID,
  getPlayersByTeamID,
} from "@/database/client";

import TeamInfoCard from "@/app/components/team/TeamInfoCard";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { notFound } from "next/navigation";
import TeamLineup from "@/app/components/team/Lineup";
import TeamRoster from "@/app/components/team/TeamRoster";

export const revalidate = 0;

export default async function Team({ params }: { params: { teamID: number } }) {
  const { data: teamData } = await getTeamByTeamID(params.teamID);
  if (!teamData) {
    return notFound();
  }
  const team = teamData[0];
  const { data: playersData } = await getPlayersByTeamID(params.teamID);
  const players = playersData;
  const { allMatches: matchesData } = await getAllMatches();
  const matches = matchesData;
  const { allStats: fetchedStats } = await getAllStats();
  // const stats = fetchedStats;

  function formatPlayersWithStats(players: any, stats: any) {
    const formattedPlayers = [];

    for (const player of players) {
      const playerStats = stats.filter(
        (stat: { playerID: any }) => stat.playerID === player.playerID
      );
      formattedPlayers.push({ playerData: player, stats: playerStats });
    }

    return formattedPlayers;
  }

  const playersWithStats = formatPlayersWithStats(playersData, fetchedStats);

  const getSortedPlayersByPoints = () => {
    if (!players) {
      // Handle the case where players is null
      return [];
    }

    // If players is not null, make a copy of the array and sort it
    let sorted = [...players];
    sorted.sort((a, b) => b.points - a.points);
    return sorted;
  };

  const sortedPlayers = getSortedPlayersByPoints();

  return (
    <div className=" flex flex-col gap-3 w-full">
      <TeamInfoCard teamInfo={team} playerInfo={players} />
      <div className="flex w-full">
        <Tabs defaultValue="alineacion" className="grow w-full mx-auto">
          <TabsList className="flex flex-row justify-center items-center ">
            <TabsTrigger className="w-full" value="alineacion">
              Alineacion
            </TabsTrigger>
            <TabsTrigger className="w-full" value="plantilla">
              Plantilla
            </TabsTrigger>
          </TabsList>
          <TabsContent value="alineacion" className="overflow-visible mx-auto">
            <TeamLineup
              teamselected={team.teamID}
              teamPlayers={sortedPlayers}
            />
          </TabsContent>
          <TabsContent value="plantilla" className="overflow-visible mx-auto">
            <TeamRoster
              teamPlayers={sortedPlayers}
              playerStats={playersWithStats}
            />
          </TabsContent>
        </Tabs>
      </div>
      {/* <div className="hidden  md:flex md:flex-row md:justify-between md:gap-4 md:container mx-auto	 ">
        <TeamLineup teamselected={team.teamID} teamPlayers={sortedPlayers} />
        <TeamRoster
          teamPlayers={sortedPlayers}
          playerStats={playersWithStats}
        />
      </div> */}
    </div>
  );
}

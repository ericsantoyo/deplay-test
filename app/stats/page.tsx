import {
  getAllMatches,
  getMyTeams,
  fetchStatsForMyTeamsPlayers,
  fetchMyTeamPlayers,
  getFinishedMatches,
  getTopPlayersByPosition,
} from "@/database/client";
import TopPlayers from "../components/stats/TopPlayers";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const revalidate = 0;

interface PlayerWithStatsAndPoints extends players {
  pointsData: {
    totalLocalPoints: number;
    totalVisitorPoints: number;
    averageLocalPoints: number;
    averageVisitorPoints: number;
  };
}

// positionIDs and their names
const positions = [
  { id: 1, name: "Portero" },
  { id: 2, name: "Defensa" },
  { id: 3, name: "Centrocampista" },
  { id: 4, name: "Delantero" },
  { id: 5, name: "Entrenador" },
];

function formatAndSortPlayerData(
  players: players[],
  stats: stats[],
  matches: matches[],
  positions: { id: number; name: string }[]
) {
  // Initialize a map to hold player stats, keyed by playerID
  const playerStatsMap = new Map<number, stats[]>();
  stats.forEach((stat) => {
    if (!playerStatsMap.has(stat.playerID)) {
      playerStatsMap.set(stat.playerID, []);
    }
    playerStatsMap.get(stat.playerID)?.push(stat);
  });

  // Process each player to attach stats and calculate points
  const playersWithStatsAndPoints = players.map((player) => {
    const playerStats = playerStatsMap.get(player.playerID) || [];
    const pointsData = {
      totalLocalPoints: 0,
      totalVisitorPoints: 0,
      localGames: 0,
      visitorGames: 0,
      averageLocalPoints: 0,
      averageVisitorPoints: 0,
    };

    // Get all matches for the player's team
    const teamMatches = matches.filter(
      (m) =>
        m.localTeamID === player.teamID || m.visitorTeamID === player.teamID
    );

    // For each match, check if the player has stats and update pointsData accordingly
    teamMatches.forEach((match) => {
      const stat = playerStats.find((s) => s.week === match.week);
      if (stat) {
        if (match.localTeamID === player.teamID) {
          pointsData.localGames++;
          pointsData.totalLocalPoints += stat.totalPoints;
        } else {
          pointsData.visitorGames++;
          pointsData.totalVisitorPoints += stat.totalPoints;
        }
      }
    });

    pointsData.averageLocalPoints =
      pointsData.localGames > 0
        ? pointsData.totalLocalPoints / pointsData.localGames
        : 0;
    pointsData.averageVisitorPoints =
      pointsData.visitorGames > 0
        ? pointsData.totalVisitorPoints / pointsData.visitorGames
        : 0;

    return {
      ...player,
      stats: playerStatsMap.get(player.playerID) || [],
      pointsData,
    };
  });

  // Group players by their positions
  const playersGroupedByPosition = positions.map((position) => ({
    position: position.name,
    players: playersWithStatsAndPoints.filter(
      (player) => player.positionID === position.id
    ),
  }));

  return playersGroupedByPosition;
}

export default async function StatsPage() {
  // fetch top players
  const { topPlayers: topPlayers } = await getTopPlayersByPosition();

  // extract playerIDs from topPlayers
  const playerIDs = topPlayers.map((player) => player.playerID);

  // Fetch stats only for these player IDs
  const stats = await fetchStatsForMyTeamsPlayers(playerIDs);

  // fetch all matches
  const { allMatches: matchesData } = await getAllMatches();

  // Fetch finished matches
  const { finishedMatches: finishedMatches } = await getFinishedMatches();

  // fetch all matches
  // const { allMatches: matchesData } = await getAllMatches();

  const playersWithFormattedAndCalculatedData = formatAndSortPlayerData(
    topPlayers,
    stats,
    finishedMatches,
    positions
  );

  return (
    <>
      {/* <h2 className="text-lg font-semibold text-center mb-2 ">
        Top 20 por Posición
      </h2> */}
      {/* <pre>{JSON.stringify(playerIDs, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(playersWithFormattedAndCalculatedData[0], null, 2)}</pre> */}
      <div className="flex w-full">
        <Tabs defaultValue="top20" className="grow w-full mx-auto">
          <TabsList className="flex flex-row justify-center items-center ">
            <TabsTrigger className="w-full" value="top20">
              Top 20
            </TabsTrigger>
            <TabsTrigger className="w-full" value="plantilla">
              Plantilla
            </TabsTrigger>
            <TabsTrigger className="w-full" value="partidos">
              Partidos
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top20" className="overflow-visible mx-auto">
            <TopPlayers
              players={playersWithFormattedAndCalculatedData}
              matches={matchesData}
            />
          </TabsContent>
          <TabsContent value="plantilla" className="overflow-visible mx-auto">
            {/* <TeamRoster
              teamPlayers={sortedPlayers}
              playerStats={playersWithStats}
            /> */}
          </TabsContent>
          <TabsContent value="partidos" className="overflow-visible mx-auto">
            {/* <TeamMatchList matchesData={matchesData} teamselected={team.teamID} /> */}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

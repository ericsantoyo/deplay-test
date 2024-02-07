import {
  getAllMatches,
  getAllPlayers,
  getAllStats,
  getMyTeams,
  getMatchesByTeamID,
  fetchStatsForMyTeamsPlayers,
} from "@/database/client";

import MyTeamLineup from "@/app/components/myTeam/MyTeamLineup";
import MyTeams from "../components/myTeam/MyTeams";
import { Player, PlayerStats } from "@/types";
import { supabase } from "@/database/supabase";

export const revalidate = 0;

const formatAndSortPlayerData = (
  players: Player[],
  stats: PlayerStats[],
  teams: myteams[]
) => {
  // First, aggregate stats for each player
  const playerStatsMap = new Map<number, PlayerStats[]>();

  stats.forEach((stat) => {
    if (!playerStatsMap.has(stat.playerID)) {
      playerStatsMap.set(stat.playerID, []);
    }
    playerStatsMap.get(stat.playerID)?.push(stat);
  });

  // Then, attach the aggregated stats to each player
  const playersWithStats = players.map((player) => ({
    ...player,
    stats: playerStatsMap.get(player.playerID) || [],
  }));

  // Attach players with their stats to their respective teams
  const teamsWithPlayers = teams.map((team) => ({
    ...team,
    players: team.players.players
      .map(
        (playerID) =>
          playersWithStats.find((player) => player.playerID === playerID) ||
          null
      )
      .filter((player) => player !== null),
  }));

  // Optionally sort players within each team by positionID and then by playerID
  teamsWithPlayers.forEach((team) => {
    team.players.sort((a, b) => {
      if (a.positionID < b.positionID) return -1;
      if (a.positionID > b.positionID) return 1;
      return a.playerID - b.playerID;
    });
  });

  return teamsWithPlayers;
};

export default async function MyTeam() {
  const { allPlayers: players } = await getAllPlayers();
  const { allMatches: matches } = await getAllMatches();
  const { myTeams } = await getMyTeams();

  // Extract player IDs from myTeams
  const playerIds = myTeams.flatMap(team => team.players.players);
  // Fetch stats only for these player IDs
  const stats = await fetchStatsForMyTeamsPlayers(playerIds);

  
  // Assume formatAndSortPlayerData or similar logic is used here
  const teamsWithFormattedData = formatAndSortPlayerData(players, stats, myTeams);
  return (
    <>
      <h2 className="text-lg font-semibold text-center mb-2 ">MyTeams</h2>
      {/* <pre>{JSON.stringify(stats.slice(0, 30), null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(stats, null, 2)}</pre> */}
      {/* <MyTeamLineup teamPlayers={playersWithStats} /> */}
      <MyTeams teams={teamsWithFormattedData} matches={matches} />
    </>
  );
}


import {
  getAllMatches,
  getAllPlayers,
  getAllStats,
  getMyTeams,
  getMatchesByTeamID,
} from "@/database/client";

import MyTeamLineup from "@/app/components/myTeam/MyTeamLineup";
import MyTeams from "../components/myTeam/MyTeams";
import { Player, PlayerStats } from "@/types";

export const revalidate = 0;


const formatAndSortPlayerData = (players: Player[], stats: PlayerStats[], teams: myteams[]) => {
  const playersWithStats = players.map((player) => {
    const playerStats = stats.find((stat) => stat.playerID === player.playerID);
    return {
      ...player,
      stats: playerStats,
    };
  });

  const teamsWithPlayers = teams.map((team) => {
    const teamPlayers = playersWithStats.filter((player) => team.players.players.includes(player.playerID));
    return {
      ...team,
      players: teamPlayers,
    };
  });

  //sort players by position and then by playerID for each team
  teamsWithPlayers.forEach((team) => {
    team.players.sort((a, b) => {
      if (a.positionID < b.positionID) {
        return -1;
      }
      if (a.positionID > b.positionID) {
        return 1;
      }
      if (a.playerID < b.playerID) {
        return -1;
      }
      if (a.playerID > b.playerID) {
        return 1;
      }
      return 0;
    });
  });

  return teamsWithPlayers;
}





export default async function MyTeam() {
  const { allPlayers: players } = await getAllPlayers();
  const { allStats: stats } = await getAllStats();
  const { allMatches: matches } = await getAllMatches();
  const { myTeams } = await getMyTeams();

  const teamsWithFormattedData = formatAndSortPlayerData(players, stats, myTeams);

  
  
  return (
    <>
      <h2 className="text-xl font-bold text-center mb-2">MyTEAMS</h2>
      {/* <MyTeamLineup teamPlayers={playersWithStats} /> */}
      <MyTeams teams={teamsWithFormattedData} matches={matches} />
      {/* <pre>{JSON.stringify(teamsWithFormattedData, null, 2)}</pre> */}
    </>
  );
}

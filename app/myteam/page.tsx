
import {
  getAllMatches,
  getAllPlayers,
  getAllStats,
  getMatchesByTeamID,
} from "@/database/client";

import MyTeamLineup from "@/app/components/myTeam/MyTeamLineup";
import MyTeams from "../components/myTeam/MyTeams";

export const revalidate = 0;





function formatPlayersWithStats(players: players[], stats: stats[]) {
  const formattedPlayers = [];

  for (const player of players) {
    const playerStats = stats.filter(
      (stat) => stat.playerID === player.playerID
    );
    formattedPlayers.push({ playerData: player, stats: playerStats });
  }

  return formattedPlayers;
}



export default async function MyTeam() {
  const { allPlayers: players } = await getAllPlayers();
  const { allStats: stats } = await getAllStats();
  const { allMatches: matches } = await getAllMatches();


  const playersWithStats = formatPlayersWithStats(players, stats);
  
  return (
    <>
      <h2 className="text-xl font-bold text-center mb-2">MyTEAMS</h2>
      {/* <MyTeamLineup teamPlayers={playersWithStats} /> */}
      <MyTeams teamPlayers={playersWithStats} matches={matches} />
     {/* <pre>{JSON.stringify(playersWithStats[0], null, 2)}</pre> */}

    </>
  );
}

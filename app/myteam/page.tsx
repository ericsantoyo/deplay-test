
import {
  getAllPlayers,
  getAllStats,
  getMatchesByTeamID,
} from "@/database/client";

import MyTeamLineup from "@/app/components/myTeam/MyTeamLineup";

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


  const playersWithStats = formatPlayersWithStats(players, stats);
  

  // const { data: playersWithStats, error } = useSWR(
  //   ["getAllPlayers", "getAllStats"],
  //   async () => {
  //     const { allPlayers: players } = (await getAllPlayers()) as {
  //       allPlayers: players[];
  //     };
  //     const { allStats: stats } = (await getAllStats()) as {
  //       allStats: stats[];
  //     };

  //     return formatPlayersWithStats(players, stats);
  //   }
  // );

  // const { data: matches } = useSWR(["getMatchesByTeamID", "1"], async () => {
  //   const { teamMatches } = (await getMatchesByTeamID(1)) as {
  //     teamMatches: matches[];
  //   };

  //   return teamMatches;
  // });



  return (
    <>
      <h2 className="text-xl font-bold text-center mb-2">MyTEAM page</h2>
      <MyTeamLineup teamPlayers={playersWithStats} />

     

    </>
  );
}

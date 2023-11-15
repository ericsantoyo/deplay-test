import {
  getAllPlayers,
  getAllMatches,
  getAllStats,
  getTeamByTeamID,
  getPlayersByTeamID,
  getAllTeams
} from "@/database/client";




export default async function MyTeam() {

  const { allMatches: matchesData } = await getAllMatches();
  const { allTeams: teams } = await getAllTeams();



  return (
    <div className=" flex flex-col gap-3">
      {/* <pre className="text-center">{JSON.stringify(teams, null, 2)}</pre> */}
      {/* <Calendar matches = {matchesData} allTeams= {teams}/> */}
    </div>
  );
}

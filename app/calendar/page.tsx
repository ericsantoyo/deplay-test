import {
  getAllPlayers,
  getAllMatches,
  getAllStats,
  getTeamByTeamID,
  getPlayersByTeamID,
  getAllTeams,
} from "@/database/client";
import CalendarList from "../components/calendar/Calendar";


export default async function Calendar() {
  const { allMatches: matchesData } = await getAllMatches();
  const { allTeams: teams } = await getAllTeams();

  return (
    <div className=" flex flex-col gap-3">
      {/* <pre className="text-center">{JSON.stringify(teams, null, 2)}</pre> */}
      <CalendarList matches={matchesData} allTeams={teams} gamesToShow={6} />
    </div>
  );
}

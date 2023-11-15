import Link from "next/link";

import { Match } from "@/types";
import HomeIcon from "@mui/icons-material/Home";
import FlightIcon from "@mui/icons-material/Flight";
import { Card } from "@/components/ui/card";
import { slugById } from "@/utils/utils";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export interface CalendarProps {
  matches: Match[];
  allTeams: any[];
}

const getCurrentWeek = (matches: any[]): number => {
  const now = new Date();

  // Filter matches with matchState = 7 (finished) and sort them by matchDate in descending order
  const finishedMatches = matches
    .filter((match) => match.matchState === 7)
    .sort(
      (a, b) =>
        new Date(b.matchDate).getTime() - new Date(a.matchDate).getTime()
    );

  if (finishedMatches.length === 0) {
    // No finished matches, return the week of the next upcoming match
    const upcomingMatches = matches
      .filter((match) => match.matchState !== 7)
      .sort(
        (a, b) =>
          new Date(a.matchDate).getTime() - new Date(b.matchDate).getTime()
      );

    if (
      upcomingMatches.length > 0 &&
      now.getTime() <=
        new Date(upcomingMatches[0].matchDate).getTime() + 24 * 60 * 60 * 1000
    ) {
      // If today is within 1 day of the next upcoming match, return its week
      return upcomingMatches[0].week;
    }
  } else {
    // Return the week of the most recent finished match if it's within 1 day
    if (
      now.getTime() <=
      new Date(finishedMatches[0].matchDate).getTime() + 24 * 60 * 60 * 1000
    ) {
      return finishedMatches[0].week;
    } else {
      // Return the week of the next upcoming match
      const upcomingMatches = matches
        .filter((match) => match.matchState !== 7)
        .sort(
          (a, b) =>
            new Date(a.matchDate).getTime() - new Date(b.matchDate).getTime()
        );

      if (
        upcomingMatches.length > 0 &&
        now.getTime() <=
          new Date(upcomingMatches[0].matchDate).getTime() + 24 * 60 * 60 * 1000
      ) {
        // If today is within 1 day of the next upcoming match, return its week
        return upcomingMatches[0].week;
      }
    }
  }

  // Default to 1 if no matches are found
  return 1;
};

export default function Calendar({ matches, allTeams }: CalendarProps) {
  const currentWeek = getCurrentWeek(matches);

  return (
    <>
      <p className="text-center text-xl uppercase font-semibold mb-2">
        CALENDARIO
      </p>
      <div className="flex flex-col justify-start items-start">
        {/* Map through allTeams and display a row for each team */}
        {allTeams.map((team) => (
          <div
            key={team.teamID}
            className="flex flex-col justify-center items-center"
          >
             <Separator className="w-full my-2" />
            <div className="flex flex-row justify-end items-center md:gap-4 gap-3">
              {/* Add a column to display the team's information */}
              <div className="flex flex-col justify-center items-center w-10 h-10 border shadow-md rounded ">
                <Image
                  src={`/teamLogos/${slugById(team.teamID)}.png`}
                  alt={team.name}
                  width={48}
                  height={48}
                  style={{ objectFit: "contain" }}
                  className="h-7 "
                />
                {/* <p className="text-sm text-center font-semibold">{team.nickname}</p> */}
              </div>
              {/* Display matches for the selected team from current week to week 38 */}

              {matches
                .filter(
                  (match) =>
                    match.week >= currentWeek &&
                    match.week <= currentWeek + 4 &&
                    (match.localTeamID === team.teamID ||
                      match.visitorTeamID === team.teamID)
                )
                .sort((a, b) => new Date(a.matchDate) - new Date(b.matchDate))
                .map((match) => (
                  <div key={match.matchID}>
                    <Card className="flex flex-col justify-between items-center border-none shadow-none text-xs text-center rounded-md w-12 h-full">
                      {team.teamID !== match.localTeamID && (
                        <Image
                          src={`/teamLogos/${slugById(match.localTeamID)}.png`}
                          alt="home"
                          width={36}
                          height={36}
                          style={{ objectFit: "contain" }}
                          className="h-6 "
                        />
                      )}

                      {team.teamID !== match.visitorTeamID && (
                        <Image
                          src={`/teamLogos/${slugById(
                            match.visitorTeamID
                          )}.png`}
                          alt="visitor"
                          width={36}
                          height={36}
                          style={{ objectFit: "contain" }}
                          className="h-6 "
                        />
                      )}

                      {/* <p className="text-[10px] uppercase font-medium text-center">
                        {new Date(match.matchDate).toLocaleDateString("es-EU", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p> */}
                      <div className="leading-none">
                        {team.teamID !== match.localTeamID ? (
                          <FlightIcon fontSize="small" className="rotate-45 " />
                        ) : (
                          <HomeIcon fontSize="small" />
                        )}
                      </div>
                    </Card>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

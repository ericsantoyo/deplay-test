import { Matches, Player } from "@/types";

export const teams = [
  { name: "Deportivo Alavés", slug: "d-alaves", id: 21 },
  { name: "UD Almería", slug: "ud-almeria", id: 1 },
  { name: "Athletic Club", slug: "athletic-club", id: 3 },
  { name: "Atlético de Madrid", slug: "atletico-de-madrid", id: 2 },
  { name: "FC Barcelona", slug: "fc-barcelona", id: 4 },
  { name: "Real Betis", slug: "real-betis", id: 5 },
  { name: "Cádiz CF", slug: "cadiz-cf", id: 162 },
  { name: "RC Celta", slug: "rc-celta", id: 6 },
  { name: "Getafe CF", slug: "getafe-cf", id: 9 },
  { name: "Girona FC", slug: "girona-fc", id: 28 },
  { name: "Granada CF", slug: "granada-cf", id: 10 },
  { name: "UD Las Palmas", slug: "ud-las-palmas", id: 31 },
  { name: "RCD Mallorca", slug: "rcd-mallorca", id: 33 },
  { name: "C.A. Osasuna", slug: "c-a-osasuna", id: 13 },
  { name: "Rayo Vallecano", slug: "rayo-vallecano", id: 14 },
  { name: "Real Madrid", slug: "real-madrid", id: 15 },
  { name: "Real Sociedad", slug: "real-sociedad", id: 16 },
  { name: "Sevilla FC", slug: "sevilla-fc", id: 17 },
  { name: "Valencia CF", slug: "valencia-cf", id: 18 },
  { name: "Villarreal CF", slug: "villarreal-cf", id: 20 },
];

export function slugById(teamID: number) {
  const team = teams.find((team) => team.id === teamID);
  const slug = team ? team.slug : "Not Found";
  return slug;
}

export function slugByName({ name }: { name: string }) {
  const team = teams.find(
    (team) => team.name.replace(/\s/g, "") === name.replace(/\s/g, "")
  );
  const slug = team ? team.slug : "Not Found";

  return slug;
}

export const getColor = (points: number) => {
  if (points >= 10) return "bg-green-600 text-neutral-50 font-bold text-shadow";
  if (points >= 5) return "bg-green-500 text-neutral-50 font-bold text-shadow";
  if (points >= 2) return "bg-orange-500 text-neutral-50 font-bold text-shadow";
  if (points >= 0) return "bg-red-500 text-neutral-50 font-bold text-shadow";
  return "bg-red-700 text-neutral-50 font-bold text-shadow";
};

export function formatDate(dateString: string | number | Date) {
  const date = new Date(dateString);
  const options = { month: "short", day: "numeric" } as const;
  return date.toLocaleDateString(undefined, options);
}

export function formatMoney(value: number) {
  const formatter = new Intl.NumberFormat("en-GB", {});
  const formattedValue = formatter.format(value);
  return formattedValue;
}

export function getWeeksTotalPointsFromStats(
  playerId: number,
  rowData: any[],
  maxWeeks: number
) {
  const selectedPlayerData = rowData.find(
    (player) => player.playerData.playerID === playerId
  );
  const player = selectedPlayerData.playerData;
  const stats = selectedPlayerData.stats;

  let points = [];

  // Create a map to store points by week
  const pointsByWeek = new Map();

  // Calculate points for each week from the player's stats
  for (const stat of stats) {
    const week = stat.week;
    const totalPoints = stat.totalPoints;

    // Update the points for the corresponding week
    pointsByWeek.set(week, totalPoints);
  }

  // Determine the maximum week
  let maxWeek = Math.max(...stats.map((stat: { week: number }) => stat.week));

  // Get the last N weeks (or fewer if less than N weeks of data)
  for (let i = maxWeek; i > maxWeek - maxWeeks && i >= 1; i--) {
    points.push({
      week: i,
      points: pointsByWeek.get(i) || 0, // Use 0 if there are no stats for the week
    });
  }

  // Sort points by week in ascending order
  points.sort((a, b) => a.week - b.week);

  return points;
}

export const formatter = new Intl.NumberFormat("en-GB", {});

export const lastChangeStyle = (lastChange: number) => {
  if (lastChange >= 0) return " text-green-600 dark:text-green-400";
  return "text-red-500";
};

// TEAM PAGE UTILS

export const getTotalPointsOfTeam = (players: {
  [x: string]: {
    status: string;
    points: number;
  };
}) => {
  let total = 0;
  for (let player in players) {
    if (players[player].status === "out_of_league") {
      continue;
    }
    total += players[player].points;
  }
  return total;
};

export const getTotalMarketValueOfTeam = (players: {
  [x: string]: {
    status: string;
    marketValue: number;
  };
}) => {
  let total = 0;
  for (let player in players) {
    if (players[player].status === "out_of_league") {
      continue;
    }
    total += players[player].marketValue;
  }
  return total;
};

export const getNumberOfPlayersOfTeam = (players: {
  [x: string]: { status: string };
}) => {
  let total = 0;
  for (let player in players) {
    if (players[player].status !== "out_of_league") {
      total++;
    }
  }
  return total;
};

export const getNumberOfAvailablePlayersOfTeam = (players: {
  [x: string]: { status: string };
}) => {
  let total = 0;
  for (let player in players) {
    if (players[player].status === "ok") {
      total++;
    }
  }
  return total;
};

interface PositionBadge {
  abbreviation: string;
  className: string;
}

export function getPositionBadge(positionID: number): PositionBadge {
  switch (positionID) {
    case 1:
      return {
        abbreviation: "POR",
        className:
          "shadow-sm shadow-neutral-400 dark:shadow-neutral-800 w-9 text-center text-[12px] leading-5 font-semibold rounded bg-gradient-to-r from-[#d85912] to-[#ff7e00] dark:bg-orange-600 text-gray-50",
      };
    case 2:
      return {
        abbreviation: "DEF",
        className:
          "shadow-sm shadow-neutral-400 dark:shadow-neutral-800 w-9 text-center text-[12px] leading-5 font-semibold rounded bg-gradient-to-r from-[#8023a7] to-[#ce32dc] dark:bg-purple-600 text-gray-50",
      };
    case 3:
      return {
        abbreviation: "CEN",
        className:
          "shadow-sm shadow-neutral-400 dark:shadow-neutral-800 w-9 text-center text-[12px] leading-5 font-semibold rounded bg-gradient-to-tr from-[#0094ff] to-[#4bafe3] dark:bg-blue-600 text-gray-50",
      };
    case 4:
      return {
        abbreviation: "DEL",
        className:
          "shadow-sm shadow-neutral-400 border-gray-600 dark:shadow-neutral-800 w-9 text-center text-[12px] leading-5 font-semibold rounded bg-gradient-to-tr from-[#ee9015] to-[#f3c832] dark:bg-red-600 text-gray-50",
      };
    case 5:
      return {
        abbreviation: "ENT",
        className:
          "shadow-sm shadow-neutral-400 dark:shadow-neutral-800 w-9 text-center text-[12px] leading-5 font-semibold rounded bg-gradient-to-br from-[#02da67] to-[#449fcf] dark:bg-green-600 text-gray-50",
      };
    default:
      return {
        abbreviation: "",
        className: "", // Default case
      };
  }
}

export async function getTeamLogo(teamID: number) {
  const slug = slugById(teamID);
  return `/teamLogos/${slug}.png`;
}

export async function getWeeksTotalPointsFromStatsWithTeamLogo(
  playerId: number,
  rowData: any[],
  maxWeeks: number,
  teamMatches: any
) {
  const selectedPlayerData = rowData.find(
    (player) => player.playerData.playerID === playerId
  );
  const player = selectedPlayerData.playerData;
  const stats = selectedPlayerData.stats;

  let points = [];

  // Calculate points for each week from the player's stats
  const pointsByWeek = new Map();
  for (const stat of stats) {
    const week = stat.week;
    const totalPoints = stat.totalPoints;
    pointsByWeek.set(week, totalPoints);
  }

  let maxWeek = Math.max(...stats.map((stat: { week: number }) => stat.week));

  // Get the last N weeks (or fewer if less than N weeks of data)
  for (let i = maxWeek; i > maxWeek - maxWeeks && i >= 1; i--) {
    const teamLogoURL = await getTeamLogo(player.teamID);
    points.push({
      week: i,
      points: pointsByWeek.get(i) || 0,
      teamLogoURL: teamLogoURL || null,
    });
  }

  points.sort((a, b) => a.week - b.week);

  return points;
}

export const getCurrentWeek = (matches: matches[]): number => {
  const now = new Date();

  // Filter upcoming matches (matchState is not 7) and sort them by matchDate in ascending order
  const upcomingMatches = matches
    .filter((match) => match.matchState !== 7)
    .sort(
      (a, b) =>
        new Date(a.matchDate).getTime() - new Date(b.matchDate).getTime()
    );

  // Find the first upcoming match where the match date is after the current date and time
  const nextMatch = upcomingMatches.find(
    (match) => new Date(match.matchDate) > now
  );

  // If there's an upcoming match, return its week, otherwise default to 1
  return nextMatch ? nextMatch.week : 1;
};

export const getUpcomingTeamMatches = (
  teamMatches: matches[],
  gamesToShow: number
): matches[] => {
  const now = new Date();

  // Filter out matches for the team that have not finished and sort them by matchDate
  const upcomingMatches = teamMatches
    .filter(
      (match) => match.matchState !== 7 && new Date(match.matchDate) > now
    )
    .sort(
      (a, b) =>
        new Date(a.matchDate).getTime() - new Date(b.matchDate).getTime()
    )
    .slice(0, gamesToShow); // Limit the number of upcoming matches returned

  return upcomingMatches;
};

// utils.ts
export const getUpcomingMatches = (
  allMatches: matches[],
  gamesToShow: number
): matches[] => {
  const now = new Date();

  // Filter out matches that have not finished and sort them by matchDate
  const upcomingMatches = allMatches
    .filter(
      (match) => match.matchState !== 7 && new Date(match.matchDate) > now
    )
    .sort(
      (a, b) =>
        new Date(a.matchDate).getTime() - new Date(b.matchDate).getTime()
    )
    .slice(0, gamesToShow); // Limit the number of upcoming matches returned

  return upcomingMatches;
};

export const getNextThreeMatches = (matches: Matches[], selectedPlayer: players): matches[] => {
  const currentWeek = getCurrentWeek(matches);
  return matches
    .filter(match => 
      match.week >= currentWeek && match.week < currentWeek + 3 && 
      (match.localTeamID === selectedPlayer.playerData.teamID || 
       match.visitorTeamID === selectedPlayer.playerData.teamID)
    )
    .sort((a, b) => 
      new Date(a.matchDate).getTime() - new Date(b.matchDate).getTime()
    );
};
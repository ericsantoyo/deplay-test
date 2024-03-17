import { createClient } from "@supabase/supabase-js";

// Initialize the Supabase client directly here
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase environment variables are not set");
  process.exit(1); // Exit the process if the environment variables are not set
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function addPlayers(players) {
  const { error } = await supabase.from("players").upsert(players);

  if (error) throw error;
}

async function addStats(stats) {
  const { error } = await supabase.from("stats").upsert(stats);

  if (error) throw error;
}

function filterDuplicateWeekStats(stats) {
  // Create an object to store the first occurrence of each player ID and week combination
  const firstStats = {};

  // Iterate through the stats array
  for (let i = 0; i < stats.length; i++) {
    const stat = stats[i];
    const playerID = stat.playerID;
    const week = stat.week;
    const key = playerID + "-" + week;

    // Check if this combination of player ID and week has already been encountered
    if (!firstStats[key]) {
      // If not encountered, store it as the first occurrence
      firstStats[key] = stat;
    }
  }

  // Convert the values of the firstStats object back into an array
  const filteredStats = Object.values(firstStats);

  return filteredStats;
}

function formatPlayerStats(statData, playerId, positionID) {
  const stats = [];

  // Determine if the stats are for a coach based on positionID
  const isCoach = positionID === 5;

  for (let i = 0; i < statData.length; i++) {
    const weekID = statData[i].weekNumber;
    const totalPoints = statData[i].totalPoints;
    const isInIdealFormation = statData[i].isInIdealFormation;

    let statObject = {
      playerID: playerId,
      week: weekID,
      totalPoints: totalPoints,
      isInIdealFormation: isInIdealFormation,
    };

    if (!isCoach) {
      statObject = {
        ...statObject,
        mins_played: statData[i].stats.mins_played,
        goals: statData[i].stats.goals,
        goal_assist: statData[i].stats.goal_assist,
        offtarget_att_assist: statData[i].stats.offtarget_att_assist,
        pen_area_entries: statData[i].stats.pen_area_entries,
        penalty_won: statData[i].stats.penalty_won,
        penalty_save: statData[i].stats.penalty_save,
        saves: statData[i].stats.saves,
        effective_clearance: statData[i].stats.effective_clearance,
        penalty_failed: statData[i].stats.penalty_failed,
        own_goals: statData[i].stats.own_goals,
        goals_conceded: statData[i].stats.goals_conceded,
        yellow_card: statData[i].stats.yellow_card,
        second_yellow_card: statData[i].stats.second_yellow_card,
        red_card: statData[i].stats.red_card,
        total_scoring_att: statData[i].stats.total_scoring_att,
        won_contest: statData[i].stats.won_contest,
        ball_recovery: statData[i].stats.ball_recovery,
        poss_lost_all: statData[i].stats.poss_lost_all,
        penalty_conceded: statData[i].stats.penalty_conceded,
        marca_points: statData[i].stats.marca_points,
      };
    } else {
      statObject = {
        ...statObject,
        won_match: won_match,
        lost_match: lost_match,
        drawn_match: drawn_match,
        marca_points: statData[i].stats.marca_points,
      };
    }

    stats.push(statObject);
  }

  return filterDuplicateWeekStats(stats);
}

function capitalizeWords(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Normalize and remove diacritics
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function splitPlayersData(data) {
  let players = [];
  let allStatistics = [];

  for (let i = 0; i < data.length; i++) {
    let playerData = data[i];

    // Skip if player data is null or undefined
    if (!playerData) continue;

    let playerID = parseInt(playerData.id);
    let averagePoints = playerData.averagePoints;
    let marketValue = playerData.marketValue;
    let name = playerData.name;
    let nickname = playerData.nickname;
    if (typeof nickname === "string") {
      nickname = capitalizeWords(nickname);
    }
    let position = playerData.position;
    let positionID = playerData.positionId;
    let status = playerData.playerStatus;
    let teamID = playerData.team?.id ? parseInt(playerData.team.id) : null;
    let teamName = playerData.team?.name ? playerData.team.name : null;
    let image = "/playerImages/" + playerID + ".png";
    let points = playerData.points;
    let marketValues = playerData.marketValues || [];

    if (status === "out_of_league") {
      continue;
    }

    // Normalize and capitalize each word in the nickname
    if (typeof nickname === "string") {
      nickname = capitalizeWords(nickname);
    }

    // Calculate lastMarketChange
    // Handle null or empty marketValues array
    const lastMarketValueIndex =
      marketValues?.length > 0 ? marketValues.length - 1 : -1;
    const lastMarketValue =
      lastMarketValueIndex >= 0
        ? marketValues[lastMarketValueIndex]?.marketValue || 0
        : 0;
    const secondToLastMarketValueIndex =
      lastMarketValueIndex > 0 ? lastMarketValueIndex - 1 : -1;
    const secondToLastMarketValue =
      secondToLastMarketValueIndex >= 0
        ? marketValues[secondToLastMarketValueIndex]?.marketValue || 0
        : 0;
    const lastMarketChange = lastMarketValue - secondToLastMarketValue;

    const player = {
      playerID: playerID,
      name: name,
      nickname: nickname,
      status: status,
      position: position,
      positionID: positionID,
      marketValue: marketValue,
      averagePoints: averagePoints,
      points: points,
      teamID: teamID,
      teamName: teamName,
      image: image,
      marketValues: marketValues,
      lastMarketChange: lastMarketChange, // Add the calculated value here
      previousMarketValue: secondToLastMarketValue,
    };

    const stats = playerData.playerStats
      ? formatPlayerStats(playerData.playerStats, playerID, positionID)
      : [];
    players.push(player);
    allStatistics.push(...stats);
  }

  return {
    players: players,
    stats: allStatistics,
  };
}

async function fetchData(playerId) {
  const baseUrl = "https://api-fantasy.llt-services.com";
  const endpoint = `/api/v3/player/${playerId}?x-lang=en`;
  try {
    const response = await fetch(`${baseUrl}${endpoint}`);
    if (response.status === 404 || !response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

async function fetchMarketValues(playerId) {
  const baseUrl = "https://api-fantasy.llt-services.com";
  const endpoint = `/api/v3/player/${playerId}/market-value?x-lang=en`;
  try {
    const response = await fetch(`${baseUrl}${endpoint}`);
    if (!response.ok) {
      // Handle non-200 responses, including 404
      return []; // Return an empty array to indicate no data for this player
    }
    const marketValues = await response.json();
    return marketValues || [];
  } catch (error) {
    console.error("Fetch market values error:", error);
    return []; // Return an empty array in case of network or other errors
  }
}

async function main() {
  const startingIndex = 0;
  const endingIndex = 1950;
  let players = [];
  const promises = [];

  for (let playerId = startingIndex; playerId <= endingIndex; playerId++) {
    promises.push(fetchData(playerId));

    if (promises.length >= 75) {
      // MAX_CONCURRENT_REQUESTS
      const playerDataArray = await Promise.all(promises);
      promises.length = 0; // Reset the promises array

      const marketValuePromises = playerDataArray.map((data) => {
        if (data) {
          return fetchMarketValues(data.id);
        }
        return null;
      });

      const marketValuesArray = await Promise.all(marketValuePromises);

      for (let i = 0; i < playerDataArray.length; i++) {
        const data = playerDataArray[i];
        if (data) {
          const marketValues = marketValuesArray[i];
          data.marketValues = marketValues;
          players.push(data);
        }
      }
    }
  }

  // Process any remaining promises
  if (promises.length > 0) {
    const playerDataArray = await Promise.all(promises);
    const marketValuePromises = playerDataArray.map((data) =>
      data ? fetchMarketValues(data.id) : null
    );
    const marketValuesArray = await Promise.all(marketValuePromises);

    for (let i = 0; i < playerDataArray.length; i++) {
      const data = playerDataArray[i];
      if (data) {
        const marketValues = marketValuesArray[i];
        data.marketValues = marketValues;
        players.push(data);
      }
    }
  }

  try {
    const { players: playersData, stats: statsData } =
      splitPlayersData(players);
    await addPlayers(playersData);
    await addStats(statsData);
    console.log("Update successful");
    process.exit(0); // Exit with a success status code
  } catch (error) {
    console.error("Error updating Supabase:", error);
    process.exit(1); // Exit with an error status code
  }
}

// Execute the main function when the script is run
main();

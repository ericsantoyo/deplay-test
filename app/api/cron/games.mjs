import { createClient } from "@supabase/supabase-js";

// Initialize the Supabase client directly here
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase environment variables are not set");
  process.exit(1); // Exit the process if the environment variables are not set
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function addMatches(matches) {
  const { error } = await supabase.from("matches").upsert(matches);

  if (error) throw error;
}

function formatMatches(matches, week) {
  const formattedMatches = [];

  matches.forEach((match) => {
    formattedMatches.push({
      matchID: match.id,
      matchDate: match.matchDate,
      matchState: match.matchState,
      localScore: match.localScore,
      visitorScore: match.visitorScore,
      localTeamID: match.local.id,
      visitorTeamID: match.visitor.id,
      week: week,
    });
  });

  return formattedMatches;
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

async function fetchData(weekID) {
  const baseUrl = "https://api-fantasy.llt-services.com/stats";
  const endpoint = `/v1/stats/week/${weekID}?x-lang=en`;
  try {
    const response = await fetch(`${baseUrl}${endpoint}`);
    //up to here updated
    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return null;
  }
}

async function fetchMarketValues(playerId) {
  const baseUrl = "https://api-fantasy.llt-services.com";
  const endpoint = `/api/v3/player/${playerId}/market-value?x-lang=en`;
  try {
    const response = await fetch(`${baseUrl}${endpoint}`);
    if (response.status === 404 || !response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch market values error:", error);
    return null;
  }
}

async function main() {
  const startingIndex = 0;
  const endingIndex = 1850;
  let players = [];
  const promises = [];

  for (let playerId = startingIndex; playerId <= endingIndex; playerId++) {
    promises.push(fetchData(playerId));

    if (promises.length >= 70) {
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

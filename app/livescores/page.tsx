import { getLiveMatches } from "@/api";

export default async function LiveScores() {
  const matchData = await getLiveMatches();
  const { name, starting_at, scores, events, lineups } = matchData.data;

  // Assuming the first team in the lineups is the home team
  const homeTeamId = lineups?.[0]?.team_id;
  const awayTeamId = lineups?.[1]?.team_id;

  const homeScore = scores.find(score => score.score.participant === "home")?.score.goals || 0;
  const awayScore = scores.find(score => score.score.participant === "away")?.score.goals || 0;

  // Sort events by minute and extra_minute
  const sortedEvents = events.sort((a, b) => {
    const minuteA = a.minute + (a.extra_minute || 0);
    const minuteB = b.minute + (b.extra_minute || 0);
    return minuteA - minuteB;
  });

  // Process events
  const eventItems = sortedEvents.map(event => {
    let eventDescription;
    let eventClass = "";
    let alignClass = event.participant_id === homeTeamId ? "text-left" : "text-right";

    switch (event.type_id) {
      case 14: // Goal
          eventDescription = `⚽ Goal - ${event.player_name}`;
          eventClass = "text-green-500";
          break;
      case 15: // Own Goal
          eventDescription = `🔄 Own Goal - ${event.player_name}`;
          eventClass = "text-orange-500";
          break;
      case 16: // Penalty
          eventDescription = `🎯 Penalty - ${event.player_name}`;
          eventClass = "text-pink-500";
          break;
      case 17: // Missed Penalty
          eventDescription = `❌ Missed Penalty - ${event.player_name}`;
          eventClass = "text-gray-500";
          break;
      case 18: // Substitution
          eventDescription = `🔄 Substitution - ${event.related_player_name} for ${event.player_name}`;
          eventClass = "text-purple-500";
          break;
      case 19: // Yellow Card
          eventDescription = `🟨 Yellow Card - ${event.player_name}`;
          eventClass = "text-yellow-500";
          break;
      case 20: // Red Card
          eventDescription = `🟥 Red Card - ${event.player_name}`;
          eventClass = "text-red-500";
          break;
      case 21: // Yellow/Red Card
          eventDescription = `🟨🟥 Yellow/Red Card - ${event.player_name}`;
          eventClass = "text-orange-600";
          break;
      default:
          eventDescription = "";
  }
  
  

  return (
    <li key={event.id} className={`flex ${alignClass} items-center ${eventClass}`}>
      <span>
        {event.minute}' - {eventDescription}
      </span>
    </li>
  );
});

  return (
    
      <div className="bg-white shadow-lg rounded-lg p-4 max-w-2xl mx-auto w-full">
        <h2 className="text-xl font-bold text-center">{name}</h2>
        <p className="text-gray-600 text-center">
          {new Date(starting_at).toLocaleString()}
        </p>
        <div className="flex justify-center items-center my-4">
          <div className="text-3xl font-bold mr-2">{homeScore}</div>
          <div className="text-xl font-semibold text-gray-500">vs</div>
          <div className="text-3xl font-bold ml-2">{awayScore}</div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Match Events:</h3>
          <ul className="list-none p-0 m-0">{eventItems}</ul>
        </div>
      </div>
      
  
  );
}

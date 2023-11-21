import Image from "next/image";

interface Props {
  teamselected: string;
  teamPlayers: players[] | null;
}

const TeamLineup: React.FC<Props> = ({ teamselected, teamPlayers }) => {
  const teamData = teamPlayers;

  const goalkeepers = teamPlayers
    ?.filter((p) => p.positionID === 1)
    .sort((a, b) => b.points - a.points)
    .slice(0, 1);
  const defenders = teamPlayers
    ?.filter((p) => p.positionID === 2)
    .sort((a, b) => b.points - a.points)
    .slice(0, 4);
  const midfielders = teamPlayers
    ?.filter((p) => p.positionID === 3)
    .sort((a, b) => b.points - a.points)
    .slice(0, 3);
  const forwards = teamPlayers
    ?.filter((p) => p.positionID === 4)
    .sort((a, b) => b.points - a.points)
    .slice(0, 3);

  const positions = {
    goalkeepers: [{ top: "90%", left: "50%" }],
    defenders: [
      { top: "68%", left: "15%" },
      { top: "72%", left: "38%" },
      { top: "72%", left: "62%" },
      { top: "68%", left: "85%" },
    ],
    midfielders: [
      { top: "45%", left: "25%" },
      { top: "52%", left: "50%" },
      { top: "45%", left: "75%" },
    ],
    forwards: [
      { top: "25%", left: "20%" },
      { top: "15%", left: "50%" },
      { top: "25%", left: "80%" },
    ],
  };

  const renderPlayers = (players, positionType) => {
    return players.map((player, index) => (
      <div
        key={player.playerID}
        className="player flex flex-col justify-center items-center"
        style={{
          position: "absolute",
          top: positions[positionType][index].top,
          left: positions[positionType][index].left,
          transform: "translate(-50%, -50%)",
        }}
      >
        <Image
          src={player.image}
          alt={player.name}
          width={64}
          height={64}
          className="w-16"
        />
        <span className="font-semibold text-center">
          {player.nickname.split(" ").slice(-1).join(" ")}
        </span>
      </div>
    ));
  };

  const aspectRatio = (686 / 400) * 100; // This should be height / width
  // <div className="lineup-container relative" style={{ width: '400px', height: '686px' }}>
  //style={{ position: 'relative', width: '400px', height: '686px' }}
  return (
    <div className="relative w-full">
      {/* Aspect ratio box to maintain the ratio */}
      <div className="aspect-ratio-box" style={{ paddingTop: `${aspectRatio}%` }}>
        {/* Actual image container */}
        <div className="absolute top-0 left-0 right-0 bottom-0">
          <Image src="/field.png" alt="Soccer Field" layout="fill" objectFit="contain" />
        </div>
      </div>
      {goalkeepers && renderPlayers(goalkeepers, "goalkeepers")}
      {defenders && renderPlayers(defenders, "defenders")}
      {midfielders && renderPlayers(midfielders, "midfielders")}
      {forwards && renderPlayers(forwards, "forwards")}
    </div>
  );
};

export default TeamLineup;

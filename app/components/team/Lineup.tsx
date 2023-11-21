import { Card } from "@/components/ui/card";
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
    goalkeepers: [{ top: "89%", left: "50%" }],
    defenders: [
      { top: "65%", left: "15%" },
      { top: "72%", left: "38%" },
      { top: "72%", left: "62%" },
      { top: "65%", left: "85%" },
    ],
    midfielders: [
      { top: "43%", left: "23%" },
      { top: "52%", left: "50%" },
      { top: "43%", left: "78%" },
    ],
    forwards: [
      { top: "22%", left: "20%" },
      { top: "14%", left: "50%" },
      { top: "22%", left: "80%" },
    ],
  };

  const renderPlayers = (players, positionType) => {
    return players.map((player, index) => (
      <div
        key={player.playerID}
        className="player flex flex-col items-center justify-center"
        style={{
          position: "absolute",
          top: positions[positionType][index].top,
          left: positions[positionType][index].left,
          transform: "translate(-50%, -50%)",
          width: "84px", // larger width
          height: "84px", // larger height to allow zooming
        }}
      >
        <div
          className="image-container"
          style={{ position: "relative", width: "100%", height: "100%" }}
        >
          <Image
            src={player.image}
            alt={player.name}
            layout="fill"
            objectFit="cover"
            objectPosition="center top"
          />
        </div>

        <Card
          className="font-semibold text-center min-w-[72px] px-2 border-none rounded-sm text-base drop-shadow-xl shadow-neutral-700 
 text-neutral-800  backdrop-blur bg-white/30  "
        >
          {player.nickname.split(" ").slice(-1).join(" ")}
        </Card>
      </div>
    ));
  };

  const aspectRatio = (900 / 600) * 100; // This should be height / width
  // <div className="lineup-container relative" style={{ width: '400px', height: '686px' }}>
  //style={{ position: 'relative', width: '400px', height: '686px' }}
  return (
    <div className="relative w-full">
      {/* Aspect ratio box to maintain the ratio */}
      <div
        className="aspect-ratio-box"
        style={{ paddingTop: `${aspectRatio}%` }}
      >
        {/* Actual image container */}
        <div
          className="absolute top-0 left-0 right-0 bottom-0 contrast-50

	"
        >
          <Image
            src="/FieldLineup.png"
            alt="Soccer Field"
            layout="fill"
            objectFit="contain"
            className="	"
          />
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

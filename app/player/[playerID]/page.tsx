import { getPlayerById, getMatchesByTeamID } from "@/database/client";
import { Player } from "@/types";


import Image from "next/image";
import { Card } from "@/components/ui/card";
import ValueChart from "@/app/components/player/ValueChart";
import { notFound } from "next/navigation";

const formatter = new Intl.NumberFormat("en-GB", {});

type Props = {
  playerData: Player; 
};

export default async function Player({ params }: { params: { playerID: number } }) {
  const { player: playerData, stats: playerStat } = await getPlayerById(
    params.playerID
  );
  if (!playerData) {
    return notFound()
  }
  const { data: matchesData } = await getMatchesByTeamID(
    playerData.teamID
  );

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <Card className="flex flex-col justify-center items-center">
        <Image
          src={playerData.image}
          alt={playerData.nickname}
          width={192}
          height={192}
          style={{ objectFit: "contain" }}
          className="h-48"
        />

        <h3 className="font-bold text-xl mx-auto	 ">{playerData.nickname}</h3>
      </Card>
      <Card className="flex flex-col justify-center items-center p-2">
        <ValueChart fetchedPlayer={playerData} />
      </Card>
    </div>
  );
}

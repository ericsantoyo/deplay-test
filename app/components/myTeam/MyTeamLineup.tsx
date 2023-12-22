"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlayerWithStats } from "@/types";

const formationPositions = {
  "5-4-1": {
    goalkeepers: [{ top: "92%", left: "50%" }],
    defenders: [
      { top: "57%", left: "15%" },
      { top: "70%", left: "28%" },
      { top: "75%", left: "50%" },
      { top: "70%", left: "72%" },
      { top: "57%", left: "85%" },
    ],
    midfielders: [
      { top: "55%", left: "50%" },
      { top: "40%", left: "28%" },
      { top: "32%", left: "50%" },
      { top: "40%", left: "72%" },
    ],
    forwards: [{ top: "15%", left: "50%" }],
  },
  "5-3-2": {
    goalkeepers: [{ top: "92%", left: "50%" }],
    defenders: [
      { top: "57%", left: "15%" },
      { top: "70%", left: "28%" },
      { top: "75%", left: "50%" },
      { top: "70%", left: "72%" },
      { top: "57%", left: "85%" },
    ],
    midfielders: [
      { top: "35%", left: "25%" },
      { top: "55%", left: "50%" },
      { top: "35%", left: "75%" },
    ],
    forwards: [
      { top: "15%", left: "35%" },
      { top: "15%", left: "65%" },
    ],
  },
  "5-2-3": {
    goalkeepers: [{ top: "92%", left: "50%" }],
    defenders: [
      { top: "57%", left: "15%" },
      { top: "70%", left: "28%" },
      { top: "75%", left: "50%" },
      { top: "70%", left: "72%" },
      { top: "57%", left: "85%" },
    ],
    midfielders: [
      { top: "43%", left: "30%" },
      { top: "43%", left: "70%" },
    ],
    forwards: [
      { top: "22%", left: "20%" },
      { top: "15%", left: "50%" },
      { top: "22%", left: "80%" },
    ],
  },
  "4-6-0": {
    goalkeepers: [{ top: "92%", left: "50%" }],
    defenders: [
      { top: "63%", left: "15%" },
      { top: "72%", left: "38%" },
      { top: "72%", left: "62%" },
      { top: "63%", left: "85%" },
    ],
    midfielders: [
      { top: "50%", left: "30%" },
      { top: "50%", left: "70%" },
      { top: "35%", left: "20%" },
      { top: "35%", left: "40%" },
      { top: "35%", left: "60%" },
      { top: "35%", left: "80%" },
    ],
    forwards: [],
  },
  "4-5-1": {
    goalkeepers: [{ top: "92%", left: "50%" }],
    defenders: [
      { top: "63%", left: "15%" },
      { top: "72%", left: "38%" },
      { top: "72%", left: "62%" },
      { top: "63%", left: "85%" },
    ],
    midfielders: [
      { top: "50%", left: "35%" },
      { top: "50%", left: "65%" },
      { top: "35%", left: "20%" },
      { top: "35%", left: "50%" },
      { top: "35%", left: "80%" },
    ],
    forwards: [{ top: "15%", left: "50%" }],
  },
  "4-4-2": {
    goalkeepers: [{ top: "92%", left: "50%" }],
    defenders: [
      { top: "63%", left: "15%" },
      { top: "72%", left: "38%" },
      { top: "72%", left: "62%" },
      { top: "63%", left: "85%" },
    ],
    midfielders: [
      { top: "55%", left: "50%" },
      { top: "43%", left: "28%" },
      { top: "32%", left: "50%" },
      { top: "43%", left: "72%" },
    ],
    forwards: [
      { top: "15%", left: "30%" },
      { top: "15%", left: "70%" },
    ],
  },
  "4-3-3": {
    goalkeepers: [{ top: "92%", left: "50%" }],
    defenders: [
      { top: "63%", left: "15%" },
      { top: "72%", left: "38%" },
      { top: "72%", left: "62%" },
      { top: "63%", left: "85%" },
    ],
    midfielders: [
      { top: "40%", left: "30%" },
      { top: "50%", left: "50%" },
      { top: "40%", left: "70%" },
    ],
    forwards: [
      { top: "22%", left: "20%" },
      { top: "15%", left: "50%" },
      { top: "22%", left: "80%" },
    ],
  },
  "4-2-4": {
    goalkeepers: [{ top: "92%", left: "50%" }],
    defenders: [
      { top: "63%", left: "20%" },
      { top: "72%", left: "40%" },
      { top: "72%", left: "60%" },
      { top: "63%", left: "80%" },
    ],
    midfielders: [
      { top: "43%", left: "30%" },
      { top: "43%", left: "70%" },
    ],
    forwards: [
      { top: "22%", left: "20%" },
      { top: "15%", left: "40%" },
      { top: "15%", left: "60%" },
      { top: "22%", left: "80%" },
    ],
  },
  "3-6-1": {
    goalkeepers: [{ top: "92%", left: "50%" }],
    defenders: [
      { top: "65%", left: "25%" },
      { top: "72%", left: "50%" },
      { top: "65%", left: "75%" },
    ],
    midfielders: [
      { top: "48%", left: "15%" },
      { top: "52%", left: "50%" },
      { top: "30%", left: "50%" },
      { top: "35%", left: "30%" },
      { top: "35%", left: "70%" },
      { top: "48%", left: "85%" },
    ],
    forwards: [{ top: "15%", left: "50%" }],
  },
  "3-5-2": {
    goalkeepers: [{ top: "92%", left: "50%" }],
    defenders: [
      { top: "65%", left: "25%" },
      { top: "72%", left: "50%" },
      { top: "65%", left: "75%" },
    ],
    midfielders: [
      { top: "48%", left: "15%" },
      { top: "52%", left: "50%" },
      { top: "33%", left: "30%" },
      { top: "33%", left: "70%" },
      { top: "48%", left: "85%" },
    ],
    forwards: [
      { top: "15%", left: "30%" },
      { top: "15%", left: "70%" },
    ],
  },
  "3-4-3": {
    goalkeepers: [{ top: "92%", left: "50%" }],
    defenders: [
      { top: "65%", left: "25%" },
      { top: "72%", left: "50%" },
      { top: "65%", left: "75%" },
    ],
    midfielders: [
      { top: "55%", left: "50%" },
      { top: "43%", left: "28%" },
      { top: "32%", left: "50%" },
      { top: "43%", left: "72%" },
    ],
    forwards: [
      { top: "22%", left: "20%" },
      { top: "15%", left: "50%" },
      { top: "22%", left: "80%" },
    ],
  },
  "3-3-4": {
    goalkeepers: [{ top: "92%", left: "50%" }],
    defenders: [
      { top: "65%", left: "25%" },
      { top: "72%", left: "50%" },
      { top: "65%", left: "75%" },
    ],
    midfielders: [
      { top: "40%", left: "30%" },
      { top: "50%", left: "50%" },
      { top: "40%", left: "70%" },
    ],
    forwards: [
      { top: "22%", left: "20%" },
      { top: "15%", left: "40%" },
      { top: "15%", left: "60%" },
      { top: "22%", left: "80%" },
    ],
  },
};

const formationPlayerCounts = {
  "5-4-1": { goalkeepers: 1, defenders: 5, midfielders: 4, forwards: 1 },
  "5-3-2": { goalkeepers: 1, defenders: 5, midfielders: 3, forwards: 2 },
  "5-2-3": { goalkeepers: 1, defenders: 5, midfielders: 2, forwards: 3 },
  "4-6-0": { goalkeepers: 1, defenders: 4, midfielders: 6, forwards: 0 },
  "4-5-1": { goalkeepers: 1, defenders: 4, midfielders: 5, forwards: 1 },
  "4-4-2": { goalkeepers: 1, defenders: 4, midfielders: 4, forwards: 2 },
  "4-3-3": { goalkeepers: 1, defenders: 4, midfielders: 3, forwards: 3 },
  "4-2-4": { goalkeepers: 1, defenders: 4, midfielders: 2, forwards: 4 },
  "3-6-1": { goalkeepers: 1, defenders: 3, midfielders: 6, forwards: 1 },
  "3-5-2": { goalkeepers: 1, defenders: 3, midfielders: 5, forwards: 2 },
  "3-4-3": { goalkeepers: 1, defenders: 3, midfielders: 4, forwards: 3 },
  "3-3-4": { goalkeepers: 1, defenders: 3, midfielders: 3, forwards: 4 },
};

const MyTeamLineup = ({ teamPlayers }: { teamPlayers: PlayerWithStats[] }) => {
  const [formation, setFormation] = useState("5-4-1");
  const renderPlayers = (players: PlayerWithStats[], positionType: string) => {
    const positions = formationPositions[formation][positionType];
    return players.map((player, index) => {
      if (index >= positions.length) {
        // This check prevents trying to access a position that doesn't exist
        return null;
      }

      return (
        <div
          key={player.playerID}
          className="player flex flex-col items-center justify-center"
          style={{
            position: "absolute",
            top: positions[index].top,
            left: positions[index].left,
            transform: "translate(-50%, -50%)",
            width: "84px",
            height: "84px",
          }}
        >
          <div
            className="image-container"
            style={{ position: "relative", width: "100%", height: "100%" }}
          >
            <Link href={`/player/${player.playerData.playerID}`}>
              <Image
                src={player.playerData.image}
                alt={player.playerData.name}
                width={84}
                height={84}
                // fill={true}
                // style={{ objectFit: "contain" }}
                priority
              />
            </Link>
          </div>
          <Link href={`/player/${player.playerData.playerID}`}>
            <Card className="font-semibold text-center min-w-[72px] px-2 border-none rounded-xs text-base shadow-md shadow-neutral-800 text-neutral-800 backdrop-blur-xl bg-white/50 whitespace-nowrap	">
              {player.playerData.nickname.split(" ").slice(-1).join(" ")}
            </Card>
          </Link>
          <p className="text-center text-xs">{player.playerData.position}</p>
          <p className="text-center text-xs">{player.playerData.points}</p>
        </div>
      );
    });
  };

  return (
    <div className="">
      <div className="w-24 mx-auto my-4">
 
      <Select value={formation} onValueChange={(value) => setFormation(value)}>
        <SelectTrigger>
          <SelectValue>{`${formation}`}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5-4-1">5-4-1</SelectItem>
          <SelectItem value="5-3-2">5-3-2</SelectItem>
          <SelectItem value="5-2-3">5-2-3</SelectItem>
          <SelectItem value="4-6-0">4-6-0</SelectItem>
          <SelectItem value="4-5-1">4-5-1</SelectItem>
          <SelectItem value="4-4-2">4-4-2</SelectItem>
          <SelectItem value="4-3-3">4-3-3</SelectItem>
          <SelectItem value="4-2-4">4-2-4</SelectItem>
          <SelectItem value="3-6-1">3-6-1</SelectItem>
          <SelectItem value="3-5-2">3-5-2</SelectItem>
          <SelectItem value="3-4-3">3-4-3</SelectItem>
          <SelectItem value="3-3-4">3-3-4</SelectItem>
        </SelectContent>
      </Select>
             
      </div>
      <div className="relative max-w-2xl mx-auto min-w-[343px]">
        <div className="w-full ">
          <img
            src="/FieldLineup.png"
            alt="Soccer Field"
            width={600}
            height={900}
            className=" w-full h-auto"
          />
        </div>

        {teamPlayers && (
          <>
            {renderPlayers(
              teamPlayers
                ?.filter((p) => p.playerData.positionID === 1)
                .sort((a, b) => b.playerData.points - a.playerData.points)
                .slice(0, formationPlayerCounts[formation].goalkeepers),
              "goalkeepers"
            )}
            {renderPlayers(
              teamPlayers
                ?.filter((p) => p.playerData.positionID === 2)
                .sort((a, b) => b.playerData.points - a.playerData.points)
                .slice(0, formationPlayerCounts[formation].defenders),
              "defenders"
            )}
            {renderPlayers(
              teamPlayers
                ?.filter((p) => p.playerData.positionID === 3)
                .sort((a, b) => b.playerData.points - a.playerData.points)
                .slice(0, formationPlayerCounts[formation].midfielders),
              "midfielders"
            )}
            {renderPlayers(
              teamPlayers
                ?.filter((p) => p.playerData.positionID === 4)
                .sort((a, b) => b.playerData.points - a.playerData.points)
                .slice(0, formationPlayerCounts[formation].forwards),
              "forwards"
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyTeamLineup;

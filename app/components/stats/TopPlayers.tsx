import { Card } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getPositionBadge, lastChangeStyle, slugById } from "@/utils/utils";
import Image from "next/image";
import NextMatchesValueTable from "./NextMatchesValueTable";
import PointHistoryTable from "./PointHistoryTable";
import { Separator } from "@/components/ui/separator";

interface PlayerWithStats extends players {
  stats: stats[];
}

const TopPlayers = ({
  players,
  matches,
}: {
  players: any;
  matches: matches[];
}) => {
  return (
    <div className="flex w-full flex-col justify-start items-center">
      <Separator />
      <Tabs defaultValue="porteros" className="grow w-full mx-auto">
        <TabsList className="flex flex-row justify-center items-center mt-2">
          <TabsTrigger className="w-full" value="porteros">
            <div className={getPositionBadge(1).className}>
              {getPositionBadge(1).abbreviation}
            </div>
          </TabsTrigger>
          <TabsTrigger className="w-full" value="defensas">
            <div className={getPositionBadge(2).className}>
              {getPositionBadge(2).abbreviation}
            </div>
          </TabsTrigger>
          <TabsTrigger className="w-full" value="mediocampistas">
            <div className={getPositionBadge(3).className}>
              {getPositionBadge(3).abbreviation}
            </div>
          </TabsTrigger>
          <TabsTrigger className="w-full" value="delanteros">
            <div className={getPositionBadge(4).className}>
              {getPositionBadge(4).abbreviation}
            </div>
          </TabsTrigger>
          <TabsTrigger className="w-full" value="entrenadores">
            <div className={getPositionBadge(5).className}>
              {getPositionBadge(5).abbreviation}
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="porteros" className="overflow-visible mx-auto">
          <div className="flex flex-col justify-start items-center gap-4">
            <NextMatchesValueTable
              players={players[0].players}
              matches={matches}
            />
            <PointHistoryTable players={players[0].players} matches={matches} />
          </div>
        </TabsContent>
        <TabsContent value="defensas" className="overflow-visible mx-auto">
          <div className="flex flex-col justify-start items-center gap-4">
            <NextMatchesValueTable
              players={players[1].players}
              matches={matches}
            />
            <PointHistoryTable players={players[1].players} matches={matches} />
          </div>
        </TabsContent>
        <TabsContent
          value="mediocampistas"
          className="overflow-visible mx-auto"
        >
          <div className="flex flex-col justify-start items-center gap-4">
            <NextMatchesValueTable
              players={players[2].players}
              matches={matches}
            />
            <PointHistoryTable players={players[2].players} matches={matches} />
          </div>
        </TabsContent>
        <TabsContent value="delanteros" className="overflow-visible mx-auto">
          <div className="flex flex-col justify-start items-center gap-4">
            <NextMatchesValueTable
              players={players[3].players}
              matches={matches}
            />
            <PointHistoryTable players={players[3].players} matches={matches} />
          </div>
        </TabsContent>
        <TabsContent value="entrenadores" className="overflow-visible mx-auto">
          <div className="flex flex-col justify-start items-center gap-4">
            <NextMatchesValueTable
              players={players[4].players}
              matches={matches}
            />
            <PointHistoryTable players={players[4].players} matches={matches} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TopPlayers;

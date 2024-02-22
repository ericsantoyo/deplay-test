import { Card } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getPositionBadge, lastChangeStyle, slugById } from "@/utils/utils";
import Image from "next/image";
import NextMatchesValueTable from "./NextMatchesValueTable";
import PointHistoryTable from "./PointHistoryTable";

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
    <>
      {/* <pre className="">{JSON.stringify(matches.slice(0, 30), null, 2)}</pre> */}
      {/* <pre className="">{JSON.stringify(selectedTeamPlayers[1].teamID, null, 2)}</pre> */}
      <div className="flex flex-col justify-start items-center gap-2">
        <div className="flex w-full md:flex-row flex-col justify-between items-center gap-2">
          {/* TEAM SELECT */}
          <Tabs defaultValue="porteros" className="grow w-full mx-auto">
            <TabsList className="flex flex-row justify-center items-center ">
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
            <TabsContent value="porteros" className="flex flex-col gap-4 overflow-visible mx-auto">
              <NextMatchesValueTable
                players={players[0].players}
                matches={matches}
              />
              <PointHistoryTable
                players={players[0].players}
                matches={matches}
              />
            </TabsContent>
            <TabsContent value="defensas" className="flex flex-col gap-4 overflow-visible mx-auto">
              <NextMatchesValueTable
                players={players[1].players}
                matches={matches}
              />
              <PointHistoryTable
                players={players[1].players}
                matches={matches}
              />
            </TabsContent>
            <TabsContent
              value="mediocampistas"
              className="flex flex-col gap-4 overflow-visible mx-auto"
            >
              <NextMatchesValueTable
                players={players[2].players}
                matches={matches}
              />
              <PointHistoryTable
                players={players[2].players}
                matches={matches}
              />
            </TabsContent>
            <TabsContent
              value="delanteros"
              className="flex flex-col gap-4 overflow-visible mx-auto"
            >
              <NextMatchesValueTable
                players={players[3].players}
                matches={matches}
              />
              <PointHistoryTable
                players={players[3].players}
                matches={matches}
              />
            </TabsContent>
            <TabsContent
              value="entrenadores"
              className="flex flex-col gap-4 overflow-visible mx-auto"
            >
              <NextMatchesValueTable
                players={players[4].players}
                matches={matches}
              />
              <PointHistoryTable
                players={players[4].players}
                matches={matches}
              />
            </TabsContent>
          </Tabs>
        </div>
        {/* start deleting codeeeeeeeeeeeeeeeeeeeeeeeeee */}
      </div>
    </>
  );
};

export default TopPlayers;

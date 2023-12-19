import Image from "next/image";
import { getColor, slugById } from "@/utils/utils";
import SportsSoccerTwoToneIcon from "@mui/icons-material/SportsSoccerTwoTone";
import DoNotStepIcon from "@mui/icons-material/DoNotStep";
import SdCardAlertIcon from "@mui/icons-material/SdCardAlert";
import SignalCellularNoSimIcon from "@mui/icons-material/SignalCellularNoSim";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import TimerOffOutlinedIcon from "@mui/icons-material/TimerOffOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function MatchesStats({
  matchesData,

  playerStat,
}: {
  matchesData: matches[];

  playerStat: stats[];
}) {
  const renderPerformanceIcons = (matchWeek: number, matchState: number) => {
    const stat = playerStat.find((s) => s.week === matchWeek);

    if (matchState === 7 && !stat) {
      return (
        <div className="flex justify-between items-center w-full">
          <TimerOffOutlinedIcon color="action" fontSize="inherit" />
          <p className="text-sm italic text-gray-600">No estuvo presente</p>
        </div>
      );
    }

    // If the match is not finished or there are stats, return icons
    const icons = [];
    if (stat) {
      icons.push(
        <div
          key={`separator1-${matchWeek}`}
          className="mx-2 h-5 border-l border-neutral-400"
        ></div>
      );
      icons.push(
        <div
          key={`mins-played-${matchWeek}`}
          className="flex items-center mr-auto text-sm"
        >
          <WatchLaterOutlinedIcon color="action" fontSize="inherit" />
          <span className="ml-1">
            <span className="font-semibold text-xs ">
              {stat.mins_played[0]}
            </span>
            '
          </span>
        </div>
      );

      for (let i = 0; i < stat.goals[0]; i++) {
        icons.push(
          <SportsSoccerTwoToneIcon
            color="success"
            fontSize="small"
            key={`goal-${matchWeek}-${i}`}
          />
        );
      }
      for (let i = 0; i < stat.goal_assist[0]; i++) {
        icons.push(
          <DoNotStepIcon
            color="action"
            fontSize="small"
            key={`assist-${matchWeek}-${i}`}
          />
        );
      }
      for (let i = 0; i < stat.penalty_failed[0]; i++) {
        icons.push(
          <CancelPresentationOutlinedIcon
            color="error"
            fontSize="small"
            key={`penalty-failed-${matchWeek}-${i}`}
          />
        );
      }

      for (let i = 0; i < stat.yellow_card[0]; i++) {
        icons.push(
          <SdCardAlertIcon
            className="text-yellow-400"
            color="inherit"
            fontSize="small"
            key={`yellow-${matchWeek}-${i}`}
          />
        );
      }
      for (let i = 0; i < stat.red_card[0]; i++) {
        icons.push(
          <SignalCellularNoSimIcon
            className="text-red-600"
            color="inherit"
            fontSize="small"
            key={`red-${matchWeek}-${i}`}
          />
        );
      }

      icons.push(
        <div
          key={`separator2-${matchWeek}`}
          className="mx-2 h-5 border-l border-neutral-400"
        ></div>
      );

      icons.push(
        <div
          key={`total-points-${matchWeek}`}
          className={`text-center border-[0.5px] w-5 h-5 border-neutral-700 rounded-sm flex justify-center items-center ${getColor(
            stat.totalPoints
          )}`}
        >
          <p className={`text-[12px] items-center align-middle`}>
            {stat.totalPoints}
          </p>
        </div>
      );
    }

    return (
      <React.Fragment>
        <div className="flex justify-end items-center w-full">{icons}</div>
      </React.Fragment>
    );
  };

  return (
    <Card className="flex flex-col justify-start items-start p-2 w-full  ">
      <h3 className="font-bold text-xl mx-auto">Partidos</h3>
      {/* <pre>{JSON.stringify(matchesData, null, 2)}</pre> */}
      <ul className="list-none w-full flex flex-col justify-start items-start">
        {matchesData.map((match) => (
          <React.Fragment key={match.matchID}>
            <li className="w-full flex flex-row justify-start items-center">
              <p className="text-[10px] uppercase font-semibold text-center whitespace-nowrap	w-8">
                J-{match.week}
              </p>

              <div className="flex flex-col justify-between items-center w-[100px] py-[6px] text-center rounded-md px-2">
                <div className="flex flex-row justify-between items-center text-center w-full ">
                  <Image
                    src={`/teamLogos/${slugById(match.localTeamID)}.png`}
                    alt="home"
                    width={20}
                    height={20}
                    style={{ objectFit: "contain" }}
                    className="h-5 "
                  />

                  <div className="flex justify-center items-center">
                    <p className="font-semibold text-xs">{match.localScore}</p>
                    <p className="mx-1 text-xs">-</p>
                    <p className="font-semibold text-xs">
                      {match.visitorScore}
                    </p>
                  </div>

                  <Image
                    src={`/teamLogos/${slugById(match.visitorTeamID)}.png`}
                    alt="visitor"
                    width={20}
                    height={20}
                    style={{ objectFit: "contain" }}
                    className="h-5 "
                  />
                </div>
              </div>
              <div className="flex items-center justify-end flex-grow">
                {renderPerformanceIcons(match.week, match.matchState)}
              </div>
            </li>
            {match.week < matchesData.length && (
              <Separator className="w-full" />
            )}
          </React.Fragment>
        ))}
      </ul>
    </Card>
  );
}

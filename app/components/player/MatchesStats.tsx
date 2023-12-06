import Image from "next/image";
import { getColor, slugById } from "@/utils/utils";
import SportsSoccerTwoToneIcon from '@mui/icons-material/SportsSoccerTwoTone';
import SportsSoccerSharpIcon from '@mui/icons-material/SportsSoccerSharp';
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter"; // For assists (or choose an appropriate one)
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";
import { Card } from "@/components/ui/card";
import SdCardAlertIcon from '@mui/icons-material/SdCardAlert';
import SignalCellularNoSimIcon from '@mui/icons-material/SignalCellularNoSim';
import DoNotStepIcon from '@mui/icons-material/DoNotStep';
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function MatchesStats({
  matchesData,
  playerData,
  playerStat,
}: {
  matchesData: matches[];
  playerData: players;
  playerStat: stats[];
}) {
  const renderPerformanceIcons = (week: number) => {
    const stat = playerStat.find((s) => s.week === week);
    if (!stat) return null;

    const icons = [];
    for (let i = 0; i < stat.goals[0]; i++) {
      icons.push(<SportsSoccerTwoToneIcon color="success" fontSize="small" key={`goal-${week}-${i}`} />);
    }
    for (let i = 0; i < stat.goal_assist[0]; i++) {
      icons.push(<DoNotStepIcon color="action" fontSize="small" key={`assist-${week}-${i}`} />);
    }
    for (let i = 0; i < stat.yellow_card[0]; i++) {
      icons.push(<SdCardAlertIcon className="text-yellow-400" color="inherit" fontSize="small" key={`yellow-${week}-${i}`} />);
    }
    for (let i = 0; i < stat.red_card[0]; i++) {
      icons.push(<SignalCellularNoSimIcon className="text-red-600" color="inherit" fontSize="small" key={`red-${week}-${i}`} />);
    }

    icons.push(
      <div key={`separator-${week}`} className="mx-2 h-5 border-l border-neutral-400"></div>
    );
  
    // Add the total points div
    icons.push(
      <div
        key={`total-points-${week}`}
        className={`text-center border-[0.5px] w-5 h-5 border-neutral-700 rounded-sm flex justify-center items-center ${getColor(
          stat.totalPoints
        )}`}
      >
        <p className={`text-[12px] items-center align-middle`}>
          {stat.totalPoints}
        </p>
      </div>
    );
  


    return (
      <React.Fragment>
        <div className="flex justify-end items-center w-full">
          {icons}
        </div>
      </React.Fragment>
    );
  };

  return (
    <Card className="flex flex-col justify-start items-start p-2 w-full">
      <h3 className="font-bold text-xl mx-auto">Partidos</h3>
      <ul className="list-none w-full flex flex-col justify-start items-start">
        {matchesData.map((match, index) => (
          <React.Fragment key={match.matchID}>
          <li
            
            className="w-full flex flex-row justify-start items-center"
          >
            <p className="text-[10px] uppercase font-semibold text-center whitespace-nowrap	w-8">
              J-{index + 1}
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
                  <p className="font-semibold text-xs">{match.visitorScore}</p>
                </div>

                <Image
                  src={`/teamLogos/${slugById(match.visitorTeamID)}.png`}
                  alt="home"
                  width={20}
                  height={20}
                  style={{ objectFit: "contain" }}
                  className="h-5 "
                />
              </div>
            </div>
            <div className="flex items-center justify-end flex-grow">
              {/* Render Performance Metrics */}
              {renderPerformanceIcons(index + 1)}
            </div>
          </li>
          {index < matchesData.length - 1 && (
            <Separator className="w-full" />
          )}
          </React.Fragment>
        ))}
      </ul>
    </Card>
  );
}

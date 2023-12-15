"use client";
import {
  getColor,
  getWeeksTotalPointsFromSinglePlayer,
  slugById,
} from "@/utils/utils";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
// matchesData = { matchesData };
// playerStat = { playerStat };
// playerWithStats = { playerWithStats };

export default function FantasyStat({
  matchesData,
  playerWithStats,
  playerStat,
}: {
  matchesData: matches[];
  playerWithStats: { playerData: players; stats: stats[] };
  playerStat: stats[];
}) {
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const weekContainerRef = useRef(null);

  // Set the default week and scroll to it
  useEffect(() => {
    const maxWeek = Math.max(...playerWithStats.stats.map((stat) => stat.week));
    setSelectedWeek(maxWeek);
  }, [playerWithStats.stats]);

  // Scroll to the selected week button
  useEffect(() => {
    if (weekContainerRef.current && selectedWeek !== null) {
      const selectedButton = weekContainerRef.current?.querySelector(
        `button[data-week='${selectedWeek}']`
      ) as HTMLElement;
      selectedButton?.scrollIntoView({ behavior: "smooth", inline: "end" });
    }
  }, [selectedWeek]);

  const handleWeekSelection = (weekNumber: number) => {
    setSelectedWeek(weekNumber);
  };

  const isStatHighlighted = (statValue) => {
    if (Array.isArray(statValue)) {
      return statValue.some((value) => value > 0);
    } else {
      return statValue > 0;
    }
  };

  return (
    <div>
      {/* <pre>{JSON.stringify(playerWithStats, null, 2)}</pre> */}
      <div
        className="flex overflow-x-auto whitespace-nowrap py-1  max-w-xl mx-auto gap-3"
        ref={weekContainerRef}
      >
        {playerWithStats.stats.map((stats) => (
          <button
            key={stats.week}
            data-week={stats.week}
            onClick={() => setSelectedWeek(stats.week)}
            className={`p-1 ${
              selectedWeek === stats.week
                ? "bg-neutral-300 text-neutral-900 font-bold border border-neutral-500 rounded-md"
                : ""
            }`}
          >
            <div className="flex flex-col justify-center items-center">
              <div className="text-center">J{stats.week}</div>
              <div
                className={`text-center border-[0.5px] w-6 h-6 border-neutral-700 rounded-sm flex justify-center items-center ${getColor(
                  stats.totalPoints
                )}`}
              >
                <p className={`text-md items-center align-middle`}>
                  {stats.totalPoints}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center mt-1">
              {matchesData &&
                matchesData
                  .filter((match) => match.week === stats.week)
                  .map((match, index) => {
                    if (
                      match.localTeamID !== playerWithStats.playerData.teamID
                    ) {
                      return (
                        <Image
                          src={`/teamLogos/${slugById(match.localTeamID)}.png`}
                          alt="opponent"
                          width={20}
                          height={20}
                          style={{ objectFit: "contain" }}
                          className="h-5 mb-1"
                          key={`week-${stats.week}-team-${
                            match.localTeamID || match.visitorTeamID
                          }-index-${index}`}
                        />
                      );
                    } else if (
                      match.visitorTeamID !== playerWithStats.playerData.teamID
                    ) {
                      return (
                        <Image
                          src={`/teamLogos/${slugById(
                            match.visitorTeamID
                          )}.png`}
                          alt="opponent"
                          width={20}
                          height={20}
                          style={{ objectFit: "contain" }}
                          className="h-5 mb-1 "
                          key={`week-${stats.week}-team-${
                            match.localTeamID || match.visitorTeamID
                          }-index-${index}`}
                        />
                      );
                    }
                  })}
            </div>
          </button>
        ))}
      </div>

      {selectedWeek && (
        <div className="flex flex-col max-w-xl text-center  mx-auto">
          <h2 className="text-lg font-bold my-4">Jornada {selectedWeek}</h2>
          <div className="border">
            {playerWithStats.stats
              .filter((stats) => stats.week === selectedWeek)
              .map((stats) => (
                <div key={`stats-${stats.week}`}>
                  {" "}
                  {/* List the stats you want to show explicitly */}
                  {[
                    ["mins_played", "Minutos jugados"],
                    ["goals", "Goles"],
                    ["goal_assist", "Asistencias de gol"],
                    ["offtarget_att_assist", "Asistencias sin gol"],
                    ["pen_area_entries", "Balones al área"],
                    ["penalty_won", "Penaltis provocados"],
                    ["penalty_save", "Penaltis parados"],
                    ["saves", "Paradas"],
                    ["effective_clearance", "Despejes"],
                    ["penalty_failed", "Penaltis fallados"],
                    ["own_goals", "Goles en propia puerta"],
                    ["goals_conceded", "Goles en contra"],
                    ["yellow_card", "Tarjetas amarillas"],
                    ["second_yellow_card", "Segundas amarillas"],
                    ["red_card", "Red Cards"],
                    ["total_scoring_att", "Tiros a puerta"],
                    ["won_contest", "Regates"],
                    ["ball_recovery", "Balones recuperados"],
                    ["poss_lost_all", "Posesiones perdidas"],
                    ["penalty_conceded", "Penaltis cometidos"],
                  ].map(([statKey, label]) => {
                    const value = stats[statKey];
                    const isHighlighted = isStatHighlighted(value);
                    const uniqueKey = `week-${stats.week}-stat-${statKey}`;

                    return (
                      <div
                        key={uniqueKey}
                        className={`flex justify-between items-center border-b-2 px-2 py-1 max-w-xl mx-auto ${
                          isHighlighted ? "bg-gray-100 text-center" : ""
                        }`}
                      >
                        <p className="font-bold">
                          {Array.isArray(value) ? value[0] : value}
                        </p>
                        <h3>{label}</h3>
                        <p className="font-bold">
                          {Array.isArray(value) && value[1]}
                        </p>
                      </div>
                    );
                  })}
                  {/* Render marca_points and totalPoints separately */}
                  <div
                    key={`week-${stats.week}-marca_points`}
                    className={`flex justify-between items-center border-b-2 px-2 py-1 max-w-xl mx-auto ${
                      stats.marca_points[1] > 0 ? "bg-gray-100" : ""
                    }`}
                  >
                    <p></p> {/* Empty cell for alignment */}
                    <h3>Puntos Relevo</h3>
                    <p>{stats.marca_points[1]}</p>
                  </div>
                  <div
                    key={`week-${stats.week}-totalPoints`}
                    className={`flex justify-between items-center border-b-2 px-2 py-1 max-w-xl mx-auto ${
                      stats.totalPoints > 0 ? "bg-gray-100" : ""
                    }`}
                  >
                    <p></p> {/* Empty cell for alignment */}
                    <h3>Points</h3>
                    <p>{stats.totalPoints}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

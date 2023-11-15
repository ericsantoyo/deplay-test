import { Card } from "@/components/ui/card";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import Link from "next/link";
import {
  formatDate,
  formatMoney,
  getWeeksTotalPointsFromStats,
  lastChangeStyle,
  formatter,
  getPositionBadge,
} from "@/utils/utils";
import { ChevronsDown, ChevronsUp } from "lucide-react";

const getColor = (points: number) => {
  if (points >= 10) return "bg-green-600 text-neutral-50 font-bold text-shadow";
  if (points >= 5) return "bg-green-500 text-neutral-50 font-bold text-shadow";
  if (points >= 2) return "bg-orange-500 text-neutral-50 font-bold text-shadow";
  if (points >= 0) return "bg-red-500 text-neutral-50 font-bold text-shadow";
  return "bg-red-700 text-neutral-50 font-bold text-shadow";
};

interface PlayerStats {
  statType: string;
  value: number;
}

interface PlayerWithStats {
  playerData: {
    playerID: string;
    name: string;
    position: string;
  };
  stats: PlayerStats[];
}

interface TeamRosterProps {
  teamPlayers: any;
  playerStats: PlayerWithStats[];
}

const TeamRoster: React.FC<TeamRosterProps> = ({
  teamPlayers,
  playerStats,
}) => {
  return (
    <>
      <div className=" flex flex-col justify-start ">
        <Card className="py-2 border-none shadow-none flex flex-row justify-between items-center px-2 text-xs md:text-sm font-medium">
          <div className="flex flex-row justify-center items-center ml-2 md:w-36 w-[120px] flex-none">
            <p className="">Jugador</p>
          </div>
          <p className="hidden md:flex flex-1 justify-center text-center	 mx-2 ">
            Posicion
          </p>
          <p className="hidden md:flex flex-1 justify-center text-center	 mx-2 ">
            Puntos
          </p>
          <p className="hidden md:flex flex-1 justify-center text-center	 mx-2 ">
            Valor
          </p>

          <div className="flex flex-row justify-end mx-4 flex-1 text-end ">
            <ChevronsDown
              size={16}
              className="mr-2 text-red-500 dark:text-red-400 "
            />
            <ChevronsUp
              size={16}
              className="text-green-600 dark:text-green-400 mr-2"
            />
          </div>

          <div className="flex flex-row justify-center items-center w-[140px]">
            <div className="text-center ">Últimas Jornadas</div>
          </div>
        </Card>
        {teamPlayers.map((player, index) => (
          <Link href={`/player/${player.playerID}`} key={index}>
            <Card className="rounded-none flex flex-row  items-center px-2 text-xs md:text-sm ">
              <div className="flex flex-row justify-start items-center ">
                <Image
                  src={player.image}
                  alt={player.nickname}
                  width={48}
                  height={48}
                  className="w-10 h-10 md:w-12 md:h-12"
                />
                <div className="flex flex-col flex-1 ml-2">
                  <p className="font-semibold w-18 md:w-24">
                    {/* {player.nickname.length > 13
                      ? `${player.nickname.split(" ")[0].charAt(0)}. ${
                          player.nickname.split(" ")[1]
                        }`
                      : player.nickname} */}

                    {player.nickname.length <= 12
                      ? `${player.nickname}`
                      : player.nickname.length > 13 &&
                        player.nickname.includes(" ")
                      ? `${player.nickname.split(" ")[0].charAt(0)}. ${
                          player.nickname.split(" ")[1]
                        }`
                      : player.nickname.length <= 10 ||
                        !player.nickname.includes(" ")
                      ? player.nickname
                      : player.nickname.split(" ")[1]}
                  </p>
                  <div
                    className={`md:hidden font-base text-[11px] font-light text-start `}
                  >
                    {formatter.format(player.marketValue)}
                  </div>
                </div>
              </div>
              <div className="hidden md:flex flex-1 justify-center text-center	 mx-2 ">
                <div className={getPositionBadge(player.positionID).className}>
                  {getPositionBadge(player.positionID).abbreviation}
                </div>
              </div>
              <p className="hidden md:flex flex-1 justify-center text-center	 mx-2 ">
                {player.points}
              </p>
              <p className="hidden md:flex flex-1 justify-center text-center	 mx-2 ">
                {formatter.format(player.marketValue)}
              </p>

              <div className="flex flex-col flex-1 ">
                <div
                  className={`font-semibold  text-end	text-xs md:text-sm mx-4 ${lastChangeStyle(
                    player.lastMarketChange
                  )}`}
                >
                  {formatter.format(player.lastMarketChange)}
                </div>
                {/* <div
                  className={`md:hidden font-base text-[10px] text-end	 mx-4 `}
                >
                  {formatter.format(player.marketValue)}
                </div> */}
              </div>
              <div className="flex flex-row justify-end items-center gap-x-1 w-[130px] md:w-[140px]">
                {getWeeksTotalPointsFromStats(
                  player.playerID,
                  playerStats,
                  6
                ).map((point) => (
                  <div
                    className="flex flex-col justify-between items-center h-full"
                    key={point.week}
                  >
                    <div
                      className={`flex justify-center items-center text-center border-[0.5px] md:w-5 md:h-5 w-[18px] h-[18px] border-neutral-700   rounded-sm   ${getColor(
                        point.points
                      )}`}
                    >
                      <p className={`text-[11px] md:text-xs  `}>
                        {point.points}
                      </p>
                    </div>
                    <div className=" text-center text-[10px] md:text-[11px] leading-none pt-1">
                      J{point.week}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default TeamRoster;

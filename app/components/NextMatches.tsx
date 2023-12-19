import { Card } from "@/components/ui/card";
import { getCurrentWeek, slugById } from "@/utils/utils";
import Image from "next/image";
import HomeIcon from "@mui/icons-material/Home";
import FlightIcon from "@mui/icons-material/Flight";

interface Props {
  matches: any;
  selectedTeam: number;
  dateClass: string;
  howMany: number;
  pClass: string;
}

const NextMatches = ({
  matches,
  selectedTeam,
  dateClass,
  howMany,
  pClass,
}: Props) => {
  const teamMatches = matches;
  const currentWeek = getCurrentWeek(teamMatches);
  // console.log(currentWeek);

  return (
    <div className=" flex flex-col  md:flex-none min-w-fit">
      <p
        className={`${pClass}  text-center text-xs uppercase font-medium mb-3`}
      >
        Próximos partidos
      </p>
      <div className=" flex flex-row justify-end items-center md:gap-4 gap-2">
        {/* Display matches for the selected week */}
        {teamMatches
          .filter(
            (match) =>
              match.week >= currentWeek && match.week <= currentWeek + howMany
          )
          .sort((a, b) => new Date(a.matchDate) - new Date(b.matchDate))
          .map((match) => (
            <div key={match.matchID}>
              <Card className="flex flex-col justify-between items-center border-none shadow-none h-full text-xs text-center  gap-1  ">
                <div className="text-center text-[11px]">J{match.week}</div>
                {match.localTeamID !== selectedTeam && (
                  <Image
                    src={`/teamLogos/${slugById(match.localTeamID)}.png`}
                    alt="home"
                    width={24}
                    height={24}
                    style={{ objectFit: "contain" }}
                    className="h-5 md:h-6 "
                  />
                )}

                {match.visitorTeamID !== selectedTeam && (
                  <Image
                    src={`/teamLogos/${slugById(match.visitorTeamID)}.png`}
                    alt="visitor"
                    width={24}
                    height={24}
                    style={{ objectFit: "contain" }}
                    className="h-5 md:h-6 "
                  />
                )}

                <p
                  className={`${dateClass}  text-[10px] uppercase font-medium text-center`}
                >
                  {new Date(match.matchDate).toLocaleDateString("es-EU", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <div className="">
                  {match.localTeamID !== selectedTeam ? (
                    <FlightIcon className="rotate-45" />
                  ) : (
                    <HomeIcon />
                  )}
                </div>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NextMatches;

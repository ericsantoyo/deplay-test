import { Card } from "@/components/ui/card";
import { getCurrentWeek, slugById } from "@/utils/utils";
import Image from "next/image";
import HomeIcon from "@mui/icons-material/Home";
import FlightIcon from "@mui/icons-material/Flight";

interface Props {
  matches: any;
  selectedTeam: number;
}

const NextMatches = ({ matches, selectedTeam }: Props) => {
  const teamMatches = matches;
  const currentWeek = getCurrentWeek(teamMatches);
  // console.log(currentWeek);

  return (
    <div className=" flex flex-col  md:flex-none min-w-fit">
      <p className="text-center text-xs uppercase font-medium mb-2">
        Próximos partidos
      </p>
      <div className=" flex flex-row justify-end items-center md:gap-4 gap-3">
        {/* Display matches for the selected week */}
        {teamMatches
          .filter(
            (match) =>
              match.week >= currentWeek && match.week <= currentWeek + 3
          )
          .sort((a, b) => new Date(a.matchDate) - new Date(b.matchDate))
          .map((match) => (
            <div key={match.matchID}>
              <Card className="flex flex-col justify-between items-center border-none shadow-none h-full py-[6px] text-xs text-center rounded-md">
                {match.localTeamID !== selectedTeam && (
                  <Image
                    src={`/teamLogos/${slugById(match.localTeamID)}.png`}
                    alt="home"
                    width={36}
                    height={36}
                    style={{ objectFit: "contain" }}
                    className="h-6 "
                  />
                )}

                {match.visitorTeamID !== selectedTeam && (
                  <Image
                    src={`/teamLogos/${slugById(match.visitorTeamID)}.png`}
                    alt="visitor"
                    width={36}
                    height={36}
                    style={{ objectFit: "contain" }}
                    className="h-6 "
                  />
                )}

                <p className="text-[10px] uppercase font-medium text-center">
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

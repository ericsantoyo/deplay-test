import { Card } from "@/components/ui/card";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import GroupsTwoToneIcon from "@mui/icons-material/GroupsTwoTone";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import NewspaperIcon from '@mui/icons-material/Newspaper';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import SportsIcon from '@mui/icons-material/Sports';
import Link from "next/link";

export default function BottomMenu() {
  return (
    <Card className="fixed bottom-0 right-0 left-0 w-full rounded-none shadow-none h-[66px] 	 md:hidden ">
      <div className="flex flex-row justify-between items-center w-full h-full px-6">
        <Link href="/market" className="flex flex-col justify-center items-center">
          <SportsIcon className="text-neutral-600" sx={{ fontSize: 32 }} />
          <p className="text-xs">Partidos</p>
        </Link>
        <Link href="/market" className="flex flex-col justify-center items-center">
          <QueryStatsIcon className="text-neutral-600" sx={{ fontSize: 32 }} />
          <p className="text-xs">Mercado</p>
        </Link>
        <Link href="/news" className="flex flex-col justify-center items-center">
          <NewspaperIcon className="text-neutral-600" sx={{ fontSize: 32 }} />
          <p className="text-xs">Noticias</p>
        </Link>
        <Link href="/news" className="flex flex-col justify-center items-center">
          <CalendarMonthIcon className="text-neutral-600" sx={{ fontSize: 32 }} />
          <p className="text-xs">Calendario</p>

        </Link>
        <Link href="/market" className="flex flex-col justify-center items-center">
        <AssignmentIndIcon className="text-neutral-600" sx={{ fontSize: 32 }} />
          <p className="text-xs">Usuario</p>
        </Link>
      </div>
    </Card>
  );
}

import Image from "next/image";
import soccerfield from "@/public/soccerfield.svg";
import IconButton from "@mui/material/IconButton";
import { Button } from "@/components/ui/button";
import Tooltip from "@mui/material/Tooltip";

type Props = {
  className?: string;
};

const GamesIcon = (props: Props) => {
  return (
    <>
      <Tooltip
        PopperProps={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -7],
              },
            },
          ],
        }}
        title="Partidos"
      >
        <Button
          variant="default"
          size={"icon"}
          className={`group transition-all bg-neutral-50 dark:bg-neutral-300 dark:hover:bg-red-600 hover:bg-red-600 outline-none focus:outline-none`}
        >
          <div className="flex justify-center items-center   ">
            <svg
              className="transition-all w-6    fill-red-600 group-hover:fill-neutral-100 "
              viewBox="0 0 70 64"
              xmlns="http://www.w3.org/2000/svg"
              alt="LALIGA"
            >
              <path d="M2.91 25.173L20.332 0h16.854L15.497 30.861h14.08L7.675 42.026l-4.41-5.618C1.701 34.346.99 32.782.99 30.648c0-1.92.712-3.77 1.92-5.475zM17.203 51.2c0-1.778.712-3.698 1.99-5.547L51.265 0h18.56L33.841 51.2h16.213L24.882 64l-5.405-6.897c-1.493-1.92-2.275-3.84-2.275-5.902l.001-.002z"></path>
            </svg>
          </div>
        </Button>
      </Tooltip>
    </>
  );
};

export default GamesIcon;

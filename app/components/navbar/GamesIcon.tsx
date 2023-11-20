import Image from "next/image";
import soccerfield from "@/public/soccerfield.svg";
import IconButton from "@mui/material/IconButton";

type Props = {
  className?: string;
  // onClick?: () => void;
};

const GamesIcon = (props: Props) => {
  return (
    <>
      <IconButton
        size="large"
        sx={{
          // boxShadow: 2,
          borderRadius: 1,
          padding: 0,
        }}
        className={`${props.className}  w-12 h-12 md:w-8 md:h-8 group transition-all  `}
        // onClick={props.onClick}
      >
        <div className="flex justify-center items-center ">
          <svg
          className="transition-all group-hover:grayscale  md:w-6 w-8"
           
            viewBox="0 0 70 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            alt="LALIGA"
          >
            <path
              d="M2.91 25.173L20.332 0h16.854L15.497 30.861h14.08L7.675 42.026l-4.41-5.618C1.701 34.346.99 32.782.99 30.648c0-1.92.712-3.77 1.92-5.475zM17.203 51.2c0-1.778.712-3.698 1.99-5.547L51.265 0h18.56L33.841 51.2h16.213L24.882 64l-5.405-6.897c-1.493-1.92-2.275-3.84-2.275-5.902l.001-.002z"
              fill="#FF4B44"
            ></path>
          </svg>
          {/* <Image
              src={soccerfield}
              alt="toggle"
              width={30}
              height={24}
              className="h-10 w-auto transition  "
            /> */}
        </div>
      </IconButton>
    </>
  );
};

export default GamesIcon;

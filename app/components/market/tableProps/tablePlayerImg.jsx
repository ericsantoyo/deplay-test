import Image from "next/image";

export default (props) => {
  const cellValue = props.value;

  return (
    <div className="flex justify-center items-center">
      <Image
        className=""
        src={`/playerImages/${cellValue}.png`}
        alt="Player"
        width={35}
        height={35}
      />
    </div>
  );
};

import React from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  className?: string;
};

const Logo = (props: Props) => {
  return (
  
      <Link href="/">
        <Image
          className={`${props.className} invert dark:invert-0 transition-all`}
          src="/logo.png"
          width={135}
          height={63}
          alt="OnceFantasy Logo"
          style={{ height: "63", width: "135",}}
          priority
        />
      </Link>
    
  );
};

export default Logo;
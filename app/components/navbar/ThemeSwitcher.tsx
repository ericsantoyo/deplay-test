"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import IconButton from "@mui/material/IconButton";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

type Props = {
  className?: string;
};

export const ThemeSwitcher = (props: Props) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
 
      <IconButton
        size="small"
        sx={{ boxShadow: 1 }}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        color="inherit"
        className={`${props.className}  transition-all bg-neutral-50 dark:bg-neutral-300  `}
      >
        {theme === "light" ? (
          <Brightness4Icon className=" transition  " />
        ) : (
          <Brightness7Icon className=" transition   " />
        )}
      </IconButton>
      
 
  );
};

"use client";
import React, { ChangeEvent, useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import useSWR from "swr";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import { getAllPlayers } from "@/database/client";
import Image from "next/image";
import { slugById } from "@/utils/utils";
import Link from "next/link";
import Paper from "@mui/material/Paper";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export type SearchProps = {
  divClassName?: string;
};

const SearchBox = (props: SearchProps) => {
  const { data: players, error } = useSWR(["getAllPlayers"], async () => {
    const { allPlayers: players } = (await getAllPlayers()) as {
      allPlayers: players[];
    };
    return players;
  });

  // Define state variables for search term and modal open state
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  // Event handler for input change
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter players based on search term
  const filteredPlayers = players
    ?.filter((player) =>
      player.nickname.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, searchTerm ? undefined : 9);

  // Handlers for opening and closing the modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={`${props.divClassName}`}>
      <Button
        variant="default"
        size={"icon"}
        aria-label="search"
        onClick={handleOpen}
        className={`group transition-all bg-neutral-50 dark:bg-neutral-300 text-neutral-600 dark:hover:bg-red-600 hover:bg-neutral-500 outline-none focus:outline-none`}
      >
        <SearchIcon className=" group-hover:text-neutral-100 transition-all" />
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        className="flex justify-center items-center "
      >
        <Card className=" w-[250px] h-[405px]  p-4 transition-all absolute outline-none  flex flex-col justify-start  ">
          <Paper
            className={` w-full  mb-2 rounded px-1 py-1 flex`}
            component="form"
            variant="outlined"
          >
            <InputBase
              // sx={{ ml: 1, flex: 1 }}
              placeholder="Buscar jugador..."
              inputProps={{ "aria-label": "" }}
              onChange={(event) => handleInputChange(event)}
              value={searchTerm}
              className="w-full ml-2  flex-1"
            />
          </Paper>
          {/* Display search results */}
          <div className="flex flex-col w-full overflow-auto">
            {filteredPlayers &&
              filteredPlayers.map((player, index) => (
                <div key={player.playerID} className=" w-full">
                  <Link
                    href={`/player/${player.playerID}`}
                    className="flex justify-between items-center space-x-2 w-full px-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleClose}
                  >
                    <div className="flex justify-center items-center w-8">
                      <Image
                        src={player.image}
                        alt={player.nickname}
                        width={32}
                        height={32}
                        className="h-8 w-auto"
                      />
                    </div>
                    <span className="text-sm">{player.nickname}</span>
                    <div className="flex justify-center items-center w-6">
                      <Image
                        src={`/teamLogos/${slugById(player.teamID)}.png`}
                        alt={player.teamName}
                        width={28}
                        height={28}
                        className="h-6 w-auto"
                      />
                    </div>
                  </Link>
                  <Separator className="mt-0.5" />
                </div>
              ))}
          </div>
        </Card>
      </Modal>
    </div>
  );
};

export default SearchBox;

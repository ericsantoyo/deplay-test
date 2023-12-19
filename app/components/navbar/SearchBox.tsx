
import React, { ChangeEvent, useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export type SearchProps = {
  // onSearch: (value: string) => void;
  className?: string;
};

const SearchBox = (props: SearchProps) => {
  // const { onSearch } = props;
  // const [value, setValue] = useState("");

  // const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //   const { target } = event;
  //   setValue(target.value);
  // };

  // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === "Enter") {
  //     onSearch(value);
  //   }
  // };

  return (

      <Paper
        className={`${props.className} w-full md:min-w-[130px] md:max-w-[160px] `}
        component="form"
        variant="outlined"
        sx={{
          p: "1px 4px",
          display: "flex",
          alignItems: "center",
          height: 40,
          borderRadius: 2,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Buscar..."
          inputProps={{ "aria-label": "" }}
          // onChange={(event) => searchHandler(event)}
          // onKeyDown={handleKeyDown}
        />
        <IconButton type="button" sx={{ p: "8px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
  
  );
};

export default SearchBox;

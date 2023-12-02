"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.min.css";
import tablePositions from "@/app/components/market/tableProps/tablePositions";
import tableValues from "@/app/components/market/tableProps/tableValues";
import tableClubLogos from "@/app/components/market/tableProps/tableClubLogos";
import tableSubidasBajadas from "@/app/components/market/tableProps/tableSubidasBajadas";
import tablePlayerNames from "@/app/components/market/tableProps/tablePlayerNames";
import tablePlayerImg from "@/app/components/market/tableProps/tablePlayerImg";
import HomeIcon from "@mui/icons-material/Home";
import FlightIcon from "@mui/icons-material/Flight";
import {
  getAllPlayers,
  getAllStats,
  getMatchesByTeamID,
} from "@/database/client";
import {
  getColor,
  formatDate,
  formatMoney,
  getWeeksTotalPointsFromStats,
  getNextThreeMatches,
} from "@/utils/utils";
// import { useTheme } from "next-themes";
import Image from "next/image";
import { ChevronsDown, ChevronsUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { slugById } from "@/utils/utils";
import { Skeleton } from "@/components/ui/skeleton";
import useSWR from "swr";
import { Card, CardFooter } from "@/components/ui/card";
import ValueChart from "../player/ValueChart";
import { Separator } from "@/components/ui/separator";

interface Player {
  averagePoints: number;
  image: string;
  lastMarketChange: number;
  marketValue: number;
  marketValues: Array<{
    lfpId: number;
    marketValue: number;
    date: string;
    bids: number;
  }>;
  name: string;
  nickname: string;
  playerID: number;
  points: number;
  position: string;
  positionID: number;
  previousMarketValue: number;
  status: string;
  teamID: number;
  teamName: string;
}

interface Stat {
  ball_recovery: [number, number];
  effective_clearance: [number, number];
  goal_assist: [number, number];
  goals: [number, number];
  goals_conceded: [number, number];
  isInIdealFormation: boolean;
  marca_points: [number, number];
  mins_played: [number, number];
  offtarget_att_assist: [number, number];
  own_goals: [number, number];
  pen_area_entries: [number, number];
  penalty_conceded: [number, number];
  penalty_failed: [number, number];
  penalty_save: [number, number];
  penalty_won: [number, number];
  playerID: number;
  poss_lost_all: [number, number];
  red_card: [number, number];
  saves: [number, number];
  second_yellow_card: [number, number];
  total_scoring_att: [number, number];
  totalPoints: number;
  week: number;
  won_contest: [number, number];
  yellow_card: [number, number];
}

interface PlayerWithStats {
  playerData: Player;
  stats: Stat[];
}

const NewMarketUp = () => {
  const [rowData, setRowData] = useState<PlayerWithStats[]>();

  // const { theme } = useTheme();

  const [selectedPlayer, setSelectedPlayer] = useState<PlayerWithStats | null>(
    null
  );
  const [gridClassName, setGridClassName] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // useEffect(() => {
  //   setGridClassName(
  //     theme === "light" ? "ag-theme-balham" : "ag-theme-balham-dark"
  //   );
  // }, [theme]);

  function formatPlayersWithStats(
    players: Player[],
    stats: Stat[]
  ): PlayerWithStats[] {
    const formattedPlayers = [];

    for (const player of players) {
      const playerStats = stats.filter(
        (stat) => stat.playerID === player.playerID
      );
      formattedPlayers.push({ playerData: player, stats: playerStats });
    }

    return formattedPlayers;
  }

  const { data: playersWithStats, error } = useSWR(
    ["getAllPlayers", "getAllStats"],
    async () => {
      const { allPlayers: players } = (await getAllPlayers()) as {
        allPlayers: Player[];
      };
      const { allStats: stats } = (await getAllStats()) as { allStats: Stat[] };

      return formatPlayersWithStats(players, stats);
    }
  );

  useEffect(() => {
    if (playersWithStats) {
      setRowData(playersWithStats);
    }
  }, [playersWithStats]);

  // const { data: matchesData } = useSWR("getAllMatches", async () => {
  //   const { allMatches: matches } = await getAllMatches();
  //   return matches;
  // });

  //playersWithStats
  const prepareValueChangesData = (playerId: number) => {
    const playerData = rowData.find(
      (player) => player.playerData.playerID === playerId
    );

    if (playerData) {
      const playerValueChanges = [];

      for (let i = 1; i < playerData.playerData.marketValues.length; i++) {
        const currentDate = playerData.playerData.marketValues[i].date;
        const previousDate = playerData.playerData.marketValues[i - 1].date;
        const currentValue = playerData.playerData.marketValues[i].marketValue;
        const previousValue =
          playerData.playerData.marketValues[i - 1].marketValue;

        const valueChange = currentValue - previousValue;
        const percentageChange =
          ((currentValue - previousValue) / previousValue) * 100; // Calculate the percentage change
        const newValue = currentValue; // Calculate the new value

        playerValueChanges.push({
          date: currentDate,
          valueChange,
          percentageChange,
          newValue, // Include the new value in the object
        });
      }

      // Reverse the array to display the most recent changes first
      const last20ValueChanges = playerValueChanges.reverse().slice(0, 30); // Slice to include only the last 30 entries

      return last20ValueChanges;
    }
    return [];
  };

  const [teamMatches, setTeamMatches] = useState<matches[]>([]);

  const handlePlayerSelection = async (player: PlayerWithStats) => {
    if (player) {
      const { data, error } = await getMatchesByTeamID(
        player.playerData.teamID
      );

      if (data && !error) {
        setTeamMatches(data as matches[]); // Cast to Match[] if you're sure about the data structure.
        handleOpen();
      } else {
        // Handle the case when data is null or there's an error
        // For example, you might want to set teamMatches to an empty array or show an error message.
        setTeamMatches([]);
      }
    }
  };

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "playerData.playerID",
      headerName: "",
      minWidth: 60,
      maxWidth: 70,
      cellRenderer: tablePlayerImg,
    },
    {
      field: "playerData.nickname",
      headerName: "Nombre",
      minWidth: 110,
      cellRenderer: tablePlayerNames,
    },
    {
      field: "playerData.lastMarketChange",
      headerName: "Cambio",
      minWidth: 90,
      sort: "asc",
      headerClass: "ag-center-header",

      cellRenderer: tableSubidasBajadas,
    },
    {
      field: "playerData.teamName",
      headerName: "",
      minWidth: 40,
      cellRenderer: tableClubLogos,
    },
    {
      field: "playerData.marketValue",
      headerName: "$ Actual",
      minWidth: 90,
      headerClass: "ag-center-header",
      cellRenderer: tableValues,
    },
    {
      field: "playerData.previousMarketValue",
      headerName: "$ Previo",
      minWidth: 80,
      cellRenderer: tableValues,
    },

    {
      field: "playerData.positionID",
      headerName: "Pos",
      minWidth: 65,
      cellRenderer: tablePositions,
      headerClass: "ag-center-header",
    },
  ]);

  const defaultColDef = {
    resizable: false,
    sortable: false,
  };

  const gridRef = useRef<AgGridReact>(null);
  const [gridApi, setGridApi] = useState(null);
  const gridApiRef = useRef<any>(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const onFirstDataRendered = useCallback((params = {}) => {
    gridRef.current?.api.sizeColumnsToFit();
  }, []);

  const onGridSizeChanged = useCallback((params = {}) => {
    // get the current grids width
    var gridWidth = document.getElementById("grid-wrapper")?.offsetWidth;
    // keep track of which columns to hide/show
    var columnsToShow = [];
    var columnsToHide = [];
    // iterate over all columns (visible or not) and work out
    // now many columns can fit (based on their minWidth)
    var totalColsWidth = 0;
    var allColumns = gridRef.current?.columnApi.getColumns();
    if (allColumns && allColumns.length > 0) {
      for (var i = 0; i < allColumns.length; i++) {
        var column = allColumns[i];
        totalColsWidth += column.getMinWidth() || 0;
        if (gridWidth !== undefined && totalColsWidth > gridWidth) {
          columnsToHide.push(column.getColId());
        } else {
          columnsToShow.push(column.getColId());
        }
      }
    }
    // show/hide columns based on current grid width
    gridRef.current?.columnApi.setColumnsVisible(columnsToShow, true);
    gridRef.current?.columnApi.setColumnsVisible(columnsToHide, false);
    // fill out any available space to ensure there are no gaps
    gridRef.current?.api.sizeColumnsToFit();
  }, []);

  function onGridReady(params: any) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    gridApiRef.current = params.api;
  }
  const onFilterTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (gridApi) {
      gridApiRef.current.setQuickFilter(e.target.value);
    }
  };

  const marketValueDates = selectedPlayer?.playerData?.marketValues?.map(
    (entry: { date: string }) => new Date(entry.date)
  );

  const marketValueList = selectedPlayer?.playerData?.marketValues.map(
    (entry) => entry.marketValue
  );

  const nextThreeMatches = getNextThreeMatches(teamMatches, selectedPlayer);

  return (
    <>
      {selectedPlayer && (
        <Modal
          open={open}
          onClose={handleClose}
          closeAfterTransition
          // sx={{ backgroundColor: "rgba(255, 255, 255, 0.8)", zIndex: 1 }}
          slots={{
            backdrop: Backdrop,
          }}
          slotProps={{
            backdrop: {
              timeout: 400,
            },
          }}
          className="flex justify-center items-center "
        >
          <Fade
            in={open}
            // timeout={{ enter: 100, exit: 100 }}
            // style={{ transitionDelay: open ? "0ms" : "0ms" }} // Adjust this value
          >
            <Card className=" w-[340px] h-fit p-4 transition-all absolute outline-none rounded-md flex flex-col justify-between ">
              <Card className="py-2 px-4 flex flex-col justify-start items-center rounded-md ">
                <div className="flex flex-row justify-center items-center mb-2">
                  <div className="text-xl font-bold uppercase text-center w-min 	whitespace-nowrap	 ">
                    {selectedPlayer.playerData.nickname}
                  </div>
                  <Separator orientation="vertical" className="mx-2 " />
                  <Image
                    src={`/teamLogos/${slugById(
                      selectedPlayer.playerData.teamID
                    )}.png`}
                    alt={selectedPlayer.playerData.teamName}
                    width={28}
                    height={28}
                    className="h-6 w-auto"
                  />
                </div>

                <div className="flex flex-col justify-between items-start h-full w-full">
                  <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-col justify-center items-start gap-y-1 text-sm">
                      <div className="flex flex-row justify-center items-center gap-x-2">
                        Puntos:{" "}
                        <div className="font-bold">
                          {selectedPlayer.playerData.points}
                        </div>
                      </div>
                      <div className="flex flex-row justify-center items-center gap-x-2">
                        Promedio:{" "}
                        <div className="font-bold">
                          {selectedPlayer.playerData.averagePoints.toFixed(2)}
                        </div>
                      </div>
                      <div className="flex flex-row justify-center items-center gap-x-2">
                        Precio:{" "}
                        <div className="font-bold">
                          {formatMoney(selectedPlayer.playerData.marketValue)}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-y-2 w-fit">
                      <div className="">
                        <Image
                          src={selectedPlayer.playerData.image}
                          alt={selectedPlayer.playerData.nickname}
                          width={64}
                          height={64}
                          className="h-16 w-auto "
                        />
                      </div>
                    </div>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex flex-row justify-between items-center w-full">
                    <div className="flex flex-row items-center gap-x-1">
                      {getWeeksTotalPointsFromStats(
                        selectedPlayer.playerData.playerID,
                        rowData,
                        6
                      ).map((point) => {
                        const match = teamMatches?.find(
                          (match) => match.week === point.week
                        );

                        return (
                          <div
                            className="flex flex-col justify-center items-center "
                            key={point.week}
                          >
                            <div className="flex flex-col justify-center items-center">
                              {match &&
                                match.localTeamID !==
                                  selectedPlayer.playerData.teamID && (
                                  <Image
                                    src={`/teamLogos/${slugById(
                                      match.localTeamID
                                    )}.png`}
                                    alt="opponent"
                                    width={20}
                                    height={20}
                                    style={{ objectFit: "contain" }}
                                    className="h-4 mb-1"
                                  />
                                )}

                              {match &&
                                match.visitorTeamID !==
                                  selectedPlayer.playerData.teamID && (
                                  <Image
                                    src={`/teamLogos/${slugById(
                                      match.visitorTeamID
                                    )}.png`}
                                    alt="opponent"
                                    width={20}
                                    height={20}
                                    style={{ objectFit: "contain" }}
                                    className="h-4 mb-1 "
                                  />
                                )}

                              <div
                                className={`text-center border-[0.5px] w-5 h-5 border-neutral-700 rounded-sm flex justify-center items-center ${getColor(
                                  point.points
                                )}`}
                              >
                                <p
                                  className={`text-[12px] items-center align-middle`}
                                >
                                  {point.points}
                                </p>
                              </div>
                              <div className="text-center text-[11px]">
                                J{point.week}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex flex-col">
                      <p className="text-center text-xs font-bold pb-1 uppercase">
                        Prox. Partidos
                      </p>
                      <div className="flex flex-row justify-center items-start gap-3">
                        {nextThreeMatches.map((match, index) => (
                          <div
                            key={index}
                            className="flex flex-col justify-start items-center "
                          >
                            {/* Display team logo for local team */}
                            {match.localTeamID !==
                              selectedPlayer.playerData.teamID && (
                              <Image
                                src={`/teamLogos/${slugById(
                                  match.localTeamID
                                )}.png`}
                                alt="opponent"
                                width={20}
                                height={20}
                                style={{ objectFit: "contain" }}
                                className="h-5 w-auto "
                              />
                            )}

                            {/* Display team logo for visitor team */}
                            {match.visitorTeamID !==
                              selectedPlayer.playerData.teamID && (
                              <Image
                                src={`/teamLogos/${slugById(
                                  match.visitorTeamID
                                )}.png`}
                                alt="opponent"
                                width={20}
                                height={20}
                                style={{ objectFit: "contain" }}
                                className="h-5 w-auto "
                              />
                            )}
                            <div className="">
                              {match.visitorTeamID !==
                              selectedPlayer.playerData.teamID ? (
                                <FlightIcon
                                  sx={{ fontSize: 18 }}
                                  className="rotate-45"
                                />
                              ) : (
                                <HomeIcon sx={{ fontSize: 18 }} />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              <Tabs defaultValue="table" className="grow w-full mx-auto">
                <TabsList className="flex flex-row justify-center items-center mt-2">
                  <TabsTrigger className="w-full" value="table">
                    Tabla
                  </TabsTrigger>
                  <TabsTrigger className="w-full" value="graph">
                    Grafica
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="table">
                  <Card className="h-[330px] pt-0 flex flex-col justify-between items-center rounded-md border-none shadow-none">
                    <Table className="m-auto w-auto mt-1">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="h-4 font-extrabold text-left w-[80px] text-xs">
                            Fecha
                          </TableHead>
                          <TableHead className="ml-2 flex flex-row justify-center items-center h-4 font-extrabold text-center text-xs">
                            <ChevronsDown
                              size={14}
                              className=" text-red-500 dark:text-red-400"
                            />
                            <ChevronsUp
                              size={14}
                              className="text-green-600 dark:text-green-400"
                            />
                          </TableHead>
                          <TableHead className="h-4 font-extrabold text-center text-xs">
                            %
                          </TableHead>
                          <TableHead className="h-4 font-extrabold text-right text-xs">
                            $ Actual
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {prepareValueChangesData(
                          selectedPlayer.playerData.playerID
                        ).map((change, index) => (
                          <TableRow key={index}>
                            <TableCell className="text-left py-1 text-xs tabular-nums tracking-tight w-fit whitespace-nowrap">
                              {formatDate(change.date)}
                            </TableCell>
                            <TableCell className="py-1 text-xs">
                              <div className="flex  flex-row items-center justify-end">
                                <div
                                  className={`font-bold tabular-nums tracking-tight 
                                          ${
                                            change.valueChange < 0
                                              ? "text-red-500 dark:text-red-400"
                                              : "text-green-600 dark:text-green-400"
                                          }`}
                                >
                                  {formatMoney(change.valueChange)}
                                </div>
                                {/* <div
                                                          className={`ml-2
                                          ${
                                            change.valueChange < 0
                                              ? "text-red-500 dark:text-red-400"
                                              : "text-green-600 dark:text-green-400"
                                          }`}
                            >
                              {change.valueChange < 0 ? (
                                <ChevronsDown size={14} />
                              ) : (
                                <ChevronsUp size={14} />
                              )}
                            </div> */}
                              </div>
                            </TableCell>
                            <TableCell className="py-1  ">
                              <div
                                className={`text-[11px] mr-2 font-semibold ml-2 tabular-nums tracking-tight text-right ${
                                  change.percentageChange < 0
                                    ? "text-red-500 dark:text-red-400"
                                    : "text-green-600 dark:text-green-400"
                                }`}
                              >
                                {change.percentageChange !== undefined
                                  ? `${change.percentageChange.toFixed(2)}%`
                                  : ""}
                              </div>
                            </TableCell>
                            <TableCell className="py-1 text-right text-xs  tabular-nums tracking-tighter	">
                              {formatMoney(change.newValue)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <CardFooter className="pt-2 pb-0 text-xs  font-extralight">
                      Cambios de Valor (Ultimos 30 Dias)
                    </CardFooter>
                  </Card>{" "}
                </TabsContent>
                <TabsContent value="graph" className="h-fit ">
                  <Card className="h-[330px] w-full pt-0 flex flex-col justify-start gap-4 items-center rounded-md border-none shadow-none">
                    <ValueChart fetchedPlayer={selectedPlayer.playerData} />
                    <div className="flex flex-col gap-4">
                      <div className="text-center">
                        <p className="text-center text-sm">Valor minimo:</p>
                        <span className="font-bold">
                          {marketValueList &&
                            Math.min(...marketValueList).toLocaleString(
                              "es-ES",
                              {
                                style: "currency",
                                currency: "EUR",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              }
                            )}
                        </span>{" "}
                        <span className="text-xs text-gray-500 capitalize">
                          {marketValueList && marketValueDates
                            ? `(${new Date(
                                marketValueDates[
                                  marketValueList.indexOf(
                                    Math.min(...marketValueList)
                                  )
                                ]
                              ).toLocaleDateString("es-EU", {
                                month: "short",
                                day: "numeric",
                              })})`
                            : "(N/A)"}
                        </span>
                      </div>

                      <div className="text-center">
                        <p className="text-center text-sm">Valor maximo:</p>
                        <span className="font-bold ">
                          {marketValueList &&
                            Math.max(...marketValueList).toLocaleString(
                              "es-ES",
                              {
                                style: "currency",
                                currency: "EUR",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              }
                            )}
                        </span>{" "}
                        <span className="text-xs text-gray-500 capitalize">
                          {marketValueList && marketValueDates
                            ? `(${new Date(
                                marketValueDates[
                                  marketValueList.indexOf(
                                    Math.max(...marketValueList)
                                  )
                                ]
                              ).toLocaleDateString("es-EU", {
                                month: "short",
                                day: "numeric",
                              })})`
                            : "(N/A)"}
                        </span>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </Card>
          </Fade>
        </Modal>
      )}
      <Paper
        elevation={4}
        id="grid-wrapper"
        className={
          "h-auto flex flex-col justify-start items-center transition-all"
        }
      >
        {/* Search Bar */}
        <Box className="flex flex-row justify-between items-center w-full h-16 px-3">
          <span className="flex justify-center items-center md:text-lg font-semibold mr-2 w-full text-center">
            <ChevronsDown
              size={24}
              className="text-red-500 dark:text-red-400 mr-2"
            />{" "}
            Ultimas Bajadas
          </span>
          <div className="relative w-full flex flex-row justify-center items-center">
            <Search className="absolute h-4 w-4 top-[10px] left-4 text-muted-foreground" />
            <Input
              type="search"
              onChange={onFilterTextChange}
              placeholder="Buscar..."
              className="pl-10 outline-none text-md
              dark:bg-neutral-200 dark:placeholder-neutral-800 
              dark:text-neutral-800
        "
            />
          </div>
        </Box>

        <div id="myGrid" className={`ag-theme-balham w-full  transition-all`}>
          <AgGridReact
            rowData={rowData}
            // @ ts-ignore
            columnDefs={columnDefs}
            onGridReady={onGridReady}
            ref={gridRef}
            domLayout={"autoHeight"}
            pagination={true}
            animateRows={true}
            defaultColDef={defaultColDef}
            paginationPageSize={24}
            onFirstDataRendered={onFirstDataRendered}
            onGridSizeChanged={onGridSizeChanged}
            suppressCellFocus={true}
            suppressMovableColumns={true}
            onRowClicked={(event) => {
              setSelectedPlayer(event.data);
              handlePlayerSelection(event.data);
            }}
          ></AgGridReact>
        </div>
      </Paper>
    </>
  );
};
//cjamgeeeeeee
export default NewMarketUp;

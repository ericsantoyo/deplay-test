<Table className="m-auto w-auto mt-4">
<TableHeader>
  <TableRow>
    <TableHead className="h-2 font-extrabold text-left w-[100px] text-xs">
      Fecha
    </TableHead>
    <TableHead className="h-2 font-extrabold text-center text-xs">
      $ Cambio
    </TableHead>
    <TableHead className="h-2 font-extrabold text-right text-xs">
      $ Actual
    </TableHead>
    {/* <TableHead className="h-2 font-extrabold text-center text-xs">
      %
    </TableHead> */}
  </TableRow>
</TableHeader>
<TableBody>
  {prepareValueChangesData(
    selectedPlayer.playerData.playerID
  ).map((change, index) => (
    <TableRow key={index}>
      <TableCell className="text-left py-[4px]  text-xs">
        {formatDate(change.date)}
      </TableCell>
      <TableCell
        className={`py-[4px] flex flex-row justify-end items-center text-xs`}
      >
        <div
          className={`flex justify-center items-center h-full font-bold
                      ${
                      change.valueChange < 0
                      ? "text-red-500 dark:text-red-400 h-full"
                      : "text-green-600 dark:text-green-400 h-full"
                      }`}
                              >
                                {formatMoney(change.valueChange)}
                              </div>
                              <div
                                className={`flex justify-center items-center h-full ml-2
                      ${
                      change.valueChange < 0
                      ? "text-red-500 dark:text-red-400 "
                      : "text-green-600 dark:text-green-400"
                      }`}
        >
          {change.valueChange < 0 ? (
            <ChevronsDown size={14} />
          ) : (
            <ChevronsUp size={14} />
          )}
        </div>
        
      </TableCell>
      <TableCell className="py-[4px] text-right text-xs">
        {formatMoney(change.newValue)}
      </TableCell>
      {/* <TableCell
        className={`py-[4px] flex flex-row justify-end items-center text-xs`}
      >
        
        <div
          className={`flex justify-center items-center h-full text-xs ml-2 ${
            change.percentageChange < 0
              ? "text-red-500 dark:text-red-400 h-full"
              : "text-green-600 dark:text-green-400 h-full"
          }`}
        >
          {change.percentageChange.toFixed(2)}%
        </div>
      </TableCell> */}
    </TableRow>
  ))}
</TableBody>
</Table>
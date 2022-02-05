import React, { useState, useEffect } from "react";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";


import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";

import DeselectIcon from "@mui/icons-material/Deselect";


const FilterTable = ({ filter, setSelected, selected }) => {
  const handleCheckboxClick = (filterItem) => {
    setSelected(filterItem);
  };

  const onSelectNoneClick = () => {
    setSelected({});
  };

  return (
    <TableContainer>
      <Table>
        <TableHead sx={{ borderBottom: "2px solid #6f6f6f" }}>
          <TableRow>
            <TableCell padding="checkbox">
              <Tooltip title="Désélectionner">
                <IconButton onClick={onSelectNoneClick}>
                  <DeselectIcon />
                </IconButton>
              </Tooltip>
            </TableCell>
            <TableCell>
              <TableSortLabel>Nom</TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filter.map((filterItem) => (
            <TableRow key={filterItem.id}>
              <TableCell padding="checkbox">
                <Checkbox
                  onClick={() => handleCheckboxClick(filterItem)}
                  sx={{
                    "&.MuiCheckbox-root .MuiSvgIcon-root": {
                      fill: "#afafaf",
                    },
                  }}
                  checked={selected.id === filterItem.id}
                  inputProps={{ "aria-labelledby": filterItem.id }}
                />
              </TableCell>
              <TableCell id={filterItem.id}>{filterItem.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FilterTable;

import React from "react";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";

const headCells = [
  {
    id: "name",
    numeric: false,
    label: "Nom",
  },
  {
    id: "description",
    numeric: false,
    label: "Description",
  },
  {
    id: "price",
    numeric: true,
    label: "Prix",
  },
  {
    id: "category",
    numeric: false,
    label: "Catégorie",
  },
  {
    id: "collection",
    numeric: false,
    label: "Collection",
  },
  {
    id: "createdAt",
    numeric: false,
    label: "Créé le",
  },
  {
    id: "quantityInStock",
    numeric: true,
    label: "En stock",
  },
];

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const TableHeadWithSorting = ({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
}) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            sx={{ "&.MuiCheckbox-root .MuiSvgIcon-root": { fill: "#afafaf" } }}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "Sélectionner tous les produits" }}
          />
        </TableCell>
        <TableCell> </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            className="text-nowrap"
            key={headCell.id}
            align="center"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeadWithSorting;

import React, { useState } from "react";

import getComparator from "../../customMaterials/Comparator";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import TableHeadWithSorting from "./ProductTableHead";
import CollapsibleRow from "./ProductCollapsibleRow";

const ProductTable = ({
  setSelected,
  selected,
  products,
  productsToDisplay,
}) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("createdAt");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = products.map((product) => product.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleCheckboxClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productsToDisplay.length) : 0;

  return (
    <>
      <TableContainer>
        <Table>
          <TableHeadWithSorting
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={productsToDisplay.length}
          />
          <TableBody>
            {productsToDisplay
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .sort(getComparator(order, orderBy))
              .map((product, index) => {
                return (
                  <CollapsibleRow
                    key={product.id}
                    product={product}
                    isItemSelected={isSelected(product.id)}
                    labelId={`enhanced-table-checkbox-${index}`}
                    handleCheckboxClick={(event) =>
                      handleCheckboxClick(event, product.id)
                    }
                  />
                );
              })}
            {emptyRows > 0 && (
              <TableRow
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{".MuiTablePagination-selectLabel": {marginTop: ".9rem"}, ".MuiTablePagination-displayedRows": {marginTop: "1rem"}}}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={productsToDisplay.length}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage={<span>Lignes:</span>}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default ProductTable;

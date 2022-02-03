import React, { useState} from "react";

import getComparator from "../../customMaterials/Comparator";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

import TableHeadWithSorting from "./ProductTableHead";
import CollapsibleRow from "./ProductCollapsibleRow";

const ProductTable = ({ setSelected, selected, products, productsToDisplay }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

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

  return (
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
            .slice()
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
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;

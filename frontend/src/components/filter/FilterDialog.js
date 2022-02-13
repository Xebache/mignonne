import React from "react";

import Box from "@mui/material/Box";
import { LeftSlidingDialog } from "../customMaterials/Dialog";

import CategoryFilter from "./categories/CategoryFilter";
import CollectionFilter from "./collections/CollectionFilter";
import PriceFilter from "./PriceFilter";
import NumProducts from "./NumProducts";

const FilterDialog = ({ filter, setFilter, productsToDisplay, open, close }) => {
  return (
    <LeftSlidingDialog
      open={open ? open : false}
      onClose={close}
      closeDialog={close}
    >
      <Box margin={"1rem"}>
        <CategoryFilter filter={filter} setFilter={setFilter} />
        <CollectionFilter filter={filter} setFilter={setFilter} />
        <PriceFilter filter={filter} setFilter={setFilter} />
        <NumProducts productsToDisplay={productsToDisplay} />
      </Box>
    </LeftSlidingDialog>
  );
};

export default FilterDialog;

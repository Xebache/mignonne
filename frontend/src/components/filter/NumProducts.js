import React from "react";

import Box from "@mui/material/Box";

import { BlackCard } from "../customMaterials/Card";

const NumProducts = ({ productsToDisplay }) => {
  return (
    <Box position={"absolute"} bottom={"2vh"} width={"90%"}>
      <BlackCard style={{ height: "7.5rem", width: "40%", padding: "0" }}>
        <Box
          height={"7.5rem"}
          width={"100%"}
          display={"inline-flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <h3 style={{ fontSize: "3.5rem", fontWeight: "200" }}>
            X {productsToDisplay.length}
          </h3>
        </Box>
      </BlackCard>
    </Box>
  );
};

export default NumProducts;

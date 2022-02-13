import React from "react";

import Box from "@mui/material/Box";

const CartTitle = ({ items }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      marginBottom={"-1em"}
      marginTop={"-1em"}
      fontSize={"1rem"}
      fontWeight={"200"}
      width={"100%"}
    >
      <Box textAlign={"right"} marginBottom={"1em"} width={"55%"}>
        {items.length} {items.length > 1 ? "articles" : "article"}
      </Box>
      <Box textAlign={"right"} marginBottom={"1em"} width={"45%"}>
        {items.reduce((acc, item) => acc + Number(item.price), 0)}
        {" €"}
      </Box>
    </Box>
  );
};

export default CartTitle;

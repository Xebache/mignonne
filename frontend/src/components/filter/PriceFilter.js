import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Slider from "../customMaterials/slider/Slider";

const PriceFilter = ({ filter, setFilter }) => {
  const [range, setRange] = useState([]);

  useEffect(() => {
    if (range.length > 0)
      setFilter({
        ...filter,
        range: { min: parseInt(range[0]), max: parseInt(range[1]) },
      });
  }, [range]);

  return (
    <Box>
      <Box
        border={"1px solid #6f6f6f"}
        borderRadius={"3px"}
        height={"4rem"}
        width={"25%"}
        display={"inline-flex"}
        justifyContent={"center"}
        alignItems={"center"}
        position={"relative"}
        top={"2rem"}
      >
        <h2
          style={{
            fontWeight: "300",
            fontSize: "1rem",
          }}
        >
          Prix
        </h2>
      </Box>
      <Slider min={65} max={75} setRange={(e) => setRange(e)} />
    </Box>
  );
};

export default PriceFilter;

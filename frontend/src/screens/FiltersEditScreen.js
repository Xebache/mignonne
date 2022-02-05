import React from "react";

import Box from "@mui/material/Box";

import CategoryCard from "../components/filter/categories/CategoryCard";
import CollectionCard from "../components/filter/collections/CollectionCard";
import ColorCard from "../components/filter/colors/ColorCard";
import MoodCard from "../components/filter/mood/MoodCard";

const FiltersEditScreen = () => {
  return (
    <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"} marginLeft={"2rem"} marginRight={"2rem"}>
      <CategoryCard />
      <CollectionCard />
      <ColorCard />
      <MoodCard />
    </Box>
  );
};

export default FiltersEditScreen;

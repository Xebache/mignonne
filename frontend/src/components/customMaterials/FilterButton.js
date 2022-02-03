import React from "react";

import ListItemButton from "@mui/material/ListItemButton";

const FilterButton = ({ item, handleClick, selected }) => {
  return (
    <ListItemButton
      sx={{
        border: "1px solid #6f6f6f",
        borderRadius: "5px",
        display: "inline-block",
        margin: ".5rem",
        "&.Mui-selected": { background: "#cfcfcf" },
      }}
      selected={selected}
      onClick={handleClick(item.name)}
    >
      {item.name}
    </ListItemButton>
  );
};

export default FilterButton;

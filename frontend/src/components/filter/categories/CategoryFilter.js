import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { listCategories } from "../../../actions/filterActions";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";

const CategoryFilter = ({ filter, setFilter }) => {
  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  useEffect(() => {
    if(categories.length === 0) dispatch(listCategories());
  }, []);

  const handleCategoryClick = (category) => {
    if (filter.categories.includes(category))
      setFilter({
        ...filter,
        categories: filter.categories.filter((c) => c !== category),
      });
    else
      setFilter({
        ...filter,
        categories: [...filter.categories, category],
      });
  };

  return (
    <Box marginBottom={"2rem"}>
      <h2
        style={{
          fontWeight: "300",
          fontSize: "1rem",
          marginTop: ".5rem",
        }}
      >
        Catégories
      </h2>
      <List>
        {categories.map((category) => (
          <ListItemButton
            sx={{
              border: "1px solid #6f6f6f",
              borderRadius: "5px",
              display: "inline-block",
              margin: ".5rem",
              "&.Mui-selected": { background: "#cfcfcf" },
            }}
            key={category.id}
            selected={filter.categories.includes(category)}
            onClick={() => handleCategoryClick(category)}
          >
            {category.name}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default CategoryFilter;

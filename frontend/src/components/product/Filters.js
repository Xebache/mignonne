import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { listCategories, listCollections } from "../../actions/filterActions";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";

const Filters = ({ filter, setFilter }) => {
  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const collectionList = useSelector((state) => state.collectionList);
  const { collections } = collectionList;

  useEffect(() => {
    dispatch(listCategories());
    dispatch(listCollections());
  }, []);

  const handleCategoryClick = (category) => {
    if (filter.categories.includes(category))
      setFilter({
        ...filter,
        categories: filter.categories.filter((c) => c != category),
      });
    else
      setFilter({
        ...filter,
        categories: [...filter.categories, category],
      });
  };

  const handleCollectionClick = (collection) => {
    if (filter.collections.includes(collection))
      setFilter({
        ...filter,
        collections: filter.collections.filter((c) => c != collection),
      });
    else
      setFilter({
        ...filter,
        collections: [...filter.collections, collection],
      });
  };

  return (
    <Box margin={"1rem"}>
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
              selected={filter.categories.includes(category.name)}
              onClick={() => handleCategoryClick(category.name)}
            >
              {category.name}
            </ListItemButton>
          ))}
        </List>
      </Box>
      <Box marginBottom={"1rem"}>
        <h2
          style={{
            fontWeight: "300",
            fontSize: "1rem",
            marginTop: ".5rem",
          }}
        >
          Collections
        </h2>
        <List>
          {collections.map((collection) => (
            <ListItemButton
              sx={{
                border: "1px solid #6f6f6f",
                borderRadius: "5px",
                display: "inline-block",
                margin: ".5rem",
                "&.Mui-selected": { background: "#cfcfcf" },
              }}
              key={collection.id}
              selected={filter.collections.includes(collection.name)}
              onClick={() => handleCollectionClick(collection.name)}
            >
              {collection.name}
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Filters;

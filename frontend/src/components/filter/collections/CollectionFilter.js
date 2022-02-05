import React, {useEffect} from "react";

import { useDispatch, useSelector } from "react-redux";
import { listCollections } from "../../../actions/filterActions";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";

const CollectionFilter = ({ filter, setFilter }) => {
  const dispatch = useDispatch();

  const collectionList = useSelector((state) => state.collectionList);
  const { collections } = collectionList;

  useEffect(() => {
    if(collections.length === 0) dispatch(listCollections());
  }, []);

  const handleCollectionClick = (collection) => {
    if (filter.collections.includes(collection))
      setFilter({
        ...filter,
        collections: filter.collections.filter((c) => c !== collection),
      });
    else
      setFilter({
        ...filter,
        collections: [...filter.collections, collection],
      });
  };

  return (
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
            selected={filter.collections.includes(collection)}
            onClick={() => handleCollectionClick(collection)}
          >
            {collection.name}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default CollectionFilter;

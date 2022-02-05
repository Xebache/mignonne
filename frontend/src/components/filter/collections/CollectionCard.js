import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { listCollections, updateCollection, createCollection } from "../../../actions/filterActions";

import { BlackCard } from "../../customMaterials/Card";

import FilterToolBar from "../FilterToolBar";
import FilterTable from "../FilterTable";

const CollectionCard = () => {
  const [selected, setSelected] = useState({});

  const dispatch = useDispatch();

  const collectionList = useSelector((state) => state.collectionList);
  const { collections } = collectionList;

  const collectionUpdate = useSelector((state) => state.collectionUpdate);
  const { success: successUpdate } = collectionUpdate;

  const collectionCreate = useSelector((state) => state.collectionCreate);
  const { success: successCreate } = collectionCreate;

  useEffect(() => {
    if (collections.length === 0) dispatch(listCollections());
  }, []);

  const onDeleteClick = () => {
    console.log(selected && selected.name);
  };

  const submitHandler = (data, resetForm) => {
    selected && selected.name
      ? dispatch(updateCollection(data))
      : dispatch(createCollection(data));
    resetForm();
    setSelected({})
  };

  useEffect(() => {
    dispatch(listCollections());
  }, [successUpdate, successCreate]);

  return (
      <BlackCard style={{ width: "27rem", margin: ".5rem" }} >
        <h2
          className="mb-4"
          style={{ fontWeight: "200", fontSize: "1.5rem", textAlign: "center" }}
        >
          Collections
        </h2>
        <FilterToolBar selected={selected} onDeleteClick={onDeleteClick} submitHandler={submitHandler}/>
        <FilterTable filter={collections} selected={selected} setSelected={setSelected}/>
      </BlackCard>
  );
};

export default CollectionCard;
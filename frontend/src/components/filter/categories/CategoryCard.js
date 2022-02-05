import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  listCategories,
  updateCategory,
  createCategory,
} from "../../../actions/filterActions";

import Container from "react-bootstrap/Container";

import { BlackCard } from "../../customMaterials/Card";

import FilterToolBar from "../FilterToolBar";
import FilterTable from "../FilterTable";

const CategoryCard = () => {
  const [selected, setSelected] = useState({});

  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const { success: successUpdate } = categoryUpdate;

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { success: successCreate } = categoryCreate;

  useEffect(() => {
    if (categories.length === 0) dispatch(listCategories());
  }, []);

  const onDeleteClick = () => {
    console.log(selected && selected.name);
  };

  const submitHandler = (data, resetForm) => {
    selected && selected.name
      ? dispatch(updateCategory(data))
      : dispatch(createCategory(data));
    resetForm();
    setSelected({})
  };

  useEffect(() => {
    dispatch(listCategories());
  }, [successUpdate, successCreate]);

  return (

      <BlackCard style={{ width: "27rem", margin: ".5rem" }} >
        <h2
          className="mb-4"
          style={{ fontWeight: "200", fontSize: "1.5rem", textAlign: "center" }}
        >
          Catégories
        </h2>
        <FilterToolBar
          selected={selected}
          onDeleteClick={onDeleteClick}
          submitHandler={submitHandler}
        />
        <FilterTable
          filter={categories}
          selected={selected}
          setSelected={setSelected}
        />
      </BlackCard>

  );
};

export default CategoryCard;

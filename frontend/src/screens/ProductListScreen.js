import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { listProducts, deleteProduct } from "../actions/productActions";

import applyFilters from "../components/filter/FilterMethods";

import Container from "react-bootstrap/Container";

import Message from "../components/customMaterials/Message";
import Loader from "../components/customMaterials/Loader";

import ProductTable from "../components/product/productTable/ProductTable";
import ProductToolBar from "../components/product/ProductToolBar";

const ProductListScreen = () => {
  const [selected, setSelected] = useState([]);
  const [filter, setFilter] = useState({
    categories: [],
    collections: [],
    range: {},
  });
  const [productsToDisplay, setProductsToDisplay] = useState([]);

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { error: errorDelete, loading: loadingDelete, success: successDelete } = productDelete;

  useEffect(() => {
    setProductsToDisplay(products);
    if (products.length > 0) {
      const max = Math.max(...products.map((product) => product.price));
      const min = Math.min(...products.map((product) => product.price));
      setFilter({ ...filter, range: { min: min, max: max } });
    }
    setSelected([]);
  }, [products]);

  useEffect(() => {
    setProductsToDisplay(applyFilters(products, filter));
  }, [filter, products]);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch, successDelete]);

  const handleDeleteClick = () => {
    if (window.confirm("Voulez-vous supprimer ces produits ?")) {
      selected.map((id) => dispatch(deleteProduct(id)));
    }
  };

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <ProductToolBar
            selected={selected}
            filter={filter}
            setFilter={setFilter}
            productsToDisplay={productsToDisplay}
            handleDeleteClick={handleDeleteClick}
          />
          <ProductTable 
            setSelected={setSelected}
            selected={selected}
            products={products}
            productsToDisplay={productsToDisplay}
          />
        </>
      )}
    </Container>
  );
};

export default ProductListScreen;

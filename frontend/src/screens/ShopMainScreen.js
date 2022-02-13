import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { ButtonOutlinedDark } from "../components/customMaterials/Button";

import applyFilters from "../components/filter/FilterUtils";

import Message from "../components/customMaterials/Message";
import Loader from "../components/customMaterials/Loader";
import Product from "../components/product/Product";
import FilterDialog from "../components/filter/FilterDialog";

const ShopMainScreen = () => {
  const [filter, setFilter] = useState({
    categories: [],
    collections: [],
    range: {},
  });
  const [productsToDisplay, setProductsToDisplay] = useState([]);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  const initPriceFilter = () => {
    console.log("hello");
    if (products.length > 0) {
      const max = Math.max(...products.map((product) => product.price));
      const min = Math.min(...products.map((product) => product.price));
      setFilter({ ...filter, range: { min: min, max: max } });
    }
  };

  useEffect(() => {
    if (products.length === 0) dispatch(listProducts());
  }, []);

  useEffect(() => {
    setProductsToDisplay(products);
    initPriceFilter();
  }, [products]);

  useEffect(() => {
    setProductsToDisplay(applyFilters(products, filter));
  }, [filter, products]);

  return (
    <>
      <Container
        disableGutters={true}
        maxWidth="lg"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        {productsToDisplay.map((product) => (
          <Box key={product.id} paddingLeft={".5em"} paddingRight={".5em"}>
            <Product product={product} />
          </Box>
        ))}
      </Container>
      <Box position={"fixed"} left={"2em"} bottom={"2em"}>
        <ButtonOutlinedDark onClick={() => setOpen(true)}>
          Tous les filtres
        </ButtonOutlinedDark>
        <FilterDialog
          filter={filter}
          setFilter={setFilter}
          productsToDisplay={productsToDisplay}
          open={open}
          close={() => setOpen(false)}
        />
      </Box>
    </>
  );
};

export default ShopMainScreen;

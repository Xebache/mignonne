import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { listProductDetails } from "../actions/productActions";
import { PRODUCT_DETAILS_RESET } from "../constants/productConstants";

import Container from "react-bootstrap/Container";

import ProductForm from "../components/product/ProductForm";

function ProductEditScreen() {
  const productId = useParams().id;

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;


  useEffect(() => {
    dispatch({ type: PRODUCT_DETAILS_RESET })
    if(productId) dispatch(listProductDetails(productId));
  }, [dispatch, productId]);

  return (
    <Container>
      <ProductForm product={ product }/>
    </Container>
  );
}

export default ProductEditScreen;

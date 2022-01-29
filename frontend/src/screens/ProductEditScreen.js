import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { listProductDetails } from "../actions/productActions";

import Container from "react-bootstrap/Container";

import ProductForm from "../components/product/ProductForm";

function ProductEditScreen() {
  const productId = useParams().id;

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(productId));
  }, [dispatch, productId]);

  return (
    <Container>
      <ProductForm product={ product }/>
    </Container>
  );
}

export default ProductEditScreen;

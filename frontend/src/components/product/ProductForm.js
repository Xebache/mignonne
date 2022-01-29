import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { listCategories, listCollections } from "../../actions/filterActions";
import { createProduct } from "../../actions/productActions";

import Col from "react-bootstrap/Col";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";
import { BlackCard } from "../customMaterials/Card";
import { MyTextField } from "../customMaterials/Inputs";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { Formik, Form } from "formik";
import * as Yup from "yup";

const ProductForm = ({ product }) => {
  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const collectionList = useSelector((state) => state.collectionList);
  const { collections } = collectionList;

  useEffect(() => {
    dispatch(listCategories());
    dispatch(listCollections());
  }, []);

  const submitHandler = (data, resetForm) => {
    dispatch(createProduct(data));
    resetForm();
  };

  return (
    <BlackCard>
      <Formik
        initialValues={{
          name: product && product.name ? product.name : "",
          description: product && product.description ? product.description : "",
          price: product && product.price ? product.price : "",
          quantityInStock: product && product.quantityInStock ? product.quantityInStock : "",
          category: null,
          collection: null,
        }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          submitHandler(values, actions.resetForm);
        }}
        enableReinitialize={true}
      >
        {({ values, touched, errors, handleBlur, handleChange, isSubmitting, setFieldValue }) => (
          <Form>
            <CardContent>
              <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"}>
                <Col xs={12} md={6}>
                  Images
                </Col>
                <Col xs={12} md={6}>
                  <MyTextField
                    className="w-100"
                    name="name"
                    id="name"
                    label="Nom"
                    value={values.name}
                    type="text"
                    helperText={errors.name && touched.name ? errors.name : " "}
                    error={errors.name && touched.name ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <MyTextField
                    multiline
                    rows={4}
                    className="w-100"
                    name="description"
                    id="description"
                    label="Description"
                    value={values.description}
                    type="text"
                    helperText={ errors.description && touched.description ? errors.description : " " }
                    error={ errors.description && touched.description ? true : false }
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Box
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                  >
                    <MyTextField
                      name="price"
                      id="price"
                      label="Prix"
                      value={values.price}
                      type="number"
                      step="any"
                      helperText={ errors.price && touched.price ? errors.price : " " }
                      error={errors.price && touched.price ? true : false}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <MyTextField
                      name="quantityInStock"
                      id="quantityInStock"
                      label="En stock"
                      value={values.quantityInStock}
                      type="number"
                      helperText={ errors.quantityInStock && touched.quantityInStock ? errors.quantityInStock : " " }
                      error={ errors.quantityInStock && touched.quantityInStock ? true : false }
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Box>
                </Col>
              </Box>
              <Divider variant="middle" />
              <Box mt={3} display={"flex"} flexDirection={"row"} flexWrap={"wrap"}>
                <Autocomplete
                  onChange={(e, value) => {setFieldValue("category", value.id); console.log(values)}}
                  id="category"
                  options={categories}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{ width: "10rem" }}
                      label="Catégorie"
                      value={values.category}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                      }}
                    />
                  )}
                />
                <Autocomplete
                  onChange={(e, value) => {setFieldValue("collection", value.id); console.log(values) }}
                  id="collection"
                  options={collections}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{ width: "10rem" }}
                      label="Collection"
                      value={values.collection}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                      }}
                    />
                  )}
                />
              </Box>
            </CardContent>
            <CardActions>
              <Button
                type="submit"
                variant="outlined"
                sx={{ "&.MuiButton-outlined": { color: "#bc9105", borderColor: "#bc9105", fontWeight: "400" } }}
                disabled={isSubmitting}
              >
                Valider
              </Button>
            </CardActions>
          </Form>
        )}
      </Formik>
    </BlackCard>
  );
};

export default ProductForm;

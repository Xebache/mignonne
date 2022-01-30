import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { listCategories, listCollections } from "../../actions/filterActions";
import { createProduct } from "../../actions/productActions";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";

import Radio from "@mui/material/Radio";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import TextField from '@mui/material/TextField';
import Divider from "@mui/material/Divider";
import { BlackCard } from "../customMaterials/Card";
import { MyTextField } from "../customMaterials/Inputs";
import { CloseIcon } from "../customMaterials/Icons";
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
    // dispatch(createProduct(data));
    // resetForm();
    console.log(data);
    console.log();
  };

  const handleUpload = (e) => {
    console.log("uploading...")
  }

  return (
    <BlackCard>
      <Formik
        initialValues={{
          name: product && product.name ? product.name : "",
          description:
            product && product.description ? product.description : "",
          price: product && product.price ? product.price : "",
          quantityInStock:
            product && product.quantityInStock ? product.quantityInStock : "",
          category: null,
          collection: null,
          images: product && product.images ? product.images : [],
        }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          submitHandler(values, actions.resetForm);
        }}
        enableReinitialize={true}
      >
        {({ values, touched, errors, handleBlur, handleChange, isSubmitting, setFieldValue }) => (
          <Form>
            <CardContent
              sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
            >
              <Col xs={12} md={6} className="d-flex flex-row flex-wrap px-2">
                {values.images.map((image, index) => {
                  const name = `images[${index}].isMain`;
                  return (
                    <Box
                      key={index}
                      display={"flex"}
                      flexDirection={"column"}
                      order={image.isMain ? -1 : ""}
                      width={image.isMain ? "100%" : "20%"}
                      border={"1px solid #afafaf"}
                      borderRadius={"5px"}
                      padding={"1rem"}
                      margin={".5rem"}
                      maxHeight={image.isMain ? "100%" : "10rem"}
                    >
                      <Box
                        textAlign={"right"}
                        marginRight={"-.7rem"}
                        marginTop={"-.7rem"}
                      >
                        <IconButton
                          onClick={() =>
                            setFieldValue("images", values.images.filter((image) => image !== values.images[index]))
                          }
                        >
                          <CloseIcon />
                        </IconButton>
                      </Box>
                      <Image
                        src={image.path}
                        alt={"image"}
                        style={{ maxHeight: image.isMain ? "20rem" : "auto", minHeight: image.isMain ? "auto" : "5rem", width: image.isMain ? "auto" : "5rem", objectFit: "cover" }}
                        fluid
                      />
                      <Checkbox
                        sx={{ "&.MuiCheckbox-root .MuiSvgIcon-root": { fill: "#afafaf" } }}
                        name={name}
                        checked={values.images[index].isMain}
                        onChange={() => { 
                          values.images.map((img, idx) => (img.isMain = idx === index ? true : false));
                          setFieldValue("images[index].isMain", true);
                        }}
                      />
                    </Box>
                  );
                })}
                <TextField
                  variant="outlined"
                  label=""
                  className="w-100 mt-2"
                  style={{marginLeft: ".4rem"}}
                  type="file"
                  onChange={(e) => handleUpload(e)}
                />
              </Col>
              <Col xs={12} md={6} className="mt-2">
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
                  rows={5}
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
                    style={{ marginRight: "1rem" }}
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
                    label="Quantité"
                    value={values.quantityInStock}
                    type="number"
                    helperText={ errors.quantityInStock && touched.quantityInStock ? errors.quantityInStock : " " }
                    error={ errors.quantityInStock && touched.quantityInStock ? true : false }
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Box>
                <Divider variant="middle" />
                <Box
                  mt={3}
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  flexWrap={"wrap"}
                >
                  <Autocomplete
                    onChange={(e, value) => { setFieldValue("category", value.id) }}
                    id="category"
                    options={categories}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{ width: "10rem", marginRight: "1rem", marginBottom: "1rem" }}
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
                    onChange={(e, value) => { setFieldValue("collection", value.id) }}
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
              </Col>
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

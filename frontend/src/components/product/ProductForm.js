import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { listCategories, listCollections } from "../../actions/filterActions";
import { createProduct, updateProduct, uploadProductImage, deleteProductImage } from "../../actions/productActions";

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
import Tooltip from "@mui/material/Tooltip";
import { BlackCard } from "../customMaterials/Card";
import { MyTextField } from "../customMaterials/Inputs";
import { CloseIcon } from "../customMaterials/Icons";
import Autocomplete from "@mui/material/Autocomplete";

import Loader from "../customMaterials/Loader";

import { Formik, Form } from "formik";
import * as Yup from "yup";

const ProductForm = ({ product }) => {
  const[productValues, setProductValues] = useState({
    name: "", 
    description: "", 
    price: "", 
    quantityInStock: "", 
    category: {}, 
    collection: {}, 
    images: []
  });

  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const collectionList = useSelector((state) => state.collectionList);
  const { collections } = collectionList;

  const productUploadImage = useSelector((state) => state.productUploadImage);
  const { loading, success, image: uploadedImage } = productUploadImage;

  useEffect(()=> {
    if(product) setProductValues({...product})
    else setProductValues({
      name: "", 
      description: "", 
      price: "", 
      quantityInStock: "", 
      category: {}, 
      collection: {}, 
      images: []
    })
  }, [product])

  useEffect(() => {
    dispatch(listCategories());
    dispatch(listCollections());
  }, []);

  useEffect(() => {
    if(success){
      console.log("uploaded")
      setProductValues({...productValues, images:[ ...productValues.images, uploadedImage]});
    }
  }, [success]);

  useEffect(() => {
    console.log([productValues.name])
    console.log(productValues)
  }, [productValues])

  const submitHandler = (data, resetForm) => {
    console.log(productValues);
    // if(product) dispatch(updateProduct(productValues));
    // else dispatch(createProduct(productValues));
    // resetForm();
  };

  const uploadImageHandler = (e) => {
    if(product){
      const formData = new FormData();
      formData.append("product_id", product.id);
      formData.append("image", e.target.files[0]);
      dispatch(uploadProductImage(formData));
    }
  }

  function validateString(value) {
    let error;
    if (!value) error = 'Champ requis';
    return error;
  }

  return (
    <BlackCard>
      <Formik
        // initialValues={ productValues }
        initialValues={{
          [productValues.name]: productValues.name
        }}
        //   {
        //   name: product && product.name ? product.name : "",
        //   description:
        //     product && product.description ? product.description : "",
        //   price: product && product.price ? product.price : "",
        //   quantityInStock:
        //     product && product.quantityInStock ? product.quantityInStock : "",
        //   category: null,
        //   collection: null,
        //   images: product && product.images ? product.images : [],
        // }
      // }
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Champ requis"),
          description: Yup.string().required("Champ requis"),
          price: Yup.number().required("Champ requis"),
          quantityInStock: Yup.number().required("Champ requis"),
          file: Yup.mixed().required("Champ requis"),

        })}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          submitHandler(actions.resetForm);
        }}
        enableReinitialize={true}
      >
        {({ touched, errors, handleBlur, isSubmitting, setFieldValue }) => (
          <Form>
            <CardContent
              sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
            >
              <Col xs={12} md={6} className="d-flex flex-row flex-wrap px-2">
                {productValues.images && productValues.images.map((image, index) => {
                  const name = `images[${index}].isMain`;
                  return (
                    <Box
                      key={index}
                      display={"flex"}
                      flexDirection={"column"}
                      order={image.isMain ? -1 : ""}
                      width={image.isMain ? "100%" : "7rem"}
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
                        <Tooltip title="Supprimer">
                          <IconButton
                            onClick={() => {
                              setProductValues({...productValues, images: productValues.images.filter((i) => i != image)});
                              dispatch(deleteProductImage(image.id));
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <Image
                        src={image.path}
                        alt={"image"}
                        style={{ maxHeight: image.isMain ? "20rem" : "auto", minHeight: image.isMain ? "auto" : "5rem", width: image.isMain ? "auto" : "5rem", objectFit: "cover" }}
                        fluid
                      />
                      <Tooltip title="Image principale">
                        <Checkbox
                          sx={{ "&.MuiCheckbox-root .MuiSvgIcon-root": { fill: "#afafaf" } }}
                          name={name}
                          checked={productValues.images[index].isMain}
                          onChange={() => { 
                            productValues.images.map((img, idx) => (img.isMain = idx === index ? true : false));
                            setProductValues({...productValues, images: productValues.images});
                          }}
                        />
                      </Tooltip>
                    </Box>
                  );
                })}
                <TextField
                  id="file"
                  name="file"
                  variant="outlined"
                  label=""
                  className="w-100 mt-2"
                  style={{marginLeft: ".4rem"}}
                  type="file"
                  helperText={ errors.file && touched.file ? errors.file : " " }
                  error={ errors.file && touched.file ? true : false }
                  onChange={uploadImageHandler}
                  // onBlur={handleBlur}
                />
                {loading && <Loader/>}
              </Col>
              <Col xs={12} md={6} className="mt-2">
                <MyTextField
                  className="w-100"
                  name="name"
                  id="name"
                  label="Nom"
                  value={productValues.name ? productValues.name : ""}
                  type="text"
                  helperText={errors.name && touched.name ? errors.name : " "}
                  error={errors.name && touched.name ? true : false}
                  onChange={(e) => setProductValues({...productValues, name: e.target.value}) }
                  onBlur={handleBlur}
                />
                <MyTextField
                  multiline
                  rows={5}
                  className="w-100"
                  name="description"
                  id="description"
                  label="Description"
                  value={productValues.description ? productValues.description : ""}
                  type="text"
                  helperText={ errors.description && touched.description ? errors.description : " " }
                  error={ errors.description && touched.description ? true : false }
                  onChange={(e) => setProductValues({...productValues, description: e.target.value}) }
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
                    value={productValues.price ? productValues.price : 0}
                    type="number"
                    step="any"
                    helperText={ errors.price && touched.price ? errors.price : " " }
                    error={errors.price && touched.price ? true : false}
                    onChange={(e) => setProductValues({...productValues, price: e.target.value}) }
                    onBlur={handleBlur}
                  />

                  <MyTextField
                    name="quantityInStock"
                    id="quantityInStock"
                    label="Quantité"
                    value={productValues.quantityInStock ? productValues.quantityInStock : 0}
                    type="number"
                    helperText={ errors.quantityInStock && touched.quantityInStock ? errors.quantityInStock : " " }
                    error={ errors.quantityInStock && touched.quantityInStock ? true : false }
                    onChange={(e) => setProductValues({...productValues, quantityInStock: e.target.value}) }
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
                    onChange={(e, value) => setProductValues({...productValues, category: value}) }
                    id="category"
                    options={categories}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{ width: "10rem", marginRight: "1rem", marginBottom: "1rem" }}
                        label="Catégorie"
                        value={productValues.category ? productValues.category : {}}
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
                    onChange={(e, value) => setProductValues({...productValues, collection: value}) }
                    id="collection"
                    options={collections}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{ width: "10rem" }}
                        label="Collection"
                        value={productValues.collection ? productValues.collection : {}}
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
            <CardActions sx={{display: "flex", justifyContent: "center"}}>
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

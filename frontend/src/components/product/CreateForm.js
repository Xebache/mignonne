import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { listCategories } from "../../actions/categoryActions";

import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { BlackCard } from "../customMaterials/Card";
import { MyTextField } from "../customMaterials/Inputs";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { Formik, Form } from "formik";
import * as Yup from "yup";

const CreateForm = () => {
    const dispatch = useDispatch();

    const categoryList = useSelector((state) => state.categoryList);
    const { categories } = categoryList;
  
    useEffect(() => {
      dispatch(listCategories());
    }, []);

  return (
    <BlackCard>
      <Formik
        initialValues={{
          name: "",
          description: "",
          price: "",
          category: "",
          quantityInStock: "",
        }}
        enableReinitialize={true}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
        //   updateUserHandler(values);
        }}
      >
      {({ values, touched, errors, handleBlur, handleChange, isSubmitting }) => (
        <Form>
          <CardContent>
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
              error={errors.description && touched.description ? true : false}
              onChange={handleChange}
              onBlur={handleBlur}
            />
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
            <Autocomplete
              id="category"
              options={categories}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Catégorie"
                  value={values.category}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {/* {loading ? <CircularProgress color="inherit" size={20} /> : null} */}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
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
          </CardContent>
          <CardActions>
            <Button></Button>
          </CardActions>
        </Form>
        )}
      </Formik>
    </BlackCard>
  );
};

export default CreateForm;

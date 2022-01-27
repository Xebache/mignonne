import React from "react";

import Loader from "../customMaterials/Loader";
import Message from "../customMaterials/Message";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { TransparentCard } from "../customMaterials/Card";
import { MyTextField } from "../customMaterials/Inputs";

import { Formik, Form } from "formik";
import * as Yup from "yup";

const AddressForm = () => {
  const updateAddressHandler = (data) => {
    console.log("TODO -> update address");
  };

  return (
    <TransparentCard>
      <Formik
        initialValues={{
          name: "",
          street: "",
          number: "",
          box: "",
          postcode: "",
          city: "",
          country: "",
        }}
        enableReinitialize={true}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          updateAddressHandler(values);
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Champ requis"),
          street: Yup.string().required("Champ requis"),
          number: Yup.number().required("Champ requis"),
          box: Yup.number(),
          postcode: Yup.number().required("Champ requis"),
          city: Yup.string().required("Champ requis"),
          country: Yup.string().required("Champ requis"),
        })}
      >
        {({ values,touched, errors, handleBlur, handleChange, isSubmitting }) => (
          <Form>
            <CardContent>
              {/* {error && <Message variant="danger">{error}</Message>}
              {loading && <Loader />} */}
              <MyTextField
                className="w-100"
                name="name"
                id="name"
                label="Prénom + Nom"
                value={values.name}
                type="text"
                helperText={errors.name && touched.name ? errors.name : " "}
                error={errors.name && touched.name ? true : false}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Box as="div" className="d-flex flex-row">
                <MyTextField
                  style={{ width: "85%", marginRight: "1rem" }}
                  name="street"
                  id="street"
                  label="Rue"
                  value={values.street}
                  type="text"
                  helperText={ errors.street && touched.street ? errors.street : " " }
                  error={errors.street && touched.street ? true : false}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <MyTextField
                  style={{ marginRight: "1rem" }}
                  name="number"
                  id="number"
                  label="N°"
                  value={values.number}
                  type="number"
                  helperText={ errors.number && touched.number ? errors.number : " " }
                  error={errors.number && touched.number ? true : false}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <MyTextField
                  name="box"
                  id="box"
                  label="Bte"
                  value={values.box}
                  type="text"
                  helperText={errors.box && touched.box ? errors.box : " "}
                  error={errors.box && touched.box ? true : false}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Box>
              <Box className="w-100 d-flex flex-row">
                <MyTextField
                  style={{ marginRight: "1rem" }}
                  name="postcode"
                  id="postcode"
                  label="Code postal"
                  value={values.postcode}
                  type="text"
                  helperText={ errors.postcode && touched.postcode ? errors.postcode : " " }
                  error={errors.postcode && touched.postcode ? true : false}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <MyTextField
                  style={{ width: "75%" }}
                  name="city"
                  id="city"
                  label="Ville"
                  value={values.city}
                  type="city"
                  helperText={ errors.city && touched.city ? errors.city : " " }
                  error={errors.city && touched.city ? true : false}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Box>
              <MyTextField
                className="w-100"
                name="country"
                id="country"
                label="Pays"
                value={values.country}
                type="country"
                helperText={ errors.country && touched.country ? errors.country : " " }
                error={errors.country && touched.country ? true : false}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </CardContent>
            <CardActions className="justify-content-center flex-column">
              <Button
                type="submit"
                variant="outlined"
                sx={{ "&.MuiButton-outlined": { color: "#bc9105", borderColor: "#bc9105", fontWeight: "400" } }}
                disabled={isSubmitting}
              >
                Mettre à jour
              </Button>
            </CardActions>
          </Form>
        )}
      </Formik>
    </TransparentCard>
  );
};

export default AddressForm;

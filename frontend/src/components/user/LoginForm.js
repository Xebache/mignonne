import React from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { login } from "../../actions/userActions";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { MyTextField } from "../customMaterials/Inputs";

import { Formik, Form } from "formik";
import * as Yup from "yup";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();

  const loginHandler = (data, resetForm) => {
      console.log(state)
    dispatch(login(data.email, data.password)).then(() => navigate(state?.path || "/"));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        loginHandler(values, actions.resetForm);
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Adresse électronique invalide")
          .required("Champ requis"),
        password: Yup.string().required("champ requis"),
      })}
    >
      {({ values, touched, errors, handleBlur, handleChange, isSubmitting }) => (
        <Form>
          <MyTextField
            className="w-100"
            name="email"
            id="email"
            label="Email"
            value={values.email}
            type="email"
            helperText={errors.email && touched.email ? errors.email : " "}
            error={errors.email && touched.email ? true : false}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <MyTextField
            className="w-100"
            name="password"
            id="password"
            label="Mot de passe"
            value={values.password}
            type="password"
            helperText={ errors.password && touched.password ? errors.password : " " }
            error={errors.password && touched.password ? true : false}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Box className="d-flex justify-content-center">
            <Button
              type="submit"
              variant="outlined"
              sx={{ "&.MuiButton-outlined": { color: "#bc9105", borderColor: "#bc9105", fontWeight: "400" } }}
              disabled={isSubmitting}
            >
              Valider
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;

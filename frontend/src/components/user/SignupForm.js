import React from "react";

import { useDispatch } from "react-redux";
import { signup } from "../../actions/userActions";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { MyTextField } from "../customMaterials/Inputs";

import { Formik, Form } from "formik";
import * as Yup from "yup";


const SignupForm = () => {
  const dispatch = useDispatch();

  const createNewUserHandler = (data, resetForm) => {
    dispatch(signup(data.name, data.email, data.password));
    resetForm();
  }

  return (
    <Formik
      initialValues={{ name: "", password: "", confirmPassword: "", email: "" }}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        createNewUserHandler(values, actions.resetForm);
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Adresse électronique invalide")
          .required("Champ requis"),
        name: Yup.string().required("Champ requis"),
        password: Yup.string()
          .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,20}\S$/,
            "Le mot de passe doit comporter de 8 à 20 caractères, une majuscule, une minuscule, un caractère spécial et pas d'espace"
          )
          .required("champ requis"),
        confirmPassword: Yup.string()
          .required("Champ requis")
          .oneOf([Yup.ref("password"), null], "Les mots de passe ne correspondent pas"),
      })}
    >
      {({ values, touched, errors, handleBlur, handleChange, isSubmitting }) => (
        <Form>
          <MyTextField
            className="w-100"
            name="name"
            id="name"
            label="Prénom"
            value={values.name}
            type="text"
            helperText={errors.name && touched.name ? errors.name : " "}
            error={errors.name && touched.name ? true : false}
            onChange={handleChange}
            onBlur={handleBlur}
          />
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
          <MyTextField
            className="w-100"
            name="confirmPassword"
            id="confirmPassword"
            label="Confirmez le mot de passe"
            value={values.confirmPassword}
            type="password"
            helperText={ errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : " " }
            error={ errors.confirmPassword && touched.confirmPassword ? true : false }
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

export default SignupForm;

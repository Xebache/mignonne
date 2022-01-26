import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { signup } from "../actions/userActions";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { BlackCard } from "../components/customMaterials/Card";
import { MyTextField } from "../components/customMaterials/Inputs";

import Loader from "../components/customMaterials/Loader";
import Message from "../components/customMaterials/Message";

import { Formik, Form } from "formik";
import * as Yup from "yup";


function SignupScreen() {
  const dispatch = useDispatch();
  const newUser = useSelector((state) => state.newUser);
  const { error, loading, currentUser } = newUser;

  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if(currentUser) navigate(redirect)
  }, [currentUser, navigate, redirect]);

  const createNewUserHandler = (data, resetForm) => {
    dispatch(signup(data.name, data.email, data.password));
    resetForm();
  }

  return (
    <Box
      component="span"
      sx={{ display: "flex", justifyContent: "center", marginLeft: "2vh", marginRight: "2vh" }}
    >
      <BlackCard sx={{ maxWidth: "34.4em" }}>
        <h1
          className="mb-3 text-center"
          style={{ fontWeight: "300", fontSize: "2rem" }}
        >
          Enregistrez-vous
        </h1>
       
        <Formik
          initialValues={{ name: "", password: "", confirmPassword: "", email: "" }}
          onSubmit={(values, actions) => {
            createNewUserHandler(values, actions.resetForm)
            setTimeout(() => {
              actions.setSubmitting(false)
          }, 500)
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email("Adresse électronique invalide").required("Champ requis"),
            name: Yup.string().required("Champ requis"),
            password: Yup.string()
              .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,20}\S$/, "Le mot de passe doit comporter de 8 à 20 caractères, une majuscule, une minuscule, un caractère spécial et pas d'espace")
              .required("champ requis"),
            confirmPassword: Yup.string()
              .required("Champ requis")
              .oneOf([Yup.ref("password"), null], "Les mots de passe ne correspondent pas"),
          })}
        >
          {({ values, touched, errors, handleBlur, handleChange, isSubmitting }) => (
            <Form>
              <CardContent>
              {error && <Message variant="danger">{error}</Message>}
              {loading && <Loader />}
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
                  className="w-100"
                  name="email"
                  id="email"
                  label="Email"
                  value={values.email}
                  type="email"
                  helperText={ errors.email && touched.email ? errors.email : " " }
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
              </CardContent>
              <CardActions className="justify-content-center flex-column">
                <Button
                  type="submit"
                  variant="outlined"
                  sx={{ "&.MuiButton-outlined": { color: "#bc9105", borderColor: "#bc9105", fontWeight: "400" } }}
                  disabled={isSubmitting}
                >
                  Valider
                </Button>
                <Box className="mt-3" style={{ fontSize: ".75rem" }}>
                  Déjà membre ?
                  <Link
                    style={{ textDecoration: "none", color: "#bc9105" }}
                    to={redirect ? `/login?redirect=${redirect}` : "/login"}
                  >
                    {" "}
                    Identifiez-vous
                  </Link>
                </Box>
              </CardActions>
            </Form>
          )}
        </Formik>
      </BlackCard>
    </Box>
  );
}

export default SignupScreen;

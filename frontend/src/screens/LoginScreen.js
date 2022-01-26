import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";

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

const FormikTest = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);
  const { error, loading, currentUser } = loggedUser;

  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    console.log("useEffect")
    if (currentUser) navigate(redirect);
  }, [loggedUser, navigate, redirect]);

  const loginHandler = (data, resetForm) => {
    dispatch(login(data.email, data.password));
    resetForm();
  };

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
          Identifiez-vous
        </h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, actions) => {
            loginHandler(values, actions.resetForm);
            setTimeout(() => {
              actions.setSubmitting(false);
              console.log(redirect, currentUser, loggedUser)
              if (currentUser) navigate(redirect)
            }, 500);
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email("Adresse électronique invalide").required("Champ requis"),
            password: Yup.string().required("champ requis"),
          })}
        >
          {({ values, touched, errors, handleBlur, handleChange, isSubmitting }) => (
            <Form>
              <CardContent>
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
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
                <Box className="mt-3" style={{ fontSize: ".85rem" }}>
                  <Link
                    style={{ textDecoration: "none", color: "#bc9105" }}
                    to={redirect ? `/password?redirect=${redirect}` : "/password"}
                  >
                    {" "}
                    Mot de passe oublié ?
                  </Link>
                </Box>
                <Box className="mt-3" style={{ fontSize: ".75rem" }}>
                  Pas encore membre ?
                  <Link
                    style={{ textDecoration: "none", color: "#bc9105" }}
                    to={redirect ? `/signup?redirect=${redirect}` : "/signup"}
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
};

export default FormikTest;

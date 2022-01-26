import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUserProfile } from "../actions/userActions";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { BlackCard } from "../components/customMaterials/Card";
import { MyTextField } from "../components/customMaterials/Inputs";

import Loader from "../components/customMaterials/Loader";
import Message from "../components/customMaterials/Message";
import { USER_UPDATE_RESET } from "../constants/userConstants";

import { Formik, Form } from "formik";
import * as Yup from "yup";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userProfile);
  const { error, loading, user } = userProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { currentUser } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) navigate("/login");
    else if (!user || !user.name || success) {
      dispatch({ type: USER_UPDATE_RESET });
      dispatch(getUserProfile("profile"));
    }
  }, [currentUser, user, navigate, dispatch, success]);

  const updateUserHandler = (data) => {
    dispatch(updateUserProfile({
      "email": data.email,
      "firstname": data.firstname,
      "lastname": data.lastname,
      "password": data.password
    }))
  };

  return (
    <Container>
      <Row>
        <Col md={5}>
          <BlackCard>
            <h2
              className="mb-3 text-center"
              style={{ fontWeight: "300", fontSize: "2rem" }}
            >
              Mon profil
            </h2>
            <Formik
              initialValues={{
                firstname: user.name ? ((user.name).split("=") ? (user.name).split("=")[0] : user.name) : "",
                lastname: user.name ? ((user.name).split("=") ? (user.name).split("=")[0] : "") : "",
                password: "",
                confirmPassword: "",
                email: user.email ? user.email : "",
              }}
              enableReinitialize={true}
              onSubmit={(values, actions) => {
                updateUserHandler(values);
                setTimeout(() => {
                  actions.setSubmitting(false);
                }, 500);
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email("Adresse électronique invalide")
                  .required("Champ requis"),
                firstname: Yup.string().required("Champ requis"),
                lastname: Yup.string().required("Champ requis"),
                password: Yup.string()
                  .matches(
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,20}\S$/,
                    "Le mot de passe doit comporter de 8 à 20 caractères, une majuscule, une minuscule, un caractère spécial et pas d'espace"
                  ),
                confirmPassword: Yup.string()
                  .when("password", {
                      is: (password) => password ,
                      then: Yup.string().required("Champ requis"),
                      otherwise: Yup.string()
                  })
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
                      name="firstname"
                      id="firstname"
                      label="Prénom"
                      value={values.firstname}
                      type="text"
                      helperText={errors.firstname && touched.firstname ? errors.firstname : " "}
                      error={errors.firstname && touched.firstname ? true : false}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <MyTextField
                      className="w-100"
                      name="lastname"
                      id="lastname"
                      label="Nom"
                      value={values.lastname}
                      type="text"
                      helperText={errors.lastname && touched.lastname ? errors.lastname : " "}
                      error={errors.lastname && touched.lastname ? true : false}
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
                      helperText={errors.password && touched.password ? errors.password : " "}
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
                      helperText={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : " "}
                      error={errors.confirmPassword && touched.confirmPassword ? true : false}
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
          </BlackCard>
        </Col>
        <Col md={7}>
        <Row>
          <BlackCard>
            <h2
              className="mb-3 text-center"
              style={{ fontWeight: "300", fontSize: "2rem" }}
            >
              Mes commandes
            </h2>
          </BlackCard>
          </Row>
          <Row>
          <BlackCard className="mt-3">
          <h2
            className="mb-3 text-center"
            style={{ fontWeight: "300", fontSize: "2rem" }}
          >
            Mes adresses
          </h2>
        </BlackCard>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;

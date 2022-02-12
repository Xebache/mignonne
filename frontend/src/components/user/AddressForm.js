import React from "react";

import Loader from "../customMaterials/Loader";
import Message from "../customMaterials/Message";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { TransparentCard } from "../customMaterials/Card";
import { MyTextField } from "../customMaterials/Inputs";

import { ControlledTextField } from "../customMaterials/Inputs";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const AddressForm = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Champ requis"),
    street: Yup.string().required("Champ requis"),
    number: Yup.number().required("Champ requis"),
    box: Yup.number(),
    postcode: Yup.number().required("Champ requis"),
    city: Yup.string().required("Champ requis"),
    country: Yup.string().required("Champ requis"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      street: "",
      number: "",
      box: "",
      zipcode: "",
      city: "",
      country: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const updateAddressHandler = (data) => {
    console.log("TODO -> update address");
  };

  return (
    <form onSubmit={handleSubmit(updateAddressHandler)}>
      <Box px={3} py={2}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <ControlledTextField
              control={control}
              type="text"
              name="name"
              label="Prénom + Nom"
              errors={errors}
              required={true}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            style={{ display: "flex", flexDirection: "row" }}
          >
            <Grid item xs={9.5} sm={9.5}>
              <ControlledTextField
                control={control}
                type="text"
                name="street"
                label="Adresse"
                errors={errors}
                required={true}
              />
            </Grid>
            <Grid
              item
              xs={1.25}
              sm={1.25}
              style={{ marginLeft: ".5rem", marginRight: ".5rem" }}
            >
              <ControlledTextField
                control={control}
                type="text"
                name="number"
                label="N°"
                errors={errors}
                required={true}
              />
            </Grid>
            <Grid item xs={1.25} sm={1.25}>
              <ControlledTextField
                control={control}
                type="text"
                name="box"
                label="Bte"
                errors={errors}
                required={false}
              />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            style={{ display: "flex", flexDirection: "row" }}
          >
            <Grid item xs={3} sm={3}>
            <ControlledTextField
                control={control}
                type="text"
                name="zipcode"
                label="Code postal"
                errors={errors}
                required={false}
              />
            </Grid>
            <Grid item xs={5} sm={5} style={{ marginLeft: ".5rem", marginRight: ".5rem" }} >
            <ControlledTextField
                control={control}
                type="text"
                name="city"
                label="Ville"
                errors={errors}
                required={false}
              />
            </Grid>
            <Grid item xs={4} sm={4}>
            <ControlledTextField
                control={control}
                type="text"
                name="country"
                label="Pays"
                errors={errors}
                required={false}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default AddressForm;

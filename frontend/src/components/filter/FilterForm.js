import React from "react";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { MyTextField } from "../customMaterials/Inputs";

import { Formik, Form } from "formik";
import * as Yup from "yup";

const FilterForm = ({ filter, submitHandler }) => {
  return (
    <Formik
      initialValues={{
        id: filter.id || "",
        name: filter.name || "",
      }}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        submitHandler(values, actions.resetForm);
      }}
      validationSchema={Yup.object().shape({
        id: Yup.string(),
        name: Yup.string().required("Champ requis"),
      })}
      enableReinitialize={true}
    >
      {({
        values,
        touched,
        errors,
        handleBlur,
        handleChange,
        isSubmitting,
      }) => (
        <Form>
          <MyTextField
            sx={{
              ".MuiOutlinedInput-root": { background: "#FFF" },
              marginTop: "1.5rem",
            }}
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
          <Tooltip
            title={filter && filter.name ? "Mettre à jour" : "Ajouter"}
            sx={{ marginTop: "1.75rem", marginLeft: "1rem" }}
          >
            <IconButton
              size="large"
              type="submit"
              disabled={isSubmitting}
              disabled={isSubmitting}
            >
              {filter && filter.name ? (
                <EditIcon />
              ) : (
                <AddIcon fontSize="inherit" />
              )}
            </IconButton>
          </Tooltip>
        </Form>
      )}
    </Formik>
  );
};

export default FilterForm;

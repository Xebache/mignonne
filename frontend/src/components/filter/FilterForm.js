import React, { useEffect } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { MyTextField } from "../customMaterials/Inputs";

import { ControlledTextField } from "../customMaterials/Inputs";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const FilterForm = ({ filter, submitHandler }) => {
  const validationSchema = Yup.object().shape({
    id: Yup.string(),
    name: Yup.string().required("Champ requis"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: { name: "" },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    reset({ ...{ id: filter.id, name: filter.name } });
  }, [filter, reset]);

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Box px={1} py={1}>
        <Grid container spacing={1}>
          <Grid item xs={10} sm={10}>
            <ControlledTextField
              control={control}
              name="name"
              id="name"
              label="Nom"
              type="text"
              errors={errors}
              required={true}
            />
          </Grid>
          <Grid item xs={2} sm={2}>
          <Tooltip
            title={filter && filter.name ? "Mettre à jour" : "Ajouter"}
            sx={{ marginTop: ".65rem" }}
          >
            <IconButton
              size="large"
              type="submit"
            >
              {filter && filter.name ? (
                <EditIcon />
              ) : (
                <AddIcon fontSize="inherit" />
              )}
            </IconButton>
          </Tooltip>
          </Grid>
        </Grid>
      </Box>
    </form>
    // <Formik
    //   initialValues={{
    //     id: filter.id || "",
    //     name: filter.name || "",
    //   }}
    //   onSubmit={(values, actions) => {
    //     actions.setSubmitting(false);
    //     submitHandler(values, actions.resetForm);
    //   }}
    //   validationSchema={Yup.object().shape({
    //     id: Yup.string(),
    //     name: Yup.string().required("Champ requis"),
    //   })}
    //   enableReinitialize={true}
    // >
    //   {({
    //     values,
    //     touched,
    //     errors,
    //     handleBlur,
    //     handleChange,
    //     isSubmitting,
    //   }) => (
    //     <Form>
    //       <MyTextField
    //         sx={{
    //           ".MuiOutlinedInput-root": { background: "#FFF" },
    //           marginTop: "1.5rem",
    //         }}
    //         name="name"
    //         id="name"
    //         label="Nom"
    //         value={values.name}
    //         type="text"
    //         helperText={errors.name && touched.name ? errors.name : " "}
    //         error={errors.name && touched.name ? true : false}
    //         onChange={handleChange}
    //         onBlur={handleBlur}
    //       />
    //       <Tooltip
    //         title={filter && filter.name ? "Mettre à jour" : "Ajouter"}
    //         sx={{ marginTop: "1.75rem", marginLeft: "1rem" }}
    //       >
    //         <IconButton
    //           size="large"
    //           type="submit"
    //           disabled={isSubmitting}
    //           disabled={isSubmitting}
    //         >
    //           {filter && filter.name ? (
    //             <EditIcon />
    //           ) : (
    //             <AddIcon fontSize="inherit" />
    //           )}
    //         </IconButton>
    //       </Tooltip>
    //     </Form>
    //   )}
    // </Formik>
  );
};

export default FilterForm;

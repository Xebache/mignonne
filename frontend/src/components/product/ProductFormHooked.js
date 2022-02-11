import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { listCategories, listCollections } from "../../actions/filterActions";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import Image from "react-bootstrap/Image";

import { ButtonOutlinedYellow } from "../customMaterials/Button";
import {
  MyTextField,
  ControlledTextField,
  ControlledTextArea,
  ControlledAutocomplete,
  ControlledMainImageCheckbox,
} from "../customMaterials/Inputs";
import { CloseIcon } from "../customMaterials/Icons";
import Loader from "../customMaterials/Loader";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const ProductFormHooked = ({ product }) => {
  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const collectionList = useSelector((state) => state.collectionList);
  const { collections } = collectionList;

  useEffect(() => {
    if (categories.length === 0) dispatch(listCategories());
    if (collections.length === 0) dispatch(listCollections());
  }, []);

  useEffect(() => {
    if (product) reset({ ...product });
  }, [product]);

  const defaultValues = {
    name: "",
    description: "",
    price: "",
    quantityInStock: "",
    category: {},
    collection: {},
    images: [],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string(),
  });

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    getValues,
    setValue,
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const watchImages = watch("images", []);

  const formatImageURL = (image) => {
    if (!image) return "";
    if (image.path) return image.path;
    return URL.createObjectURL(image.file);
  };

  const submitHandler = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Box display={"flex"} flexDirection={"row"} width={"100%"} px={3} py={2}>
        <Grid item xs={6} sm={6}>
          <Grid container spacing={1}>
            {watchImages &&
              watchImages.map((image, index) => {
                return (
                  <Box
                    key={index}
                    display={"flex"}
                    flexDirection={"column"}
                    order={image.isMain ? -1 : ""}
                    width={image.isMain ? "100%" : "7rem"}
                    border={"1px solid #afafaf"}
                    borderRadius={"5px"}
                    padding={"1rem"}
                    margin={".5rem"}
                    maxHeight={image.isMain ? "100%" : "10rem"}
                  >
                    <Box
                      textAlign={"right"}
                      marginRight={"-.7rem"}
                      marginTop={"-.7rem"}
                    >
                      <Tooltip title="Supprimer">
                        <IconButton
                          onClick={() => setValue("images", watchImages.filter((i) => i != image))}
                        >
                          <CloseIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Image
                      src={formatImageURL(image)}
                      alt={"image"}
                      style={{
                        maxHeight: image.isMain ? "20rem" : "auto",
                        minHeight: image.isMain ? "auto" : "5rem",
                        width: image.isMain ? "auto" : "5rem",
                        objectFit: "cover",
                      }}
                      fluid
                    />
                    <Box textAlign={"center"}>
                      <ControlledMainImageCheckbox
                        control={control}
                        image={image}
                        watchImages={watchImages}
                        setValue={setValue}
                        index={index}
                      />
                    </Box>
                  </Box>
                );
              })}
            <MyTextField
              id="file"
              name="file"
              variant="outlined"
              label=""
              className="w-100 mt-2"
              style={{ marginLeft: ".4rem" }}
              type="file"
              helperText={errors.file?.message}
              error={errors.file ? true : false}
              onChange={(ev) => {
                setValue("images", [
                  ...watchImages,
                 { file: ev.currentTarget.files[0], isMain: watchImages.length === 0 } ,
                ]);
              }}
            />
            {/* {loading && <Loader />} */}
          </Grid>
        </Grid>

        <Grid item xs={6} sm={6}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <ControlledTextField
                control={control}
                type="text"
                name="name"
                label="Nom"
                errors={errors}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <ControlledTextArea
                control={control}
                type="text"
                name="description"
                label="Description"
                multiline
                rows={5}
                errors={errors}
                required={true}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <ControlledTextField
                control={control}
                type="number"
                name="price"
                label="Prix"
                errors={errors}
                required={true}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <ControlledTextField
                control={control}
                type="number"
                name="quantityInStock"
                label="En stock"
                errors={errors}
                required={true}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <ControlledAutocomplete
                control={control}
                name="category"
                options={categories}
                label="Catégorie"
                setValue={setValue}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <ControlledAutocomplete
                control={control}
                name="collection"
                options={collections}
                label="Collection"
                setValue={setValue}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box mt={3} textAlign={"center"}>
        <ButtonOutlinedYellow>Valider</ButtonOutlinedYellow>
      </Box>
    </form>
  );
};

export default ProductFormHooked;

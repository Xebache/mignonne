import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import { RightSlidingDialog } from "../customMaterials/Dialog";
import { ButtonNoOutlinedFullWidth } from "../customMaterials/Button";
import { CloseIcon } from "../customMaterials/Icons";

import ProductCart from "../product/ProductCart";
import CartTitle from "./CartTitle";

const CartDialog = ({ open, onClose, items }) => {

  return (
    <RightSlidingDialog
      height="100vh"
      width="27.5em"
      open={open}
      onClose={onClose}
    >
      <Button
        style={{ marginLeft: "-1rem", marginTop: ".1rem" }}
        type="submit"
        sx={{
          "&.MuiButton-outlined": {
            color: "transparent",
            borderColor: "transparent",
            marginTop: "-.25rem",
          },
        }}
        variant="outlined"
        onClick={onClose}
      >
        <CloseIcon />
      </Button>
      <CardHeader
        title={<CartTitle items={items} />}
        sx={{ borderBottom: "1px solid #6f6f6f" }}
      />
      <CardContent>
        <List sx={{ margin: "-1em", padding: 0 }}>
          {items.map((item) => (
            <ListItem key={item.id} sx={{ margin: 0, padding: 0 }}>
                <ProductCart product={item} onClose={onClose}/>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          padding: 0,
        }}
      >
        <Box textAlign={"center"} width={"100%"}>
          <ButtonNoOutlinedFullWidth disabled={items.length === 0}>
            Valider le panier
          </ButtonNoOutlinedFullWidth>
        </Box>
      </CardActions>
    </RightSlidingDialog>
  );
};

export default CartDialog;

import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { removeFromCart } from "../../actions/cartActions";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";

import { TransparentCard } from "../customMaterials/Card";
import { CloseIconWhite } from "../customMaterials/Icons";

const ProductCart = ({ product, onClose }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [item, setItem] = useState({});

  useEffect(() => {
    if (item.id) {
      navigate(`/product/${item.id}`);
      onClose();
      setItem({});
    }
  }, [item]);

  const clickHandler = (ev, item) => {
    ev.preventDefault();
    setItem(item);
  };

  const removeHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <TransparentCard
      sx={{ width: "100%", height: "9.5em", marginLeft: ".75em", marginRight: ".75em", padding: 0, borderRadius: 0, borderBottom: "1px solid #6f6f6f" }}
    >
      <Box display={"flex"} width={"100%"}>
        <CardMedia
          component="img"
          sx={{
            width: 130,
            margin: "1rem",
            "&:hover": { cursor: "pointer" },
          }}
          image={product.image}
          alt={product.id}
          onClick={(ev) => clickHandler(ev, product)}
        />
        <CardContent
          sx={{
            display: "inline-flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "1em",
            marginRight: "-1.9em",
            "&:hover": { cursor: "pointer" },
          }}
          onClick={(ev) => clickHandler(ev, product)}
        >
          <Box>{product.name}</Box>
          <Box marginRight={"-.75rem"} whiteSpace={"noWrap"}>
            {product.price === Math.floor(product.price)
              ? product.price
              : parseInt(product.price)}
            {" €"}
          </Box>
        </CardContent>
        <CardActions>
        <IconButton
          size="small"
          type="submit"
          sx={{
            "&.MuiIconButton-root": {
              background: "#6f6f6f",
              position: "relative",
              bottom: "-2.5em",
              right: ".3em"
            },
          }}
          variant="outlined"
          onClick={() => removeHandler(product.id)}
        >
          <CloseIconWhite />
        </IconButton>
      </CardActions>
      </Box>
    </TransparentCard>
  );
};

export default ProductCart;

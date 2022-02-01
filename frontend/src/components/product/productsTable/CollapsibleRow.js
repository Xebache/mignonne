import React, { Fragment, useState } from "react";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Collapse from "@mui/material/Collapse";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import Image from "react-bootstrap/Image";

const CollapsibleRow = ({ product, labelId, isItemSelected, handleCheckboxClick }) => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell padding="checkbox">
          <Checkbox onClick={handleCheckboxClick}
            sx={{ "&.MuiCheckbox-root .MuiSvgIcon-root": { fill: "#afafaf" } }}
            checked={isItemSelected}
            inputProps={{ "aria-labelledby": labelId }}
          />
        </TableCell>
          <TableCell align="center" onClick={() => setOpen(!open)}>
            <Image
              src={
                product.images.find((image) => image.isMain).path
                  ? product.images.find((image) => image.isMain).path
                  : "images/default.webp"
              }
              alt={product.name}
              style={{ height: "3rem", width: "3rem", borderRadius: "50%" }}
            />
          </TableCell>
          <TableCell align="center" id={labelId} scope="row" onClick={() => setOpen(!open)}>
            {product.name}
          </TableCell>
          <TableCell align="center" onClick={() => setOpen(!open)}>{product.description}</TableCell>
          <TableCell align="center" className="text-nowrap"onClick={() => setOpen(!open)} >
            {product.price === Math.floor(product.price)
              ? product.price
              : parseInt(product.price)}
            {" €"}
          </TableCell>
          <TableCell align="center" onClick={() => setOpen(!open)}>{product.category.name}</TableCell>
          <TableCell align="center" onClick={() => setOpen(!open)}>{product.collection.name}</TableCell>
          <TableCell align="center" onClick={() => setOpen(!open)} >{product.createdAt}</TableCell>
          <TableCell align="center" onClick={() => setOpen(!open)}>{product.quantityInStock}</TableCell>
      </TableRow>
      <TableRow onClick={() => setOpen(!open)}>
        <TableCell>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <p className="text-nowrap" style={{ fontSize: "1rem" }}>
                Images secondaires
              </p>
              <Box
                display={"flex"}
                flexDirection={"row"}
                flexWrap={"wrap"}
                alignItems={"center"}
              >
                {product.images.map((image) => {
                  return (
                    <Image
                      key={image.path}
                      src={image.path}
                      fluid
                      style={{ width: "3rem", height: "3rem" }}
                    />
                  );
                })}
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export default CollapsibleRow;

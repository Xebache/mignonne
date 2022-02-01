import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { listProducts, deleteProduct } from "../actions/productActions";

import Container from "react-bootstrap/Container";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

import Message from "../components/customMaterials/Message";
import Loader from "../components/customMaterials/Loader";

import CollapsibleRow from "../components/product/productsTable/CollapsibleRow";
import TableHeadWithSorting from "../components/product/productsTable/TableHeadWithSorting";
import TableToolBar from "../components/product/productsTable/TableToolBar";

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const ProductListScreen = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [selected, setSelected] = useState([]);

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { error: errorDelete, loading: loadingDelete, success: successDelete } = productDelete;

  useEffect(() => {
    dispatch(listProducts());
    setSelected([])
  }, [dispatch, successDelete]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = products.map((product) => product.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleDeleteClick = (event) => {
      if(window.confirm("Voulez-vous supprimer ces produits ?")){
        selected.map((id) => dispatch(deleteProduct(id)))
      }
  };

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <TableToolBar
            productId={selected[0]}
            numSelected={selected.length}
            onDeleteClick={handleDeleteClick}
          />
          <TableContainer>
            <Table>
              <TableHeadWithSorting
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={products.length}
              />
              <TableBody>
                {products
                  .slice()
                  .sort(getComparator(order, orderBy))
                  .map((product, index) => { 
                    return (
                      <CollapsibleRow 
                        key={product.id} 
                        product={product} 
                        isItemSelected={isSelected(product.id)} 
                        labelId={`enhanced-table-checkbox-${index}`} 
                        handleCheckboxClick={(event) => handleClick(event, product.id)}
                      />
                      // <TableRow
                      //   key={product.id}
                      //   hover
                      //   onClick={(event) => handleClick(event, product.id)}
                      //   role="checkbox"
                      //   aria-checked={isItemSelected}
                      //   tabIndex={-1}
                      //   selected={isItemSelected}
                      // >
                      //   <TableCell padding="checkbox">
                      //     <Checkbox
                      //       sx={{ "&.MuiCheckbox-root .MuiSvgIcon-root": { fill: "#afafaf" } }}
                      //       checked={isItemSelected}
                      //       inputProps={{ "aria-labelledby": labelId }}
                      //     />
                      //   </TableCell>
                      //   <TableCell align="center">
                      //     <Image
                      //       src={ product.images.find((image) => image.isMain).path ? product.images.find((image) => image.isMain).path : "images/default.webp" }
                      //       alt={product.name}
                      //       style={{ height: "3rem", width: "3rem", borderRadius: "50%" }}
                      //     />
                      //   </TableCell>
                      //   <TableCell align="center" id={labelId} scope="row">
                      //     {product.name}
                      //   </TableCell>
                      //   <TableCell align="center">
                      //     {product.description}
                      //   </TableCell>
                      //   <TableCell align="center" className="text-nowrap">
                      //     {product.price === Math.floor(product.price)
                      //       ? product.price
                      //       : parseInt(product.price)}
                      //     {" €"}
                      //   </TableCell>
                      //   <TableCell align="center">{product.category.name}</TableCell>
                      //   <TableCell align="center">
                      //     {product.collection.name}
                      //   </TableCell>
                      //   <TableCell align="center">
                      //     {product.createdAt}
                      //   </TableCell>
                      //   <TableCell align="center">
                      //     {product.quantityInStock}
                      //   </TableCell>
                      // </TableRow>
                  );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
};

export default ProductListScreen;

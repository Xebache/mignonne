import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { listProducts, deleteProduct } from "../actions/productActions";

import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

import { LinkContainer } from "react-router-bootstrap";

import { alpha } from "@mui/material/styles";
import AddIcon from '@mui/icons-material/Add';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from "@mui/icons-material/FilterList";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import { visuallyHidden } from "@mui/utils";

import Message from "../components/customMaterials/Message";
import Loader from "../components/customMaterials/Loader";


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

const headCells = [
  {
    id: "name",
    numeric: false,
    label: "Nom",
  },
  {
    id: "description",
    numeric: false,
    label: "Description",
  },
  {
    id: "price",
    numeric: true,
    label: "Prix",
  },
  {
    id: "category",
    numeric: false,
    label: "Catégorie",
  },
  {
    id: "collection",
    numeric: false,
    label: "Collection",
  },
  {
    id: "createdAt",
    numeric: false,
    label: "Créé le",
  },
  {
    id: "quantityInStock",
    numeric: true,
    label: "En stock",
  },
];

const TableToolBar = ({ productId, numSelected, onDeleteClick }) => {

  useEffect(() => {
    console.log(productId)
  })

  return (
    <Toolbar
      sx={{
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha( theme.palette.primary.main, theme.palette.action.activatedOpacity ),
        }),
      }}
    >
      <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
        <Box>
          {numSelected > 0 ? (
            <h2
              style={{ fontWeight: "300", fontSize: "1rem", marginTop: ".5rem" }}
            >
              X {numSelected} {numSelected === 1 ? "produit sélectionné" : "produits sélectionnés"}
            </h2>
          ) : (
            <h2
              className="mb-3"
              style={{ fontWeight: "300", fontSize: "2rem" }}
            >
              Mes bijoux
            </h2>
          )}
        </Box>
        <Box>
          {numSelected > 0 ? (
              numSelected == 1 ? (
                <>
                  <LinkContainer to={`/admin/products/update/${productId}`}>
                    <Tooltip title="Mettre à jour">
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </LinkContainer>
                  <Tooltip title="Supprimer">
                    <IconButton onClick={onDeleteClick}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </>
              ): (
                <Tooltip title="Supprimer">
                  <IconButton onClick={onDeleteClick}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              )
          ) : (
              <>
                <LinkContainer to={"/admin/products/create"}>
                  <Tooltip title="Ajouter">
                    <IconButton sx={{ marginBottom: "1rem" }}>
                      <AddIcon />
                    </IconButton>
                  </Tooltip>  
                </LinkContainer>
                <Tooltip title="Filtres">
                  <IconButton sx={{ marginBottom: "1rem" }}>
                    <FilterListIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Box>
      </Box>
    </Toolbar>
  );
};

const TableHeadWithSorting = ({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            sx={{ "&.MuiCheckbox-root .MuiSvgIcon-root": { fill: "#afafaf" } }}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "Sélectionner tous les produits" }}
          />
        </TableCell>
        <TableCell> </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            className="text-nowrap"
            key={headCell.id}
            align="center"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
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
                    const isItemSelected = isSelected(product.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        key={product.id}
                        hover
                        onClick={(event) => handleClick(event, product.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            sx={{ "&.MuiCheckbox-root .MuiSvgIcon-root": { fill: "#afafaf" } }}
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Image
                            src={ product.images.find((image) => image.isMain).path }
                            alt={product.name}
                            style={{ height: "3rem", width: "3rem", borderRadius: "50%" }}
                          />
                        </TableCell>
                        <TableCell align="center" id={labelId} scope="row">
                          {product.name}
                        </TableCell>
                        <TableCell align="center">
                          {product.description}
                        </TableCell>
                        <TableCell align="center" className="text-nowrap">
                          {product.price === Math.floor(product.price)
                            ? product.price
                            : parseInt(product.price)}
                          {" €"}
                        </TableCell>
                        <TableCell align="center">{product.category}</TableCell>
                        <TableCell align="center">
                          {product.collection}
                        </TableCell>
                        <TableCell align="center">
                          {product.createdAt}
                        </TableCell>
                        <TableCell align="center">
                          {product.quantityInStock}
                        </TableCell>
                      </TableRow>
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

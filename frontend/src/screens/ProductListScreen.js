import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { listProducts, deleteProduct } from "../actions/productActions";

import Container from "react-bootstrap/Container";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

import Message from "../components/customMaterials/Message";
import Loader from "../components/customMaterials/Loader";

import CollapsibleRow from "../components/product/productsTable/CollapsibleRow";
import TableHeadWithSorting from "../components/product/productsTable/TableHeadWithSorting";
import TableToolBar from "../components/product/productsTable/TableToolBar";

import Filters from "../components/filter/Filters";

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

const multiPropsFilter = (products, filter) => {
  let selectedCategories = products;
  if (filter.categories.length > 0)
    selectedCategories = products.filter((product) =>
      filter.categories.map((c) => c.name).includes(product.category.name)
    );

  let selectedCollections = products;
  if (filter.collections.length > 0)
    selectedCollections = products.filter((product) =>
      filter.collections.map((c) => c.name).includes(product.collection.name)
    );

  const selectedPriceRange = products.filter(
    (product) =>
      parseInt(product.price) >= filter.range.min &&
      parseInt(product.price) <= filter.range.max
  );

  return selectedCategories
    .filter((product) => selectedCollections.includes(product))
    .filter((product) =>  selectedPriceRange.includes(product))
};

const ProductListScreen = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [selected, setSelected] = useState([]);
  const [filter, setFilter] = useState({
    categories: [],
    collections: [],
    range: {},
  });
  const [productsToDisplay, setProductsToDisplay] = useState([]);

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    error: errorDelete,
    loading: loadingDelete,
    success: successDelete,
  } = productDelete;

  useEffect(() => {
    
    setProductsToDisplay(products);
    if (products.length > 0) {
      const max = Math.max(...products.map((product) => product.price));
      const min = Math.min(...products.map((product) => product.price));
      setFilter({ ...filter, range: { min: min, max: max } });
    }
  }, [products]);

  useEffect(() => {
    setProductsToDisplay(multiPropsFilter(products, filter));
  }, [filter, products]);

  useEffect(() => {
    dispatch(listProducts());
    setSelected([]);
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
    if (window.confirm("Voulez-vous supprimer ces produits ?")) {
      selected.map((id) => dispatch(deleteProduct(id)));
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
            filter={filter}
            setFilter={setFilter}
            productsToDisplay={productsToDisplay}
          />
          <TableContainer>
            <Table>
              <TableHeadWithSorting
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={productsToDisplay.length}
              />
              <TableBody>
                {productsToDisplay
                  .slice()
                  .sort(getComparator(order, orderBy))
                  .map((product, index) => {
                    return (
                      <CollapsibleRow
                        key={product.id}
                        product={product}
                        isItemSelected={isSelected(product.id)}
                        labelId={`enhanced-table-checkbox-${index}`}
                        handleCheckboxClick={(event) =>
                          handleClick(event, product.id)
                        }
                      />
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

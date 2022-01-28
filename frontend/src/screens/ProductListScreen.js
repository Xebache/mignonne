import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

import { LinkContainer } from "react-router-bootstrap";

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    label: 'Nom',
  },
  {
    id: 'description',
    numeric: false,
    label: 'Description',
  },
  {
    id: 'price',
    numeric: true,
    label: 'Prix',
  },
  {
    id: 'category',
    numeric: false,
    label: 'Catégorie',
  },
  {
    id: 'collection',
    numeric: false,
    label: 'Collection',
  },
  {
    id: 'createdAt',
    numeric: false,
    label: 'Créé le',
  },
  {
    id: 'quantityInStock',
    numeric: true,
    label: 'En stock',
  },
]

const TableHeadWithSorting = ({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell>{" "}</TableCell>
        <TableCell>{" "}</TableCell>
        {headCells.map((headCell) => (
          <TableCell 
            className="text-nowrap"
            key={headCell.id}
            align="center"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const ProductListScreen = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Container>
      <h2 className="mb-3" style={{ fontWeight: "300", fontSize: "2rem" }}>
        Mes bijoux
      </h2>
      <TableContainer>
        <Table>
          <TableHeadWithSorting 
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            // rowCount={rows.length}
          />
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell padding="checkbox">
                    <Checkbox sx={{"&.MuiCheckbox-root .MuiSvgIcon-root": {fill:"#afafaf"}}}/>
                </TableCell>  
                <TableCell align="center">
                  <Image
                    src={product.images.find((image) => image.isMain).path}
                    alt={product.name}
                    style={{ height: "3rem", width: "3rem", borderRadius: "50%" }}
                  />
                </TableCell>
                <TableCell align="center">{product.name}</TableCell>
                <TableCell align="center">{product.description}</TableCell>
                <TableCell align="center" className="text-nowrap">
                  {product.price === Math.floor(product.price)
                    ? product.price
                    : parseInt(product.price)}{" €"}
                </TableCell>
                <TableCell align="center">{product.category}</TableCell>
                <TableCell align="center">{product.collection}</TableCell>
                <TableCell align="center">{product.createdAt}</TableCell>
                <TableCell align="center">{product.quantityInStock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ProductListScreen;

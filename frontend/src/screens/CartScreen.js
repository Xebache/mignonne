import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { useCookies } from "react-cookie";

import { useDispatch, useSelector, MapStateToProps } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";

import styled from "styled-components";

// import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { BlackCard, YellowCard } from "../styles/Card";

import { CloseIcon } from "../components/Icons";
import Message from "../components/Message";

const Th = styled.th`
  font-weight: 500;
  font-size: 0.75rem;
`;

const Tr = styled.tr`
  font-weight: 500;
  font-size: 0.85rem;
`;

const Td = styled.td`
  width: 7rem;
`;

const CartScreen = () => {
  const productId = useParams().id;
  const qty = useParams().qty;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const [cookies, setCookie] = useCookies(["cartItems"]);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    };
  }, [dispatch, productId, qty]);

  useEffect(() => {
    if(cartItems) setCookie("cartItems", cartItems)
  }, [cartItems])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    console.log("checkout", cartItems);
  };

  return (
    <Box component="span" sx={{ display: "flex", justifyContent: "center" }}>
      <BlackCard>
        <h1 className="mx-3 my-3" style={{ fontWeight: "300", fontSize: "2rem" }}>
          Panier
        </h1>
        {cartItems.length === 0 ? (
          <CardContent>
            <Message variant="light">
              <Row className="my-5">
                <Col>Votre panier est vide</Col>
              </Row>
              <Row className="mt-5">
                <Link to="/" style={{ textDecoration: "none", color: "#000000" }}>
                  <Button
                    sx={{ "&.MuiButton-outlined": { color: "#bc9105", borderColor: "#bc9105", fontWeight: "400" } }}
                    variant="outlined"
                  >
                    Retour à la boutique
                  </Button>
                </Link>
              </Row>
            </Message>
          </CardContent>
        ) : (
          <CardContent>
            <Table responsive borderless>
              <thead>
                <tr style={{ borderBottom: "1px solid #4f4f4f" }}>
                  <Th>Item</Th>
                  <Th>Description</Th>
                  <Th className="text-center text-nowrap">Prix unitaire</Th>
                  <Th className="text-center">Quantité</Th>
                  <Th className="text-center">Total</Th>
                  <Th></Th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <Tr key={item.id} className="align-middle">
                    <Td>
                      <Link to={`/product/${item.id}`}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          style={{
                            height: "3rem",
                            width: "3rem",
                            borderRadius: "50%",
                          }}
                        />
                      </Link>
                    </Td>
                    <td>
                      <Link
                        to={`/product/${item.id}`}
                        style={{ textDecoration: "none", color: "#000000" }}
                      >
                        {item.name}
                      </Link>
                    </td>
                    <Td className="text-center ">
                      {item.price === Math.floor(item.price)
                        ? item.price
                        : parseInt(item.price)}
                      {" €"}
                    </Td>
                    <Td className="text-center">{item.qty}</Td>
                    <Td className="text-center">
                      {item.total}
                      {" €"}
                    </Td>
                    <td style={{ width: "4rem" }}>
                      <Button
                        type="submit"
                        sx={{ "&.MuiButton-outlined": { color: "transparent", borderColor: "transparent", marginTop: "-.25rem" } }}
                        variant="outlined"
                        onClick={() => removeFromCartHandler(item.id)}
                      >
                        <CloseIcon />
                      </Button>
                    </td>
                  </Tr>
                ))}
              </tbody>
            </Table>
            <Row>
              <Col lg={{ span: 4, offset: 8 }} sm={{ span: 6, offset: 6 }}>
                <YellowCard>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex flex-row justify-content-between flex-wrap">
                      <h2
                        className="text-nowrap"
                        style={{ fontSize: ".65rem", fontWeight: "400" }}
                      >
                        SOUS-TOTAL
                      </h2>
                      <p
                        className="text-nowrap"
                        style={{
                          fontSize: ".85rem",
                          marginTop: "-.3rem",
                          marginBottom: "-1rem",
                        }}
                      >
                        {cartItems.reduce(
                          (acc, item) => acc + Number(item.price),
                          0
                        )}
                        {" €"}
                      </p>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex flex-row justify-content-between">
                      <h2
                        style={{
                          fontSize: ".65rem",
                          fontWeight: "400",
                          marginTop: ".5rem",
                        }}
                      >
                        TOTAL
                      </h2>
                      <p
                        className="text-nowrap"
                        style={{ fontSize: ".85rem", marginBottom: "-1rem" }}
                      >
                        {cartItems.reduce(
                          (acc, item) => acc + Number(item.price),
                          0
                        )}
                        {" €"}
                      </p>
                    </ListGroup.Item>
                  </ListGroup>
                </YellowCard>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col lg={{ span: 4, offset: 8 }} sm={{ span: 6, offset: 6 }}>
                <Button
                  className="w-100"
                  type="submit"
                  sx={{ "&.MuiButton-outlined": { color: "#bc9105", borderColor: "#bc9105", fontWeight: "400" } }}
                  variant="outlined"
                  onClick={checkoutHandler}
                >
                  Valider le panier
                </Button>
              </Col>
            </Row>
          </CardContent>
        )}
      </BlackCard>
    </Box>
  );
};

export default CartScreen;

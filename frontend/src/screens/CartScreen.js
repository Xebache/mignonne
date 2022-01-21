import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";

import styled from "styled-components";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

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

  useEffect(() => {
    if (productId) dispatch(addToCart(productId, qty));
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    console.log("checkout", cartItems)
  }

  return (
    <Container>
      <h1 className="my-5" style={{ fontWeight: "300", fontSize: "2rem" }}>
        Shopping Cart
      </h1>
      {cartItems.length === 0 ? (
        <Container>
          <Message variant="light">
            <Row className="my-5">
              <Col>Your shopping cart is currently empty</Col>
            </Row>
            <Row className="mt-5">
              <Link to="/" style={{ textDecoration: "none", color: "#000000" }}>
                <Button style={{ background: "#bc9105", border: "none" }}>
                  Return to shop
                </Button>
              </Link>
            </Row>
          </Message>
        </Container>
      ) : (
        <Container>
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
                    <Image
                      src={item.image}
                      alt={item.name}
                      style={{ height: "3rem", width: "3rem", borderRadius: "50%" }}
                    />
                  </Td>
                  <td>{item.name}</td>
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
                      variant="light"
                      size="sm"
                      style={{ marginTop: "-.25rem" }}
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
              <Card body style={{ border: "1px solid #bc9105", borderRadius: "0" }}>
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex flex-row justify-content-between flex-wrap">
                    <h2 
                      className="text-nowrap" 
                      style={{ fontSize: ".65rem", fontWeight: "400" }}
                    >SOUS-TOTAL</h2>
                    <p 
                      className="text-nowrap" 
                      style={{ fontSize: ".85rem", marginTop: "-.3rem", marginBottom: "-1rem" }}
                    >
                      {cartItems.reduce((acc, item) => acc + Number(item.price),0)}
                      {" €"}
                    </p>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex flex-row justify-content-between">
                    <h2 style={{ fontSize: ".65rem", fontWeight: "400", marginTop: ".5rem" }}>
                      TOTAL
                    </h2>
                    <p 
                      className="text-nowrap" 
                      style={{ fontSize: ".85rem", marginBottom: "-1rem" }}
                    >
                      {cartItems.reduce((acc, item) => acc + Number(item.price),0)}
                      {" €"}
                    </p>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col lg={{ span: 4, offset: 8 }} sm={{ span: 6, offset: 6 }}>
              <Button 
                variant="dark" 
                className="w-100" 
                style={{border: "none", borderRadius: "0", background: "#bc9105"}}
                onClick={checkoutHandler}
              >Checkout</Button>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default CartScreen;

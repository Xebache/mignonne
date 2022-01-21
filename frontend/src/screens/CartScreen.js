import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";

import styled from "styled-components";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
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

  return (
    <Container>
      <h1>Shopping Cart</h1>
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
                    style={{
                      height: "3rem",
                      width: "3rem",
                      borderRadius: "50%",
                    }}
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
      )}
    </Container>
  );
};

export default CartScreen;

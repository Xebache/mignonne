import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

import Message from "../components/Message";
import { addToCart } from "../actions/cartActions";

const CartScreen = () => {
  const productId = useParams().id;
  const qty = useParams().qty;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) dispatch(addToCart(productId, qty));
  }, [dispatch, productId, qty]);

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
              <th style={{ fontWeight: "500", fontSize: ".75rem" }}>Item</th>
              <th style={{ fontWeight: "500", fontSize: ".75rem" }}>
                Description
              </th>
              <th
                className="text-center text-nowrap"
                style={{ fontWeight: "500", fontSize: ".75rem" }}
              >
                Prix unitaire
              </th>
              <th
                className="text-center"
                style={{ fontWeight: "500", fontSize: ".75rem" }}
              >
                Quantité
              </th>
              <th
                className="text-center"
                style={{ fontWeight: "500", fontSize: ".75rem" }}
              >
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr
                key={item.id}
                className="align-middle"
                style={{ fontWeight: "500", fontSize: ".85rem" }}
              >
                <td style={{ width: "7rem" }}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    style={{
                      height: "3rem",
                      width: "3rem",
                      borderRadius: "50%",
                    }}
                  />
                </td>
                <td>{item.name}</td>
                <td className="text-center ">
                  {item.price === Math.floor(item.price)
                    ? item.price
                    : parseInt(item.price)}
                  {" €"}
                </td>
                <td className="text-center" style={{ width: "7rem" }}>
                  {item.qty}
                </td>
                <td className="text-center">
                  {item.total}
                  {" €"}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default CartScreen;

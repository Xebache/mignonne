import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";

import InputNumber from "../components/InputNumber";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { HandIcon } from "../components/Icons";

const ProductScreen = () => {
  const productId = useParams().id;
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    navigate(`/cart/${productId}/${qty}`);
  };

  return (
    <Container>
      {/* <Link to="/" className="btn btn-light my-3">
        <HandIcon />
      </Link> */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={7} className="text-center">
            {product.images &&
              product.images
                .filter((image) => image.isMain)
                .map((image) => (
                  <Image
                    key={image.path}
                    src={image.path}
                    alt={product.name}
                    fluid
                  />
                ))}
          </Col>
          <Col md={5}>
            <ListGroup variant="flush">
              <ListGroup.Item style={{ border: "none" }}>
                <h5 className="text-nowrap" style={{ fontWeight: "300" }}>
                  {product.name}
                </h5>
              </ListGroup.Item>
              <ListGroup.Item style={{ border: "none" }}>
                {product.description}
              </ListGroup.Item>
              <ListGroup.Item style={{ border: "none" }}>
                <h5>
                  {product.price === Math.floor(product.price)
                    ? product.price
                    : parseInt(product.price)}{" €"}
                </h5>
              </ListGroup.Item>
              {product.quantityInStock === 0 && (
                <ListGroup.Item style={{ border: "none" }}>
                  <p>Out of stock</p>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Row>
                  {product.quantityInStock > 1 && (
                    <Col sm={4} md="{5}" xl={4} xxl={3}>
                      <InputNumber value={qty} setValue={setQty} min={1} max={product.quantityInStock} />
                    </Col>
                  )}
                  <Col>
                    <Button
                      onClick={addToCartHandler}
                      disabled={product.quantityInStock === 0}
                      className="btn-block w-100"
                      type="button"
                      variant="dark"
                      style={{ fontWeight: "200" }}
                    >
                      Ajouter au panier
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="text-center">
                <ListGroup horizontal className="d-flex justify-content-center">
                  <ListGroup.Item style={{ border: "none" }}>
                    <Image
                      src={`${process.env.PUBLIC_URL}/icons/pinterest.svg`}
                      style={{
                        height: "1rem",
                        borderRadius: "50%",
                        opacity: "0.3",
                      }}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item style={{ border: "none" }}>
                    <Image
                      src={`${process.env.PUBLIC_URL}/icons/facebook.svg`}
                      style={{
                        height: "1rem",
                        borderRadius: "50%",
                        opacity: "0.3",
                      }}
                    />
                  </ListGroup.Item>
                </ListGroup>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProductScreen;

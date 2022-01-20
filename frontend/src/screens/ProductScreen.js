import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";

import Error from "../components/Error";
import Loader from "../components/Loader";
import { HandIcon } from "../components/Icons";

function ProductScreen() {
  const urlParam = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(urlParam.id));
  }, [urlParam, dispatch]);

  return (
    <Container>
      <Link to="/" className="btn btn-light my-3">
        <HandIcon />
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error variant="danger">{error}</Error>
      ) : (
        <Row>
          <Col md={7} className="text-center">
            {product.images
              ? product.images
                  .filter((i) => i.isMain)
                  .map((i) => (
                    <Image key={i.path} src={i.path} alt={product.name} fluid />
                  ))
              : null}
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
                    : parseInt(product.price)}{" "}
                  €
                </h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn-block w-100"
                  type="button"
                  variant="dark"
                  style={{ fontWeight: "200" }}
                >
                  Ajouter au panier
                </Button>
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
}

export default ProductScreen;

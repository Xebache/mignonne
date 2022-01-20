import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function Product({ product }) {
  const mainImagePath = product.images.find((i) => i.isMain).path;

  return (
    <Card
      border="light"
      className="my-3 p-3"
      style={{ height: "17.5rem", width: "15rem" }}
    >
      <Link to={`/product/${product.id}`}>
        <Card.Img src={mainImagePath} />
      </Link>
      <Card.Body>
        <Link
          to={`/product/${product.id}`}
          style={{ textDecoration: "none", color: "#000000" }}
        >
          <Card.Title
            className="d-flex justify-content-end text-nowrap"
            style={{ fontWeight: "300", fontSize: "1em" }}
          >
            {product.name}
          </Card.Title>
          <Card.Text className="text-muted d-flex justify-content-end">
            {product.price === Math.floor(product.price)
              ? product.price
              : parseInt(product.price)}{" "}
            €
          </Card.Text>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default Product;

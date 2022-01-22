import React from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

const InputNumber = ({ value, setValue, min, max }) => {

  const decrementQuantity = () => {
    setValue(value - 1);
  };

  const incrementQuantity = () => {
    setValue(value + 1);
  };

  return (
    <InputGroup>
      <Button
        disabled={value === min}
        onClick={decrementQuantity}
        variant="outline-dark"
        type="button"
        style={{ borderRight: "none"}}
      >
        &#45;
      </Button>
      <Form.Control
        disabled={true}
        className="text-center"
        style={{
          background: "transparent",
          color: "#000000",
          border: "1px solid #000000",
          borderRight: "none",
          borderLeft: "none",
        }}
        value={value}
      />
      <Button
        disabled={value === max}
        onClick={incrementQuantity}
        variant="outline-dark"
        type="button"
        style={{ borderLeft: "none"}}
      >
        &#43;
      </Button>
    </InputGroup>
  );
};

export default InputNumber;

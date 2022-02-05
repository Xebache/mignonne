import React from 'react';

import { BlackCard } from "../../customMaterials/Card";

const ColorCard = () => {
  return (
      <BlackCard style={{ width: "27rem", margin: ".5rem" }}>
          <h2
          className="mb-4"
          style={{ fontWeight: "200", fontSize: "1.5rem", textAlign: "center" }}
        >
          Couleurs
        </h2>
      </BlackCard>
  );
}

export default ColorCard;

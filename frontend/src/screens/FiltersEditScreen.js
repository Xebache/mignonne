import React from "react";

import Container from "react-bootstrap/Container";

import CategoryCard from "../components/filter/categories/CategoryCard";
import CollectionCard from "../components/filter/collections/CollectionCard";


const FiltersEditScreen = () => {

  return (
    <Container className="d-flex flex-row flex-wrap">
      <CategoryCard/>
      <CollectionCard/>
    </Container>
  );
};

export default FiltersEditScreen;

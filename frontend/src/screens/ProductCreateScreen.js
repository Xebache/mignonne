import React, { useEffect } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { listCategories } from "../actions/categoryActions";

import CreateForm from '../components/product/CreateForm';

function ProductCreateScreen() {

  return <div>
      <CreateForm />
  </div>;
}

export default ProductCreateScreen;

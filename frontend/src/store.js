import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userLoginReducer } from "./reducers/userReducer";


const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  loggedUser: userLoginReducer
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

  const currentUserFromStorage = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : [];

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  loggedUser: { currentUser: currentUserFromStorage }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

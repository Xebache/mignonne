import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import { categoryListReducer } from "./reducers/categoryReducers";
import {
  productDetailsReducer,
  productListReducer,
  productDeleteReducer,
  productCreateReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userLoginReducer,
  userSignupReducer,
  userProfileReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducer";

const reducer = combineReducers({
  cart: cartReducer,
  categoryList: categoryListReducer,
  productCreate: productCreateReducer,
  productDelete: productDeleteReducer,
  productDetails: productDetailsReducer,
  productList: productListReducer,
  userLogin: userLoginReducer,
  userProfile: userProfileReducer,
  userSignup: userSignupReducer,
  userUpdateProfile: userUpdateProfileReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : null;

const currentUserFromStorage = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { currentUser: currentUserFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

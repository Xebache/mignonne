import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import {
  categoryListReducer,
  categoryCreateReducer,
  categoryUpdateReducer,
  collectionListReducer,
  collectionCreateReducer,
  collectionUpdateReducer,
} from "./reducers/filterReducers";
import {
  productDetailsReducer,
  productListReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productUploadImageReducer,
  productDeleteImageReducer,
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
  categoryCreate: categoryCreateReducer,
  categoryUpdate: categoryUpdateReducer,

  collectionList: collectionListReducer,
  collectionCreate: collectionCreateReducer,
  collectionUpdate: collectionUpdateReducer,

  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  productDetails: productDetailsReducer,
  productList: productListReducer,
  productUploadImage: productUploadImageReducer,
  productDeleteImage: productDeleteImageReducer,

  userLogin: userLoginReducer,
  userProfile: userProfileReducer,
  userSignup: userSignupReducer,
  userUpdateProfile: userUpdateProfileReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

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

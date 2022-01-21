import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const {data} = await axios.get(`/api/products/${id}`);
  dispatch({ 
    type: CART_ADD_ITEM,
    payload: {
      id: data.id,
      name: data.name,
      price: data.price,
      image: data.images.find(image => image.isMain).path,
      quantityInStock: data.quantityInStock,
      qty,
      total: data.price * qty
    }
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
};

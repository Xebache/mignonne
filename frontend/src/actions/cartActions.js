import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants"

export const cartItems = (id) => async (dispatch) => {
    try {
      dispatch({ type: CART_ADD_ITEM });
      const { itemExist } = await axios.get(`/api/products/${id}`);
  
      
    } catch (error) {
      
    }
  };
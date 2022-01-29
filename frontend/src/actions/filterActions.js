import axios from "axios";
import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  COLLECTION_LIST_REQUEST,
  COLLECTION_LIST_SUCCESS,
  COLLECTION_LIST_FAIL,
} from "../constants/filterConstants";

export const listCategories = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });
    const { userLogin: { currentUser } } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${currentUser.token}`,
      },
    };
    const { data } = await axios.get(`/api/filters/categories`, config);
    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listCollections = () => async (dispatch, getState) => {
  try {
    dispatch({ type: COLLECTION_LIST_REQUEST });
    const { userLogin: { currentUser } } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${currentUser.token}`,
      },
    };
    const { data } = await axios.get(`/api/filters/collections`, config);
    dispatch({ type: COLLECTION_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COLLECTION_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

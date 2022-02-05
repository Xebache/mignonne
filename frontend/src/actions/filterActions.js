import axios from "axios";
import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_RESET,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_UPDATE_RESET,

  COLLECTION_LIST_REQUEST,
  COLLECTION_LIST_SUCCESS,
  COLLECTION_LIST_FAIL,
  COLLECTION_CREATE_REQUEST,
  COLLECTION_CREATE_SUCCESS,
  COLLECTION_CREATE_FAIL,
  COLLECTION_CREATE_RESET,
  COLLECTION_UPDATE_REQUEST,
  COLLECTION_UPDATE_SUCCESS,
  COLLECTION_UPDATE_FAIL,
  COLLECTION_UPDATE_RESET,
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

export const createCategory = (category) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_CREATE_REQUEST });
    const { userLogin: { currentUser } } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${currentUser.token}`,
      },
    };
    const { data } = await axios.post(`/api/filters/categories/create/`, category, config);
    dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CATEGORY_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
}

export const updateCategory = (category) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_UPDATE_REQUEST });
    const { userLogin: { currentUser } } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${currentUser.token}`,
      },
    };
    const { data } = await axios.post(`/api/filters/categories/update/${category.id}/`, category, config);
    dispatch({ type: CATEGORY_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CATEGORY_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
}

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

export const createCollection = (collection) => async (dispatch, getState) => {
  try {
    dispatch({ type: COLLECTION_CREATE_REQUEST });
    const { userLogin: { currentUser } } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${currentUser.token}`,
      },
    };
    const { data } = await axios.post(`/api/filters/collections/create/`, collection, config);
    dispatch({ type: COLLECTION_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COLLECTION_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
}

export const updateCollection = (collection) => async (dispatch, getState) => {
  try {
    dispatch({ type: COLLECTION_UPDATE_REQUEST });
    const { userLogin: { currentUser } } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${currentUser.token}`,
      },
    };
    const { data } = await axios.post(`/api/filters/collections/update/${collection.id}/`, collection, config);
    dispatch({ type: COLLECTION_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COLLECTION_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
}

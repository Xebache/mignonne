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

export const categoryListReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true, categories: [] };

    case CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };

    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const categoryCreateReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORY_CREATE_REQUEST:
      return { loading: true };

    case CATEGORY_CREATE_SUCCESS:
      return { loading: false, success: true, category: action.payload };

    case CATEGORY_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case CATEGORY_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const categoryUpdateReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORY_UPDATE_REQUEST:
      return { loading: true };

    case CATEGORY_UPDATE_SUCCESS:
      return { loading: false, success: true, category: action.payload };

    case CATEGORY_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case CATEGORY_UPDATE_RESET:
      return { category: {} };

    default:
      return state;
  }
};

export const collectionListReducer = (state = { collections: [] }, action) => {
  switch (action.type) {
    case COLLECTION_LIST_REQUEST:
      return { loading: true, collections: [] };

    case COLLECTION_LIST_SUCCESS:
      return { loading: false, collections: action.payload };

    case COLLECTION_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const collectionCreateReducer = (state = { collection: {} }, action) => {
  switch (action.type) {
    case COLLECTION_CREATE_REQUEST:
      return { loading: true };

    case COLLECTION_CREATE_SUCCESS:
      return { loading: false, success: true, collection: action.payload };

    case COLLECTION_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case COLLECTION_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const collectionUpdateReducer = (state = { collection: {} }, action) => {
  switch (action.type) {
    case COLLECTION_UPDATE_REQUEST:
      return { loading: true };

    case COLLECTION_UPDATE_SUCCESS:
      return { loading: false, success: true, collection: action.payload };

    case COLLECTION_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case COLLECTION_UPDATE_RESET:
      return { collection: {} };

    default:
      return state;
  }
};


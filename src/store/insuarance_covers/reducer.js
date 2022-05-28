import {
  FETCHING_INSUARANCE_COVERS_LIST,
  FETCHING_INSUARANCE_COVERS_SUCCESS,
  FETCHING_INSUARANCE_COVERS_FAILURE,
  ADDING_INSUARANCE_COVER,
  ADDING_INSUARANCE_COVER_SUCCESS,
  ADDING_INSUARANCE_COVER_FAILURE,
} from './types';

const initialState = {
  isFetching: false,
  isAdding: false,
  insuaranceCovers: [],
  error: null,
  message: null,
};

export default (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case FETCHING_INSUARANCE_COVERS_LIST:
      return {
        ...state,
        isFetching: true,
        isAdding: false,
        error: null,
        message: null,
      };
    case FETCHING_INSUARANCE_COVERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAdding: false,
        insuaranceCovers: payload,
        error: null,
        message: null,
      };
    case FETCHING_INSUARANCE_COVERS_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAdding: false,
        error: payload,
        message: null,
      };
    case ADDING_INSUARANCE_COVER:
      return {
        ...state,
        isFetching: false,
        isAdding: true,
        error: null,
        message: null,
      };
    case ADDING_INSUARANCE_COVER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAdding: false,
        error: null,
        message: payload,
      };
    case ADDING_INSUARANCE_COVER_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAdding: false,
        error: payload,
        message: null,
      };
    default:
      return state;
  }
};

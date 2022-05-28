import {
  FETCH_OPTIONS,
  FETCH_OPTIONS_SUCCESS,
  FETCH_OPTIONS_FAILURE,
  ADD_TRANSACTION,
  ADD_TRANSACTION_SUCCESS,
  ADD_TRANSACTION_FAILURE,
  FETCH_TRANSACTIONS,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_TRANSACTIONS_FAILURE,
  FETCH_TRANSACTIONS_BY_ID,
  FETCH_TRANSACTIONS_BY_ID_SUCCESS,
  FETCH_TRANSACTIONS_BY_ID_FAILURE,
} from './types';

const initialState = {
  options: [],
  loading: false,
  error: null,
  message: null,
  transactions: [],
  transaction: {},
};

export default (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case FETCH_OPTIONS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_OPTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        options: payload,
        error: null,
      };
    case FETCH_OPTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case ADD_TRANSACTION:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };
    case ADD_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        message: payload,
      };
    case ADD_TRANSACTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        message: null,
      };
    case FETCH_TRANSACTIONS:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };
    case FETCH_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        transactions: payload,
        error: null,
      };
    case FETCH_TRANSACTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case FETCH_TRANSACTIONS_BY_ID:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };
    case FETCH_TRANSACTIONS_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        transaction: payload,
        error: null,
      };
    case FETCH_TRANSACTIONS_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

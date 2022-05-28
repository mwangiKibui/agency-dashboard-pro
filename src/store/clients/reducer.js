import {
  GET_CLIENTS_SUCCESS,
  GET_CLIENTS_FAILED,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_FAILED,
  GET_SINGLE_CLIENT_SUCCESS,
  GET_SINGLE_CLIENT_FAILED,
  CLIENTS_RESET,
  GET_CLIENTS_START,
} from './types';

const initialState = {
  isFetching: false,
  isFetched: false,
  additionSuccess: false,
  additionFailed: false,
  data: [],
  client: {},
  error: '',
};

export default (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case CLIENTS_RESET:
      return {
        additionSuccess: false,
        additionFailed: false,
        error: '',
      };
    case GET_CLIENTS_START:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
        error: '',
      };
    case GET_CLIENTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        data: payload,
      };
    case GET_CLIENTS_FAILED:
      return {
        ...state,
        isFetching: false,
        isFetched: false,
        error: payload,
      };
    case ADD_CLIENT_SUCCESS:
      return {
        ...state,
        additionSuccess: true,
        additionFailed: false,
        error: '',
      };
    case ADD_CLIENT_FAILED:
      return {
        ...state,
        error: payload,
        additionFailed: true,
        additionSuccess: false,
      };
    case GET_SINGLE_CLIENT_SUCCESS: // Todo: To be changed when using an API.
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        client: payload,
      };
    case GET_SINGLE_CLIENT_FAILED:
      return {
        ...state,
        isFetching: false,
        isFetched: false,
        error: payload,
      };
    default:
      return state;
  }
};

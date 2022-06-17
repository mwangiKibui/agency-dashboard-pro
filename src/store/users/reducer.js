import {
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
} from './types';

const initialState = {
  users: [],
  loading: false,
  error: null,
  message: null,
};

export default (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case ADD_USER:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        message: payload.message,
      };
    case ADD_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        message: null,
      };
    case GET_USERS:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        users: payload.users,
      };
    case GET_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.message,
        message: null,
      };
    case UPDATE_USER:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        users: state.users.map((user) => {
          if (user.id === payload.user.id) {
            return {
              ...user,
              name: payload.user.name,
              email: payload.user.email,
            };
          }
          return user;
        }),
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        message: null,
      };
    case DELETE_USER:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        message: payload.message,
        users: state.users.filter((user) => user.id !== payload.user.id),
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        message: null,
      };
    default:
      return state;
  }
};

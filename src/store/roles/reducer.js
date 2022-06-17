import {
  ADD_ROLE,
  ADD_ROLE_SUCCESS,
  ADD_ROLE_FAILURE,
  GET_ROLES,
  GET_ROLES_SUCCESS,
  GET_ROLES_FAILURE,
  UPDATE_ROLE,
  UPDATE_ROLE_SUCCESS,
  UPDATE_ROLE_FAILURE,
  DELETE_ROLE,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_FAILURE,
  ROLE_OPTIONS,
  ROLE_OPTIONS_SUCCESS,
  ROLE_OPTIONS_FAILURE,
} from './types';

const initialState = {
  roles: [],
  options: [],
  loading: false,
  error: null,
  message: null,
};

export default (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case ADD_ROLE:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };
    case ADD_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        message: payload.message,
      };
    case ADD_ROLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        message: null,
      };
    case GET_ROLES:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };
    case GET_ROLES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        roles: payload.roles,
        message: null,
      };
    case GET_ROLES_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        message: null,
      };
    case UPDATE_ROLE:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };
    case UPDATE_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        message: payload.message,
        roles: state.roles.map((role) => {
          if (role.id === payload.role.id) {
            return {
              ...role,
              name: payload.role.name,
              description: payload.role.description,
            };
          }
          return role;
        }),
      };
    case UPDATE_ROLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        message: null,
      };
    case DELETE_ROLE:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };
    case DELETE_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        message: payload.message,
        roles: state.roles.filter((role) => role.id !== payload.role.id),
      };
    case DELETE_ROLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        message: null,
      };
    case ROLE_OPTIONS:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };
    case ROLE_OPTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        options: payload.role_options,
        message: null,
      };
    case ROLE_OPTIONS_FAILURE:
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

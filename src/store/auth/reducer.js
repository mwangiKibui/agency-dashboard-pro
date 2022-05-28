import {
  IS_LOGIN_FAILED,
  IS_LOGIN_SUCCESSFUL,
  IS_REGISTER_FAILED,
  IS_REGISTER_SUCCESSFUL,
  LOG_OUT,
  RESET,
} from './types';

const initialState = {
  isLoggedIn: false,
  isLoginSuccessful: false,
  isLoginFailed: false,
  isRegisterSuccessful: false,
  isRegisterFailed: false,
  auth_token: '',
  error: '',
  user: {},
};

export default (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case RESET:
      return {
        ...state,
        isLoggedIn: false,
        isLoginSuccessful: false,
        isLoginFailed: false,
        isRegisterSuccessful: false,
        isRegisterFailed: false,
        auth_token: '',
        error: '',
        user: {},
      };
    case IS_LOGIN_SUCCESSFUL:
      return {
        ...state,
        isLoggedIn: true,
        isLoginSuccessful: true,
        isLoginFailed: false,
        auth_token: payload.token,
        error: '',
        isRegisterSuccessful: false,
        isRegisterFailed: false,
        user: payload.user,
      };
    case IS_LOGIN_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        isLoginSuccessful: false,
        isLoginFailed: true,
        error: payload,
        auth_token: '',
        isRegisterSuccessful: false,
        isRegisterFailed: false,
        user: {},
      };
    case IS_REGISTER_SUCCESSFUL:
      return {
        ...state,
        isLoggedIn: true,
        isRegisterSuccessful: true,
        isRegisterFailed: false,
        auth_token: payload.token,
        error: '',
        isLoginSuccessful: false,
        isLoginFailed: false,
        user: payload.token,
      };
    case IS_REGISTER_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        isRegisterSuccessful: false,
        isRegisterFailed: true,
        error: payload,
        auth_token: '',
        isLoginSuccessful: false,
        isLoginFailed: false,
        user: {},
      };
    case LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        isLoginSuccessful: false,
        isLoginFailed: false,
        isRegisterSuccessful: false,
        isRegisterFailed: false,
        auth_token: '',
        error: '',
        user: {},
      };
    default:
      return state;
  }
};

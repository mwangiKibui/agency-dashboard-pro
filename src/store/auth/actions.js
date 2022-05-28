import {
  IS_LOGIN_SUCCESSFUL,
  IS_LOGIN_FAILED,
  IS_REGISTER_FAILED,
  IS_REGISTER_SUCCESSFUL,
  LOG_OUT,
  RESET,
} from './types';
import URL from '../../config/url';

export const login = (data) => (dispatch) => {
  // send request.
  let responseStatusCode = 0;
  try {
    fetch(`${URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        responseStatusCode = response.status;
        return response.json();
      })
      .then((res) => {
        console.log('res', res);
        console.log('responseStatusCode', responseStatusCode);
        if (responseStatusCode === 200) {
          dispatch({
            type: IS_LOGIN_SUCCESSFUL,
            payload: {
              token: res.token,
              user: res.user,
            },
          });
        } else {
          // When failed.
          dispatch({
            type: IS_LOGIN_FAILED,
            payload: res.message,
          });
        }
      });
  } catch (error) {
    dispatch({
      type: IS_LOGIN_FAILED,
      payload: error,
    });
  }
};

export const register = (data) => (dispatch) => {
  // send request.
  let responseStatusCode = 0;
  try {
    fetch(`${URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        responseStatusCode = response.status;
        return response.json();
      })
      .then((res) => {
        console.log('res', res);
        console.log('responseStatusCode', responseStatusCode);
        if (responseStatusCode === 200) {
          dispatch({
            type: IS_REGISTER_SUCCESSFUL,
            payload: {
              token: res.token,
              user: res.user,
            },
          });
        } else {
          // When failed.
          dispatch({
            type: IS_REGISTER_FAILED,
            payload: res.message,
          });
        }
      });
  } catch (error) {
    dispatch({
      type: IS_REGISTER_FAILED,
      payload: error,
    });
  }
};

export const resetAuth = () => (dispatch) => {
  dispatch({
    type: RESET,
  });
};

export const loginSuccessful = (data) => ({
  type: IS_LOGIN_SUCCESSFUL,
  payload: data,
});

export const loginFailed = (data) => ({
  type: IS_LOGIN_FAILED,
  payload: data,
});

export const registrationSuccessful = (data) => ({
  type: IS_REGISTER_SUCCESSFUL,
  payload: data,
});

export const registrationFailed = (data) => ({
  type: IS_REGISTER_FAILED,
  payload: data,
});

export const logout = () => ({
  type: LOG_OUT,
});

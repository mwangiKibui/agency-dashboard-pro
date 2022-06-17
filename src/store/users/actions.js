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
import URL from '../../config/url';

// adding a user.
export const addUser = (accessToken, data) => async (dispatch) => {
  let responseStatusCode = 0;
  dispatch({ type: ADD_USER });
  try {
    const response = await fetch(`${URL}/api/user/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    responseStatusCode = response.status;
    if (responseStatusCode === 201) {
      dispatch({ type: ADD_USER_SUCCESS, payload: json });
    } else {
      dispatch({ type: ADD_USER_FAILURE, payload: json.message });
    }
  } catch (error) {
    dispatch({ type: ADD_USER_FAILURE, payload: error });
  }
};

// getting all users.
export const getUsers = (accessToken) => async (dispatch) => {
  let responseStatusCode = 0;
  dispatch({ type: GET_USERS });
  try {
    const response = await fetch(`${URL}/api/user/get_all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const json = await response.json();
    responseStatusCode = response.status;
    if (responseStatusCode === 200) {
      dispatch({ type: GET_USERS_SUCCESS, payload: json });
    } else {
      dispatch({ type: GET_USERS_FAILURE, payload: json.message });
    }
  } catch (error) {
    dispatch({ type: GET_USERS_FAILURE, payload: error });
  }
};

// updating a user.
export const updateUser = (accessToken, userId, data) => async (dispatch) => {
  let responseStatusCode = 0;
  dispatch({ type: UPDATE_USER });
  try {
    const response = await fetch(`${URL}/api/user/update/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    responseStatusCode = response.status;
    if (responseStatusCode === 200) {
      dispatch({ type: UPDATE_USER_SUCCESS, payload: json });
    } else {
      dispatch({ type: UPDATE_USER_FAILURE, payload: json.message });
    }
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAILURE, payload: error });
  }
};

// deleting a user.
export const deleteUser = (accessToken, userId) => async (dispatch) => {
  let responseStatusCode = 0;
  dispatch({ type: DELETE_USER });
  try {
    const response = await fetch(`${URL}/api/user/delete/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: '',
    });
    const json = await response.json();
    responseStatusCode = response.status;
    if (responseStatusCode === 200) {
      dispatch({ type: DELETE_USER_SUCCESS, payload: json });
    } else {
      dispatch({ type: DELETE_USER_FAILURE, payload: json.message });
    }
  } catch (error) {
    dispatch({ type: DELETE_USER_FAILURE, payload: error });
  }
};

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
import URL from '../../config/url';

export const addRole = (accessToken, data) => async (dispatch) => {
  let responseStatusCode = 0;
  dispatch({ type: ADD_ROLE });
  try {
    const response = await fetch(`${URL}/api/role/create`, {
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
      dispatch({ type: ADD_ROLE_SUCCESS, payload: json });
    } else {
      dispatch({ type: ADD_ROLE_FAILURE, payload: json.message });
    }
  } catch (error) {
    dispatch({ type: ADD_ROLE_FAILURE, payload: error });
  }
};

export const getRoles = (accessToken) => async (dispatch) => {
  let responseStatusCode = 0;
  dispatch({ type: GET_ROLES });
  try {
    const response = await fetch(`${URL}/api/role/get_all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const json = await response.json();
    responseStatusCode = response.status;
    if (responseStatusCode === 200) {
      dispatch({ type: GET_ROLES_SUCCESS, payload: json });
    } else {
      dispatch({ type: GET_ROLES_FAILURE, payload: json.message });
    }
  } catch (error) {
    dispatch({ type: GET_ROLES_FAILURE, payload: error });
  }
};

export const updateRole = (accessToken, roleId, data) => async (dispatch) => {
  let responseStatusCode = 0;
  dispatch({ type: UPDATE_ROLE });
  try {
    const response = await fetch(`${URL}/api/role/update/${roleId}`, {
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
      dispatch({ type: UPDATE_ROLE_SUCCESS, payload: json });
    } else {
      dispatch({ type: UPDATE_ROLE_FAILURE, payload: json.message });
    }
  } catch (error) {
    dispatch({ type: UPDATE_ROLE_FAILURE, payload: error });
  }
};

export const deleteRole = (accessToken, roleId) => async (dispatch) => {
  dispatch({ type: DELETE_ROLE });
  let responseStatusCode = 0;
  try {
    const response = await fetch(`${URL}/api/role/delete/${roleId}`, {
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
      dispatch({ type: DELETE_ROLE_SUCCESS, payload: json });
    } else {
      dispatch({ type: DELETE_ROLE_FAILURE, payload: json.message });
    }
  } catch (error) {
    dispatch({ type: DELETE_ROLE_FAILURE, payload: error });
  }
};

export const getRoleOptions = (accessToken) => async (dispatch) => {
  dispatch({ type: ROLE_OPTIONS });
  let responseStatusCode = 0;
  try {
    const response = await fetch(`${URL}/api/role/options`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const json = await response.json();
    responseStatusCode = response.status;
    if (responseStatusCode === 200) {
      dispatch({ type: ROLE_OPTIONS_SUCCESS, payload: json });
    } else {
      dispatch({ type: ROLE_OPTIONS_FAILURE, payload: json.message });
    }
  } catch (error) {
    dispatch({ type: ROLE_OPTIONS_FAILURE, payload: error });
  }
};

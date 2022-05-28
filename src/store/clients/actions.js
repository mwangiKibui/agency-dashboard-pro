import {
  ADD_CLIENT_FAILED,
  ADD_CLIENT_SUCCESS,
  CLIENTS_RESET,
  GET_CLIENTS_START,
  GET_CLIENTS_FAILED,
  GET_CLIENTS_SUCCESS,
  GET_SINGLE_CLIENT_SUCCESS,
  // GET_SINGLE_CLIENT_FAILED,
} from './types';
import URL from '../../config/url';

export const getClients = (token) => (dispatch) => {
  let responseStatusCode = 0;
  dispatch({
    type: GET_CLIENTS_START,
  });
  try {
    fetch(`${URL}/api/client/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        responseStatusCode = res.status;
        return res.json();
      })
      .then((res) => {
        console.log('clients', res.clients);
        if (responseStatusCode === 200) {
          dispatch({
            type: GET_CLIENTS_SUCCESS,
            payload: res.clients,
          });
        } else {
          dispatch({
            type: GET_CLIENTS_FAILED,
            payload: res.message,
          });
        }
      });
  } catch (error) {
    dispatch({
      type: GET_CLIENTS_FAILED,
      payload: error.message,
    });
  }
};

export const addClient = (token, data) => (dispatch) => {
  let responseStatusCode = 0;
  try {
    fetch(`${URL}/api/client/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        responseStatusCode = res.status;
        return res.json();
      })
      .then((res) => {
        if (responseStatusCode === 201) {
          dispatch({
            type: ADD_CLIENT_SUCCESS,
            payload: res,
          });
        } else {
          console.log(`error`, res.message);
          dispatch({
            type: ADD_CLIENT_FAILED,
            payload: res.message,
          });
        }
      });
  } catch (error) {
    dispatch({
      type: ADD_CLIENT_FAILED,
      payload: error,
    });
  }

  // {
  //     type: ADD_CLIENT_SUCCESS,
  //     payload: {
  //         id:Math.ceil(Math.random() * 100) + 10,
  //         ...data
  //     }
  // }
};

export const getSingleClient = (
  id // todo: When fetching from API, we will add failed state.
) => ({
  type: GET_SINGLE_CLIENT_SUCCESS,
  payload: id,
});

export const clientsReset = () => (dispatch) =>
  dispatch({
    type: CLIENTS_RESET,
  });

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
import URL from '../../config/url';

export const fetchOptions = (authToken) => (dispatch) => {
  let responseStatusCode = 0;
  dispatch({
    type: FETCH_OPTIONS,
  });
  try {
    fetch(`${URL}/api/options`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => {
        responseStatusCode = res.status;
        return res.json();
      })
      .then((res) => {
        if (responseStatusCode === 200) {
          dispatch({
            type: FETCH_OPTIONS_SUCCESS,
            payload: res.data,
          });
        } else {
          dispatch({
            type: FETCH_OPTIONS_FAILURE,
            payload: res.message,
          });
        }
      });
  } catch (error) {
    dispatch({
      type: FETCH_OPTIONS_FAILURE,
      payload: error.message,
    });
  }
};

export const addTransaction = (authToken, data) => async (dispatch) => {
  let responseStatusCode = 0;
  dispatch({
    type: ADD_TRANSACTION,
  });
  try {
    const res = await fetch(`${URL}/api/transaction/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(data),
    });
    responseStatusCode = res.status;
    const resData = await res.json();
    if (responseStatusCode === 201) {
      dispatch({
        type: ADD_TRANSACTION_SUCCESS,
        payload: resData.message,
      });
    } else {
      dispatch({
        type: ADD_TRANSACTION_FAILURE,
        payload: resData.message,
      });
    }
  } catch (error) {
    dispatch({
      type: ADD_TRANSACTION_FAILURE,
      payload: error.message,
    });
  }
};

export const fetchTransactions = (authToken) => async (dispatch) => {
  let responseStatusCode = 0;
  dispatch({
    type: FETCH_TRANSACTIONS,
  });
  try {
    const res = await fetch(`${URL}/api/transaction/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    responseStatusCode = res.status;
    const resData = await res.json();
    if (responseStatusCode === 200) {
      dispatch({
        type: FETCH_TRANSACTIONS_SUCCESS,
        payload: resData.data,
      });
    } else {
      dispatch({
        type: FETCH_TRANSACTIONS_FAILURE,
        payload: resData.message,
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_TRANSACTIONS_FAILURE,
      payload: error.message,
    });
  }
};

export const fetchTransactionById = (authToken, id) => async (dispatch) => {
  let responseStatusCode = 0;
  dispatch({
    type: FETCH_TRANSACTIONS_BY_ID,
  });
  try {
    const res = await fetch(`${URL}/api/transaction/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    responseStatusCode = res.status;
    const resData = await res.json();
    console.log(resData);
    if (responseStatusCode === 200) {
      dispatch({
        type: FETCH_TRANSACTIONS_BY_ID_SUCCESS,
        payload: resData.data,
      });
    } else {
      dispatch({
        type: FETCH_TRANSACTIONS_BY_ID_FAILURE,
        payload: resData.message,
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_TRANSACTIONS_BY_ID_FAILURE,
      payload: error.message,
    });
  }
};

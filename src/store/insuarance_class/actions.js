import {
  FETCHING_INSUARANCE_CLASSES_LIST,
  FETCHING_INSUARANCE_CLASSES_SUCCESS,
  FETCHING_INSUARANCE_CLASSES_FAILURE,
  ADDING_INSUARANCE_CLASS,
  ADDING_INSUARANCE_CLASS_SUCCESS,
  ADDING_INSUARANCE_CLASS_FAILURE,
} from './types';
import URL from '../../config/url';

export const fetchInsuaranceClasses = (authToken) => async (dispatch) => {
  let responseStatusCode = 0;
  try {
    dispatch({
      type: FETCHING_INSUARANCE_CLASSES_LIST,
    });
    const response = await fetch(`${URL}/api/insuarance/classes/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    responseStatusCode = response.status;
    const responseJson = await response.json();
    if (responseStatusCode === 200) {
      return dispatch({
        type: FETCHING_INSUARANCE_CLASSES_SUCCESS,
        payload: responseJson.data,
      });
    }
    return dispatch({
      type: FETCHING_INSUARANCE_CLASSES_FAILURE,
      payload: responseJson.message,
    });
  } catch (error) {
    return dispatch({
      type: FETCHING_INSUARANCE_CLASSES_FAILURE,
      payload: error,
    });
  }
};

export const addInsuaranceClass = (authToken, data) => async (dispatch) => {
  let responseStatusCode = 0;
  try {
    dispatch({
      type: ADDING_INSUARANCE_CLASS,
    });
    const response = await fetch(`${URL}/api/insuarance/classes/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(data),
    });
    responseStatusCode = response.status;
    const responseJson = await response.json();
    if (responseStatusCode === 201) {
      return dispatch({
        type: ADDING_INSUARANCE_CLASS_SUCCESS,
        payload: responseJson.message,
      });
    }
    return dispatch({
      type: ADDING_INSUARANCE_CLASS_FAILURE,
      payload: responseJson.message,
    });
  } catch (error) {
    return dispatch({
      type: ADDING_INSUARANCE_CLASS_FAILURE,
      payload: error,
    });
  }
};

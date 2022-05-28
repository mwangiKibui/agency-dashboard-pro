import {
  FETCHING_INSUARANCE_COVERS_LIST,
  FETCHING_INSUARANCE_COVERS_SUCCESS,
  FETCHING_INSUARANCE_COVERS_FAILURE,
  ADDING_INSUARANCE_COVER,
  ADDING_INSUARANCE_COVER_SUCCESS,
  ADDING_INSUARANCE_COVER_FAILURE,
} from './types';
import URL from '../../config/url';

export const fetchInsuranceCovers = (authToken) => async (dispatch) => {
  try {
    dispatch({
      type: FETCHING_INSUARANCE_COVERS_LIST,
    });
    const response = await fetch(`${URL}/api/insuarance/covers/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    const responseJson = await response.json();
    if (response.status === 200) {
      return dispatch({
        type: FETCHING_INSUARANCE_COVERS_SUCCESS,
        payload: responseJson.data,
      });
    }
    return dispatch({
      type: FETCHING_INSUARANCE_COVERS_FAILURE,
      payload: responseJson.message,
    });
  } catch (error) {
    return dispatch({
      type: FETCHING_INSUARANCE_COVERS_FAILURE,
      payload: error,
    });
  }
};

export const addInsuaranceCover = (authToken, data) => async (dispatch) => {
  try {
    dispatch({
      type: ADDING_INSUARANCE_COVER,
    });
    const response = await fetch(`${URL}/api/insuarance/covers/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(data),
    });
    const responseJson = await response.json();
    if (response.status === 201) {
      return dispatch({
        type: ADDING_INSUARANCE_COVER_SUCCESS,
        payload: responseJson.message,
      });
    }
    return dispatch({
      type: ADDING_INSUARANCE_COVER_FAILURE,
      payload: responseJson.message,
    });
  } catch (error) {
    return dispatch({
      type: ADDING_INSUARANCE_COVER_FAILURE,
      payload: error,
    });
  }
};

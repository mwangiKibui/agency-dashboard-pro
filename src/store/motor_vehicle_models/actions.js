import {
  MOTOR_VEHICLE_MODELS_LIST,
  MOTOR_VEHICLE_MODELS_SUCCESS,
  MOTOR_VEHICLE_MODELS_FAILURE,
  ADDING_MOTOR_VEHICLE_MODEL,
  ADDING_MOTOR_VEHICLE_MODEL_SUCCESS,
  ADDING_MOTOR_VEHICLE_MODEL_FAILURE,
} from './types';

import URL from '../../config/url';

export const fetchMotorVehicleModels = (authToken) => async (dispatch) => {
  try {
    dispatch({
      type: MOTOR_VEHICLE_MODELS_LIST,
    });
    const response = await fetch(`${URL}/api/motor_vehicle/models/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    const responseJson = await response.json();
    if (response.status === 200) {
      return dispatch({
        type: MOTOR_VEHICLE_MODELS_SUCCESS,
        payload: responseJson.data,
      });
    }
    return dispatch({
      type: MOTOR_VEHICLE_MODELS_FAILURE,
      payload: responseJson.message,
    });
  } catch (error) {
    return dispatch({
      type: MOTOR_VEHICLE_MODELS_FAILURE,
      payload: error,
    });
  }
};

export const addMotorVehicle = (authToken, data) => async (dispatch) => {
  try {
    dispatch({
      type: ADDING_MOTOR_VEHICLE_MODEL,
    });
    const response = await fetch(`${URL}/api/motor_vehicle/models/add`, {
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
        type: ADDING_MOTOR_VEHICLE_MODEL_SUCCESS,
        payload: responseJson.message,
      });
    }
    return dispatch({
      type: ADDING_MOTOR_VEHICLE_MODEL_FAILURE,
      payload: responseJson.message,
    });
  } catch (error) {
    return dispatch({
      type: ADDING_MOTOR_VEHICLE_MODEL_FAILURE,
      payload: error,
    });
  }
};

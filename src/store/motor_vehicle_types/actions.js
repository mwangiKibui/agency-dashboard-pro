import {
  MOTOR_VEHICLE_TYPES_LIST,
  MOTOR_VEHICLE_TYPES_SUCCESS,
  MOTOR_VEHICLE_TYPES_FAILURE,
  ADDING_MOTOR_VEHICLE_TYPE,
  ADDING_MOTOR_VEHICLE_TYPE_SUCCESS,
  ADDING_MOTOR_VEHICLE_TYPE_FAILURE,
} from './types';

import URL from '../../config/url';

export const fetchMotorVehicleTypes = (authToken) => async (dispatch) => {
  try {
    dispatch({
      type: MOTOR_VEHICLE_TYPES_LIST,
    });
    const response = await fetch(`${URL}/api/motor_vehicle/types/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    const responseJson = await response.json();
    if (response.status === 200) {
      return dispatch({
        type: MOTOR_VEHICLE_TYPES_SUCCESS,
        payload: responseJson.data,
      });

    }
    
      return dispatch({
        type: MOTOR_VEHICLE_TYPES_FAILURE,
        payload: responseJson.message,
      });
    
  } catch (error) {
    return dispatch({
      type: MOTOR_VEHICLE_TYPES_FAILURE,
      payload: error,
    });
  }
};

export const addMotorVehicleType = (authToken, data) => async (dispatch) => {
  try {
    dispatch({
      type: ADDING_MOTOR_VEHICLE_TYPE,
    });
    const response = await fetch(`${URL}/api/motor_vehicle/types/add`, {
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
        type: ADDING_MOTOR_VEHICLE_TYPE_SUCCESS,
        payload: responseJson.message,
      });
    }
      return dispatch({
        type: ADDING_MOTOR_VEHICLE_TYPE_FAILURE,
        payload: responseJson.message,
      });
    
  } catch (error) {
    return dispatch({
      type: ADDING_MOTOR_VEHICLE_TYPE_FAILURE,
      payload: error,
    });
  }
};

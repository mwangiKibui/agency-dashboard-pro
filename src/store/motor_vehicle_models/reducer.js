import {
  MOTOR_VEHICLE_MODELS_LIST,
  MOTOR_VEHICLE_MODELS_SUCCESS,
  MOTOR_VEHICLE_MODELS_FAILURE,
  ADDING_MOTOR_VEHICLE_MODEL,
  ADDING_MOTOR_VEHICLE_MODEL_SUCCESS,
  ADDING_MOTOR_VEHICLE_MODEL_FAILURE,
} from './types';

const initialState = {
  isFetching: false,
  isAdding: false,
  motorVehicleModels: [],
  error: null,
  message: null,
};

export default (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case MOTOR_VEHICLE_MODELS_LIST:
      return {
        ...state,
        isFetching: true,
        isAdding: false,
        error: null,
        message: null,
      };
    case MOTOR_VEHICLE_MODELS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAdding: false,
        motorVehicleModels: payload,
        error: null,
        message: null,
      };
    case MOTOR_VEHICLE_MODELS_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAdding: false,
        error: payload,
        message: null,
      };
    case ADDING_MOTOR_VEHICLE_MODEL:
      return {
        ...state,
        isFetching: false,
        isAdding: true,
        error: null,
        message: null,
      };
    case ADDING_MOTOR_VEHICLE_MODEL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAdding: false,
        error: null,
        message: payload,
      };
    case ADDING_MOTOR_VEHICLE_MODEL_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAdding: false,
        error: payload,
        message: null,
      };
    default:
      return state;
  }
};

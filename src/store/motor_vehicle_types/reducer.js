import {
  MOTOR_VEHICLE_TYPES_LIST,
  MOTOR_VEHICLE_TYPES_SUCCESS,
  MOTOR_VEHICLE_TYPES_FAILURE,
  ADDING_MOTOR_VEHICLE_TYPE,
  ADDING_MOTOR_VEHICLE_TYPE_SUCCESS,
  ADDING_MOTOR_VEHICLE_TYPE_FAILURE,
} from './types';

const initialState = {
  isFetching: false,
  isAdding: false,
  motorVehicleTypes: [],
  error: null,
  message: null,
};

export default (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case MOTOR_VEHICLE_TYPES_LIST:
      return {
        ...state,
        isFetching: true,
        isAdding: false,
        error: null,
        message: null,
      };
    case MOTOR_VEHICLE_TYPES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAdding: false,
        motorVehicleTypes: payload,
        error: null,
        message: null,
      };
    case MOTOR_VEHICLE_TYPES_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAdding: false,
        error: payload,
        message: null,
      };
    case ADDING_MOTOR_VEHICLE_TYPE:
      return {
        ...state,
        isFetching: false,
        isAdding: true,
        error: null,
        message: null,
      };
    case ADDING_MOTOR_VEHICLE_TYPE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAdding: false,
        error: null,
        message: payload,
      };
    case ADDING_MOTOR_VEHICLE_TYPE_FAILURE:
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

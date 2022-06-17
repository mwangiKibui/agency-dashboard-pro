import {
  ADD_TRANSACTION,
  ADD_TRANSACTION_SUCCESS,
  ADD_TRANSACTION_FAILURE,
  FETCH_TRANSACTIONS,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_TRANSACTIONS_FAILURE,
  FETCH_TRANSACTIONS_BY_ID,
  FETCH_TRANSACTIONS_BY_ID_SUCCESS,
  FETCH_TRANSACTIONS_BY_ID_FAILURE,
  // client options
  FETCH_CLIENT_OPTIONS,
  FETCH_CLIENT_OPTIONS_SUCCESS,
  FETCH_CLIENT_OPTIONS_FAILURE,
  // insuarance class options
  FETCH_INSURANCE_CLASS_OPTIONS,
  FETCH_INSURANCE_CLASS_OPTIONS_SUCCESS,
  FETCH_INSURANCE_CLASS_OPTIONS_FAILURE,
  // insuarance cover options
  FETCH_INSURANCE_COVER_OPTIONS,
  FETCH_INSURANCE_COVER_OPTIONS_SUCCESS,
  FETCH_INSURANCE_COVER_OPTIONS_FAILURE,
  // motor vehicle type options
  FETCH_MOTOR_VEHICLE_TYPE_OPTIONS,
  FETCH_MOTOR_VEHICLE_TYPE_OPTIONS_SUCCESS,
  FETCH_MOTOR_VEHICLE_TYPE_OPTIONS_FAILURE,
  // motor vehicle model options
  FETCH_MOTOR_VEHICLE_MODEL_OPTIONS,
  FETCH_MOTOR_VEHICLE_MODEL_OPTIONS_SUCCESS,
  FETCH_MOTOR_VEHICLE_MODEL_OPTIONS_FAILURE,
} from './types';

const initialState = {
  client_options: [],
  client_options_loading: false,
  client_options_error: null,
  insurance_class_options: [],
  insurance_class_options_loading: false,
  insurance_class_options_error: null,
  insurance_cover_options: [],
  insurance_cover_options_loading: false,
  insurance_cover_options_error: null,
  motor_vehicle_type_options: [],
  motor_vehicle_type_options_loading: false,
  motor_vehicle_type_options_error: null,
  motor_vehicle_model_options: [],
  motor_vehicle_model_options_loading: false,
  motor_vehicle_model_options_error: null,
  loading: false,
  error: null,
  message: null,
  transactions: [],
  transaction: {},
};

export default (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case FETCH_CLIENT_OPTIONS:
      return {
        ...state,
        client_options_loading: true,
        client_options_error: null,
      };
    case FETCH_CLIENT_OPTIONS_SUCCESS:
      return {
        ...state,
        client_options_loading: false,
        client_options: payload,
        client_options_error: null,
      };
    case FETCH_CLIENT_OPTIONS_FAILURE:
      return {
        ...state,
        client_options_loading: false,
        client_options_error: payload,
      };
    case FETCH_INSURANCE_CLASS_OPTIONS:
      return {
        ...state,
        insurance_class_options_loading: true,
        insurance_class_options_error: null,
      };
    case FETCH_INSURANCE_CLASS_OPTIONS_SUCCESS:
      return {
        ...state,
        insurance_class_options_loading: false,
        insurance_class_options: payload,
        insurance_class_options_error: null,
      };
    case FETCH_INSURANCE_CLASS_OPTIONS_FAILURE:
      return {
        ...state,
        insurance_class_options_loading: false,
        insurance_class_options_error: payload,
      };
    case FETCH_INSURANCE_COVER_OPTIONS:
      return {
        ...state,
        insurance_cover_options_loading: true,
        insurance_cover_options_error: null,
      };
    case FETCH_INSURANCE_COVER_OPTIONS_SUCCESS:
      return {
        ...state,
        insurance_cover_options_loading: false,
        insurance_cover_options: payload,
        insurance_cover_options_error: null,
      };
    case FETCH_INSURANCE_COVER_OPTIONS_FAILURE:
      return {
        ...state,
        insurance_cover_options_loading: false,
        insurance_cover_options_error: payload,
      };
    case FETCH_MOTOR_VEHICLE_TYPE_OPTIONS:
      return {
        ...state,
        motor_vehicle_type_options_loading: true,
        motor_vehicle_type_options_error: null,
      };
    case FETCH_MOTOR_VEHICLE_TYPE_OPTIONS_SUCCESS:
      return {
        ...state,
        motor_vehicle_type_options_loading: false,
        motor_vehicle_type_options: payload,
        motor_vehicle_type_options_error: null,
      };
    case FETCH_MOTOR_VEHICLE_TYPE_OPTIONS_FAILURE:
      return {
        ...state,
        motor_vehicle_type_options_loading: false,
        motor_vehicle_type_options_error: payload,
      };
    case FETCH_MOTOR_VEHICLE_MODEL_OPTIONS:
      return {
        ...state,
        motor_vehicle_model_options_loading: true,
        motor_vehicle_model_options_error: null,
      };
    case FETCH_MOTOR_VEHICLE_MODEL_OPTIONS_SUCCESS:
      return {
        ...state,
        motor_vehicle_model_options_loading: false,
        motor_vehicle_model_options: payload,
        motor_vehicle_model_options_error: null,
      };
    case FETCH_MOTOR_VEHICLE_MODEL_OPTIONS_FAILURE:
      return {
        ...state,
        motor_vehicle_model_options_loading: false,
        motor_vehicle_model_options_error: payload,
      };
    case ADD_TRANSACTION:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };
    case ADD_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        message: payload,
      };
    case ADD_TRANSACTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        message: null,
      };
    case FETCH_TRANSACTIONS:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };
    case FETCH_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        transactions: payload,
        error: null,
      };
    case FETCH_TRANSACTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case FETCH_TRANSACTIONS_BY_ID:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };
    case FETCH_TRANSACTIONS_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        transaction: payload,
        error: null,
      };
    case FETCH_TRANSACTIONS_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

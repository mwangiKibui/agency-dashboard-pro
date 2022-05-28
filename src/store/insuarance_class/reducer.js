import {
   FETCHING_INSUARANCE_CLASSES_LIST,
   FETCHING_INSUARANCE_CLASSES_SUCCESS,
   FETCHING_INSUARANCE_CLASSES_FAILURE,
   ADDING_INSUARANCE_CLASS,
   ADDING_INSUARANCE_CLASS_SUCCESS,
   ADDING_INSUARANCE_CLASS_FAILURE
} from "./types";

const initialState = {
    isFetching: false,
    isAdding: false,
    insuaranceClasses: [],
    error: null,
    message: null
};

export default (state = initialState, {type,payload} = {}) => {
    switch (type) {
        case FETCHING_INSUARANCE_CLASSES_LIST:
            return {
                ...state,
                isFetching: true,
                isAdding: false,
                error: null,
                message: null
            };
        case FETCHING_INSUARANCE_CLASSES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isAdding: false,
                insuaranceClasses: payload,
                error: null,
                message: null
            };
        case FETCHING_INSUARANCE_CLASSES_FAILURE:
            return {
                ...state,
                isFetching: false,
                isAdding: false,
                error: payload,
                message: null
            };
        case ADDING_INSUARANCE_CLASS:
            return {
                ...state,
                isFetching: false,
                isAdding: true,
                error: null,
                message: null
            };
        case ADDING_INSUARANCE_CLASS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isAdding: false,
                error: null,
                message: payload
            };
        case ADDING_INSUARANCE_CLASS_FAILURE:
            return {
                ...state,
                isFetching: false,
                isAdding: false,
                error: payload,
                message: null
            };
        default:
            return state;
    }
};
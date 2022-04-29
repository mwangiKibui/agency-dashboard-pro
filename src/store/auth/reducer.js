import {IS_LOGIN_FAILED,IS_LOGIN_SUCCESSFUL,IS_REGISTER_FAILED,IS_REGISTER_SUCCESSFUL} from './types';

export const initialState = {
    isLoginSuccessful: false,
    isLoginFailed: false,
    isRegisterSuccessful: false,
    isRegisterFailed: false,
    user: {},
    error: {}
}

export default (state, action) => {
    switch(action.type) {
        case IS_LOGIN_SUCCESSFUL:
            return {
                ...state,
                isLoginSuccessful: true,
                isLoginFailed: false,
                user: action.payload
            }
        case IS_LOGIN_FAILED:
            return {
                ...state,
                isLoginSuccessful: false,
                isLoginFailed: true,
                error: action.payload
            }
        case IS_REGISTER_SUCCESSFUL:
            return {
                ...state,
                isRegisterSuccessful: true,
                isRegisterFailed: false,
                user: action.payload
            }
        case IS_REGISTER_FAILED:
            return {
                ...state,
                isRegisterSuccessful: false,
                isRegisterFailed: true,
                error: action.payload
            }
        default:
            return state;
    }
}
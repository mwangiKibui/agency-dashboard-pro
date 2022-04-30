import {IS_LOGIN_FAILED,IS_LOGIN_SUCCESSFUL,IS_REGISTER_FAILED,IS_REGISTER_SUCCESSFUL,LOG_OUT} from './types';

export default (state, action) => {
    switch(action.type) {
        case IS_LOGIN_SUCCESSFUL:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    isLoggedIn: true,
                    isLoginSuccessful: true,
                    isLoginFailed: false,
                    user: action.payload
                }
            }
        case IS_LOGIN_FAILED:
            return {
                ...state,
                auth:{
                    ...state.auth,
                    isLoggedIn: false,
                    isLoginSuccessful: false,
                    isLoginFailed: true,
                    error: action.payload
                }
            }
        case IS_REGISTER_SUCCESSFUL:
            return {
                ...state,
                auth:{
                    ...state.auth,
                    isLoggedIn: true,
                    isRegisterSuccessful: true,
                    isRegisterFailed: false,
                    user: action.payload
                }
            }
        case IS_REGISTER_FAILED:
            return {
                ...state,
                auth:{
                    ...state.auth,
                    isLoggedIn:false,
                    isRegisterSuccessful: false,
                    isRegisterFailed: true,
                    error: action.payload
                }
            }
        case LOG_OUT:
            return {
                ...state,
                auth:{
                    ...state.auth,
                    isLoggedIn: false,
                    isLoginSuccessful: false,
                    isLoginFailed: false,
                    isRegisterSuccessful: false,
                    isRegisterFailed: false,
                    error: '',
                    user: {}
                }
            }            
        default:
            return state;
    }
}
import {IS_LOGIN_SUCCESSFUL,IS_LOGIN_FAILED,IS_REGISTER_FAILED,IS_REGISTER_SUCCESSFUL} from "./types";

export const loginSuccessful = (data) => {
    return {
        type: IS_LOGIN_SUCCESSFUL,
        payload: data
    }
}

export const loginFailed = (data) => {
    return {
        type: IS_LOGIN_FAILED,
        payload: data
    }
}

export const registrationSuccessful = (data) => {
    return {
        type: IS_REGISTER_SUCCESSFUL,
        payload: data
    }
}

export const registrationFailed = (data) => {
    return {
        type: IS_REGISTER_FAILED,
        payload: data
    }
}
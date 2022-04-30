import {
    IS_LOGIN_SUCCESSFUL,
    IS_LOGIN_FAILED,
    IS_REGISTER_FAILED,
    IS_REGISTER_SUCCESSFUL,
    LOG_OUT
} from "./types";

export const loginSuccessful = (data) => (
    {
        type: IS_LOGIN_SUCCESSFUL,
        payload: data
    }
);

export const loginFailed = (data) => (
    {
        type: IS_LOGIN_FAILED,
        payload: data
    }
);

export const registrationSuccessful = (data) => (
    {
        type: IS_REGISTER_SUCCESSFUL,
        payload: data
    }
);

export const registrationFailed = (data) => (
    {
        type: IS_REGISTER_FAILED,
        payload: data
    }
);

export const logout = () => (
    {
        type: LOG_OUT
    }
);
import { legacy_createStore as createStore } from 'redux';
import authReducer from './auth/reducer';

const initialState = {
    auth: {
        isLoggedIn: false,
        isLoginSuccessful: false,
        isLoginFailed: false,
        isRegisterSuccessful: false,
        isRegisterFailed: false,
        user: {},
        error: ''
    }
}

function configureStore() {
    return createStore(authReducer, initialState);
  }
  
  export default configureStore
import { legacy_createStore as createStore } from 'redux';
import authReducer,{initialState} from './auth/reducer';


function configureStore() {
    return createStore(authReducer, initialState);
  }
  
  export default configureStore
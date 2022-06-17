import { combineReducers } from 'redux';
import authReducer from '../auth/reducer';
import clientsReducer from '../clients/reducer';
import insuanceClassReducer from '../insuarance_class/reducer';
import insuaranceCoverReducer from '../insuarance_covers/reducer';
import motorVehicleModelsReducer from '../motor_vehicle_models/reducer';
import motorVehicleTypesReducer from '../motor_vehicle_types/reducer';
import transactionReducer from '../transactions/reducer';
import roleReducer from '../roles/reducer';
import usersReducer from '../users/reducer';

export default combineReducers({
  auth: authReducer,
  clients: clientsReducer,
  insuaranceClass: insuanceClassReducer,
  insuaranceCover: insuaranceCoverReducer,
  motorVehicleModel: motorVehicleModelsReducer,
  motorVehicleType: motorVehicleTypesReducer,
  transaction: transactionReducer,
  roles: roleReducer,
  users: usersReducer,
});

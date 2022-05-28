import { legacy_createStore as createStore,applyMiddleware } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['auth'],
};

// create a persistent reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const store = createStore(persistedReducer,applyMiddleware(thunk));
  const persistor = persistStore(store);
  return { store, persistor };
};

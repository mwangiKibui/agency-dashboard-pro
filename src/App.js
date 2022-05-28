import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
// ----------------------------------------------------------------------
import configureStore from './store/store';

const { store, persistor } = configureStore();

const Loading = () => <div>Loading...</div>;

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <ThemeProvider>
          <ScrollToTop />
          <BaseOptionChartStyle />
          <Router />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

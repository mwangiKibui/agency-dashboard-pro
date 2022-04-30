import { Provider } from "react-redux";
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
// ----------------------------------------------------------------------
import configureStore from "./store/store";

export default function App() {
  return (
    <Provider store={configureStore()}>
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
    </ThemeProvider>
    </Provider>
  );
}

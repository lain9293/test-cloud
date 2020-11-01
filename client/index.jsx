import 'bootstrap/dist/css/bootstrap.min.css';
import { useRoutes } from 'hookrouter';
import React from 'react';
import ReactDOM from 'react-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import {
  ErrorFallback, Layout, NavbarWrap, Spinner,
} from './components';
import routes from './routes';
import { store } from './store';

const App = () => {
  const routeResult = useRoutes(routes);

  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ToastProvider>
          <Provider store={store}>
            <Spinner>
              <NavbarWrap />
              <Layout>{routeResult}</Layout>
            </Spinner>
          </Provider>
        </ToastProvider>
      </ErrorBoundary>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

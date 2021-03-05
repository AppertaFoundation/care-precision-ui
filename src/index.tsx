/**
 * index.tsx
 *
 * This is the entry file for the application, only setup.
 */
// import 'utils/wdyr';

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from 'serviceWorker';
import 'sanitize.css/sanitize.css';

// Import root app
import { App } from 'app';

import { HelmetProvider } from 'react-helmet-async';
import { sessionService } from 'redux-react-session';

import { configureAppStore } from 'store/configureStore';
import { ThemeProvider } from 'styles/theme/ThemeProvider';
import FontFaceObserver from 'fontfaceobserver';

//Initialize session and store
const store = configureAppStore();

const validateSession = session => {
  // check if your session is still valid with a server check, through axios for instance
  return true;
};
const options = {
  refreshOnCheckAuth: true,
  // driver: 'COOKIES',
  redirectPath: '/login', //Path used when a session is rejected or doesn't exist
  validateSession,
};
sessionService
  .initSessionService(store, options)
  .then(() =>
    console.log(
      'Redux React Session is ready and a session was refreshed from your storage',
    ),
  )
  .catch(() =>
    console.log(
      'Redux React Session is ready and there is no session in your storage',
    ),
  );
// sessionService.saveSession({});
// sessionService.saveUser({})

const MOUNT_NODE = document.getElementById('root') as HTMLElement;

const openSansObserver = new FontFaceObserver('Cabin', {});
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});
interface Props {
  Component: typeof App;
}
const ConnectedApp = ({ Component }: Props) => (
  <Provider store={store}>
    <ThemeProvider>
      <HelmetProvider>
        <React.StrictMode>
          <Component />
        </React.StrictMode>
      </HelmetProvider>
    </ThemeProvider>
  </Provider>
);
const render = (Component: typeof App) => {
  ReactDOM.render(<ConnectedApp Component={Component} />, MOUNT_NODE);
};

if (module.hot) {
  // Hot reloadable translation json files and app
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./app'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    const App = require('./app').App;
    render(App);
  });
}

render(App);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

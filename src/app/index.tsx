/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { GlobalStyle } from 'styles/global-styles';

import { sessionSelector } from 'utils/selectors';
import { Layout } from 'components';
import { PatientList } from './containers/PatientList/Loadable';
import { AcuityDashboard } from './containers/AcuityDashboard/Loadable';
import { Assessment } from './containers/Assessment';
import { NotFoundPage } from 'components/NotFoundPage/Loadable';

/**
 * Decided to use a beta version of react-router(complete different api than v5)
 * Beta was released on 20 Jun 2020 and cover all cases incompatibles previous release
 * with current react hooks and suspense api.
 */

export function App() {
  return (
    <BrowserRouter>
      <Helmet titleTemplate="%s -Care Protect" defaultTitle="Care Protect">
        <meta
          name="Quick and effective sharing of data to ensure that patients are always in correct setting"
          content="Care Protect application"
        />
      </Helmet>
      <Routes>
        {/* <Route
          path="/login"
          element={
            <Layout login={true}>
              <Login />
            </Layout>
          }
        /> */}
        <Route element={<Unauthenticated />} path="/login">
          <PrivateRoute
            header="Login"
            appBar
            bottomToolBar
            element={<div>login</div>}
            path="/login"
          />
        </Route>
        <Route element={<Authenticated />} path="/">
          <PrivateRoute
            header="Patient List"
            appBar
            bottomToolBar
            element={<PatientList />}
            path="/"
          />
          <PrivateRoute
            header="Acuity Dasboard"
            appBar
            bottomToolBar
            element={<AcuityDashboard />}
            path="/dashboard"
          />
          <PrivateRoute
            header={false}
            bottomToolBar
            element={<Assessment />}
            path="/assessment/:id/:tab/:obsType"
          />
          {/* <PrivateRoute
            header={false}
            bottomToolBar
            element={<Assessment step={'background'}/>}
            path="/assessment/:id/1"
          /> */}
        </Route>
        <Route element={<NotFoundPage />} />
      </Routes>

      <GlobalStyle />
    </BrowserRouter>
  );
}
//Authentication wrapper
const Authenticated = () => {
  const isAuthenticated = useSelector(sessionSelector);
  if (!isAuthenticated.checked && isAuthenticated.authenticated) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

const Unauthenticated = () => {
  const isAuthenticated = useSelector(sessionSelector);
  if (isAuthenticated.checked && !isAuthenticated.authenticated) {
    return <Outlet />;
  }
  return <Navigate to="/" />;
};

const PrivateRoute = ({ element, header, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        <Layout header={header} bottomToolBar={Boolean(rest.bottomToolBar)}>
          {element}
        </Layout>
      }
    />
  );
};

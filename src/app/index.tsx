/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages.
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { assessmentReducer } from 'store/assessmentTypeReducer';
import { sessionReducer } from 'redux-react-session';
import { sessionSelector } from 'utils/selectors';
import { useInjectReducer } from 'redux-injectors';

import { AcuityDashboard } from './containers/AcuityDashboard';
import { Assessment } from './containers/Assessment';
import { InfectionControl } from './containers/InfectionControl';
import { NotFoundPage } from 'components/NotFoundPage/Loadable';
import { PatientList } from './containers/PatientList/';
import { PatientOverview } from './containers/PatientOverview';

import { GlobalStyle } from 'styles/global-styles';
import Layout from 'components/Layout';

export function App() {
  useInjectReducer({ key: 'session', reducer: sessionReducer });
  useInjectReducer({ key: 'assessmentType', reducer: assessmentReducer });

  const session = useSelector(sessionSelector);
  const { checked, authenticated } = session;

  return (
    <BrowserRouter>
      <Helmet titleTemplate="%s -Care Protect" defaultTitle="Care Protect">
        <meta
          name="Quick and effective sharing of data to ensure that patients are always in correct setting"
          content="Care Protect application"
        />
      </Helmet>
      {checked && (
        <Switch>
          <ProtectedRoute
            exact
            header="Patient List"
            path={process.env.PUBLIC_URL + '/'}
            component={PatientList}
            authenticated={authenticated}
          />
          <ProtectedRoute
            exact
            header="Acuity Dasboard"
            path={process.env.PUBLIC_URL + '/dashboard'}
            component={AcuityDashboard}
            authenticated={authenticated}
          />
          <ProtectedRoute
            exact
            path={process.env.PUBLIC_URL + '/covid-menagment/:id'}
            component={InfectionControl}
            authenticated={authenticated}
          />
          <ProtectedRoute
            exact
            path={process.env.PUBLIC_URL + '/patient-overview/:id'}
            component={PatientOverview}
            authenticated={authenticated}
          />
          <ProtectedRoute
            exact
            path={process.env.PUBLIC_URL + '/assessment/:id/:tab/:obsType'}
            component={Assessment}
            authenticated={authenticated}
          />

          <Route component={NotFoundPage} />
        </Switch>
      )}
      <GlobalStyle />
    </BrowserRouter>
  );
}

function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        rest.authenticated ? (
          <Layout
            header={rest.header}
            bottomToolBar={Boolean(rest.bottomToolBar)}
          >
            <Component {...props} />
          </Layout>
        ) : (
          <Layout
            header={rest.header}
            bottomToolBar={Boolean(rest.bottomToolBar)}
          >
            <Component {...props} />
          </Layout>
          // <Redirect
          //   to={{
          //     pathname: '/login2',
          //     state: { from: props.location },
          //   }}
          // />
        )
      }
    />
  );
}

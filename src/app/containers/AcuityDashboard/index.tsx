import React from 'react';
import { Helmet } from 'react-helmet-async';

import AcuityList from './List';

export function AcuityDashboard() {
  return (
    <>
      <Helmet>
        <title>{'Acuity Dashboard'}</title>
        <meta name="description" content={'A Acuity Dashboard'} />
      </Helmet>
      <AcuityList />
    </>
  );
}

import React from 'react';
import { Helmet } from 'react-helmet-async';

import RecordsTable from './RecordsTable';

export function AcuityDashboard() {
  return (
    <>
      <Helmet>
        <title>{'Acuity Dashboard'}</title>
        <meta name="description" content={'A Acuity Dashboard'} />
      </Helmet>
      <RecordsTable />
    </>
  );
}

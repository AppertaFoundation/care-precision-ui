import React from 'react';
import { Helmet } from 'react-helmet-async';

import RecordsList from './RecordsList';

export function PatientsList() {
  return (
    <>
      <Helmet>
        <title>{'Patient List'}</title>
        <meta name="description" content={'A Patient List'} />
      </Helmet>
      <RecordsList />
    </>
  );
}

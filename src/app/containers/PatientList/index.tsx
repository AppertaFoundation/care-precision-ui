import React from 'react';
import { Helmet } from 'react-helmet-async';

import Records from './Records';

export function PatientList() {
  return (
    <>
      <Helmet>
        <title>{'Patient List'}</title>
        <meta name="description" content={'A Patient List'} />
      </Helmet>
      <Records />
    </>
  );
}

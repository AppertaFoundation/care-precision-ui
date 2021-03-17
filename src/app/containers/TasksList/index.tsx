import React from 'react';
import { Helmet } from 'react-helmet-async';

import List from './List';

export function TasksList() {
  return (
    <>
      <Helmet>
        <title>{'Tasks List'}</title>
        <meta name="description" content={'A Tasks List'} />
      </Helmet>
      <List />
    </>
  );
}

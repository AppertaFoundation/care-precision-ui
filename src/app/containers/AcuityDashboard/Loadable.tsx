/**
 * Asynchronously loads the component for AcuityDashboard
 */

import * as React from 'react';
import { lazyLoad } from 'utils/loadable';
import styled from 'styled-components/macro';

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AcuityDashboard = lazyLoad(
  () => import('./index'),
  module => module.AcuityDashboard,
  {
    fallback: (
      <LoadingWrapper>
        <p>Loading...</p>
      </LoadingWrapper>
    ),
  },
);

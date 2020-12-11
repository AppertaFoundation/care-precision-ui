import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../../types/RootState';
import { initialState } from './slice';

// First select the relevant part from the state
const selectDomain = (state: RootState) =>
  state.infectionControl || initialState;

export const selectLoading = createSelector(
  [selectDomain],
  infectionControlSaga => infectionControlSaga.loading,
);

export const selectError = createSelector(
  [selectDomain],
  infectionControlSaga => infectionControlSaga.error,
);

export const selectPatient = createSelector(
  [selectDomain],
  infectionControlSaga => infectionControlSaga.patient,
);
export const selectPatientName = createSelector(
  [selectDomain],
  infectionControlSaga => infectionControlSaga.patient?.name,
);

export const selectPatientNHS = createSelector(
  [selectDomain],
  infectionControlSaga => infectionControlSaga.patient?.nhsnumber,
);

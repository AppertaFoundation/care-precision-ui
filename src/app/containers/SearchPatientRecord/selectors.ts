import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../../types/RootState';
import { initialState } from './slice';

// First select the relevant part from the state
const selectDomain = (state: RootState) =>
  state?.searchPatientRecord || initialState;

export const selectLoading = createSelector(
  [selectDomain],
  searchPatientRecord => searchPatientRecord.loading,
);

export const selectError = createSelector(
  [selectDomain],
  searchPatientRecord => searchPatientRecord.error,
);

export const selectSearchedRecords = createSelector(
  [selectDomain],
  searchPatientRecord => searchPatientRecord.patientsList,
);

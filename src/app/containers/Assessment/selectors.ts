import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../../types/RootState';
import { initialState } from './slice';

// First select the relevant part from the state
const selectDomain = (state: RootState) =>
  state.assessmentEvent || initialState;

export const selectLoading = createSelector(
  [selectDomain],
  assessmentEventSaga => assessmentEventSaga.loading,
);

export const selectError = createSelector(
  [selectDomain],
  assessmentEventSaga => assessmentEventSaga.error,
);

export const selectPatient = createSelector(
  [selectDomain],
  assessmentEventSaga => assessmentEventSaga.patient,
);
export const selectPatientName = createSelector(
  [selectDomain],
  assessmentEventSaga => assessmentEventSaga.patient?.name,
);

export const selectPatientNHS = createSelector(
  [selectDomain],
  assessmentEventSaga => assessmentEventSaga.patient?.nhsnumber,
);

export const selectSituation = createSelector(
  [selectDomain],
  assessmentEventSaga => assessmentEventSaga.situation,
);

export const selectBackground = createSelector(
  [selectDomain],
  assessmentEventSaga => assessmentEventSaga.background,
);

export const selectNews2 = createSelector(
  [selectDomain],
  assessmentEventSaga => assessmentEventSaga.news2,
);
export const selectNews2Response = createSelector(
  [selectDomain],
  assessmentEventSaga => assessmentEventSaga.news2.response,
);

export const selectSepsis = createSelector(
  [selectDomain],
  assessmentEventSaga => assessmentEventSaga.sepsis,
);

export const selectDenwis = createSelector(
  [selectDomain],
  assessmentEventSaga => assessmentEventSaga.denwis,
);

export const selectCovid = createSelector(
  [selectDomain],
  assessmentEventSaga => assessmentEventSaga.covid,
);

export const selectResult = createSelector(
  [selectDomain],
  assessmentEventSaga => assessmentEventSaga.result,
);

export const selectErrorResult = createSelector(
  [selectDomain],
  assessmentEventSaga => assessmentEventSaga.errorResult,
);
export const selectLoadingResult = createSelector(
  [selectDomain],
  assessmentEventSaga => assessmentEventSaga.loadingResult,
);

export const selectResponseActions = createSelector(
  [selectDomain],
  assessmentEventSaga => assessmentEventSaga.responseActions,
);

export const selectSuccess = createSelector(
  [selectDomain],
  assessmentEventSaga => assessmentEventSaga.success,
);
export const selectPending = createSelector(
  [selectDomain],
  assessmentEventSaga => assessmentEventSaga.pending,
);

export const selectSubmissionError = createSelector(
  [selectDomain],
  assessmentEventSaga => assessmentEventSaga.submissionError,
);

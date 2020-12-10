/*
 * PatientList Slice
 *
 * Here we define:
 * - The shape of our container's slice of Redux store,
 * - All the actions which can be triggered for this slice, including their effects on the store.
 *
 * Note that, while we are using dot notation in our reducer, we are not actually mutating the state
 * manually. Under the hood, we use immer to apply these updates to a new copy of the state.
 * Please see https://immerjs.github.io/immer/docs/introduction for more information.
 *
 */

import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '../../../utils/@reduxjs/toolkit';
import { ContainerState, PatientErrorType } from './types';
import { IPatient, IAssessmentIcons } from 'types';
// The initial state of the PatientList container
export const initialState: ContainerState = {
  loading: false,
  error: null,
  patient: null,
  situation: {},
  loadingResult: false,
  errorResult: null,
  result: {},
  background: {},
  news2: {},
  sepsis: {},
  covid: {},
  denwis: {},
};

const assessmentEventSlice = createSlice({
  name: 'assessmentEvent',
  initialState,
  reducers: {
    loadRecord(state, action) {
      state.loading = true;
      state.error = null;
      state.patient = null;
    },
    recordLoaded(
      state,
      action: PayloadAction<
        IPatient & {
          assessment: IAssessmentIcons;
        }
      >,
    ) {
      state.loading = false;
      state.error = null;
      const patient = action.payload;
      state.patient = patient;
    },
    recordError(state, action: PayloadAction<PatientErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
    saveSituation(state, action) {
      const situation = action.payload;
      state.situation = situation;
    },
    saveBackground(state, action) {
      const background = action.payload;
      state.background = background;
    },
    saveNews2(state, action) {
      const news2 = action.payload;
      state.news2 = { ...state.news2, ...news2 };
    },
    saveSepsis(state, action) {
      const sepsis = action.payload;
      state.sepsis = { ...state.sepsis, ...sepsis };
    },
    saveDenwis(state, action) {
      const denwis = action.payload;
      state.denwis = denwis;
    },
    saveCovid(state, action) {
      const covid = action.payload;
      state.covid = covid;
    },
    calculateResult(state, action) {
      state.loadingResult = true;
      state.errorResult = null;
      state.result = null;
    },
    calculatedResult(state, action) {
      state.loadingResult = false;
      state.errorResult = null;
      state.result = action.payload;
    },
    calculationError(state, action: PayloadAction<PatientErrorType>) {
      state.errorResult = action.payload;
      state.loadingResult = false;
    },
  },
});

export const { actions, reducer, name: sliceKey } = assessmentEventSlice;

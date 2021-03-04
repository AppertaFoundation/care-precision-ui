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

import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the PatientList container
export const initialState: ContainerState = {
  loading: false,
  error: null,
  patientsList: [],
};

const patientsListFromSlice = createSlice({
  name: 'searchPatientRecord',
  initialState,
  reducers: {
    searchRecord(state, action) {
      state.loading = true;
      state.error = null;
      state.patientsList = [];
    },
    searchRecordsLoaded(state, action) {
      state.loading = false;
      state.error = null;
      const patientsList = action.payload;
      state.patientsList = patientsList;
    },
    searchRecordsError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions, reducer, name: sliceKey } = patientsListFromSlice;

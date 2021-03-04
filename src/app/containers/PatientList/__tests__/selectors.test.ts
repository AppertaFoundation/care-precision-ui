import * as selectors from '../selectors';
import { RootState } from 'types';
import { PatientsErrorType } from '../types';
import { initialState } from '../slice';

describe('GithubRepoForm selectors', () => {
  let state: RootState = {};

  beforeEach(() => {
    state = {};
  });

  it('should select the initial state', () => {
    expect(selectors.selectPatients(state)).toEqual(initialState.patientsList);
  });

  it('should select loading', () => {
    const loading = true;
    state = {
      patientsList: { ...initialState, loading: loading },
    };
    expect(selectors.selectLoading(state)).toEqual(loading);
  });

  it('should select error', () => {
    const error = PatientsErrorType.RESPONSE_ERROR;
    state = {
      patientsList: { ...initialState, error: error },
    };
    expect(selectors.selectError(state)).toEqual(error);
  });

  it('should select filters', () => {
    const filters = { sort: null, filter: null },
      state = {
        patientsList: {
          ...initialState,
          filters: { sort: null, filter: null },
        },
      };
    expect(selectors.selectFilters(state)).toEqual(filters);
  });
});

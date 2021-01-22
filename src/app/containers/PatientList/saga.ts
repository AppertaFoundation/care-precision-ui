import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { request } from 'utils/request';
import { fake } from 'utils/fake';
import { patientListParser, keysToCamel } from 'utils/formatters';

import { PatientsErrorType } from './types';
import { actions } from './slice';

function getRequestURL(params) {
  const base = `${
    (window as any)[
      `${process.env.NODE_ENV === 'production' ? 'injectedEnv' : '_env_'}`
    ]['REACT_APP_API']
  }/meta/demographics/patient_list`;

  const search = params?.search ? params.search : null;
  const filter = params?.filter ? params.filter : null;
  const sort = params?.sort ? params.sort : null;

  const filterURL = filter?.sepsis
    ? `filter_key=${filter.sepsis.key}&filter_value=${filter.sepsis.value}`
    : '';
  const filterURLdenwis = filter?.denwis
    ? '&filter_key=denwis&filter_gte=4'
    : '';
  const order = sort?.key
    ? `&sort_key=${sort.key}&sort_value=${sort.value}`
    : '';
  const searchValue = search
    ? `&search_key=combisearch&search_value=${search}`
    : '';
  return `${base}?${filterURL}${filterURLdenwis}${searchValue}${order}`;
}

export function* getRecords(action) {
  yield delay(500);
  const requestURL = getRequestURL(action.payload);
  if (
    (window as any)[
      `${process.env.NODE_ENV === 'production' ? 'injectedEnv' : '_env_'}`
    ].REACT_APP_STATIC
  ) {
    return yield put(
      actions.recordsLoaded(patientListParser(keysToCamel(fake.PATIENT_LIST))),
    );
  }

  try {
    const patientsList = yield call(request, requestURL);
    if (patientsList?.length > 0) {
      yield put(
        actions.recordsLoaded(patientListParser(keysToCamel(patientsList))),
      );
    } else {
      yield put(actions.recordsError(PatientsErrorType.USER_HAS_NO_RECORDS));
    }
  } catch (err) {
    yield put(actions.recordsError(PatientsErrorType.RESPONSE_ERROR));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* patientListFromSaga() {
  yield takeLatest(actions.loadRecords.type, getRecords);
}

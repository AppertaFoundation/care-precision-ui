import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { request } from 'utils/request';
import { fake } from 'utils/fake';
import { patientListParser, keysToCamel } from 'utils/formatters';

import { PatientsErrorType } from './types';
import { actions } from './slice';

function getRequestURL(params) {
  const base =
    'https://api.c19.devmode.xyz/c19-alpha/0.0.1/meta/demographics/patient_list';

  const search = params.search ? params.search : null;
  const filter = params.filter ? params.filter : null;
  const sort = params.sort ? params.sort : null;

  const filterURL = filter
    ? `filter_key=${filter.key}&filter_value=${filter.value}`
    : '';
  const order = sort ? `sort_key=${sort.key}&sort_value=${sort.value}` : '';
  const searchValue = search
    ? `search_key=combisearch&search_value=${search}`
    : '';
  return `${base}?${filterURL}&${searchValue}&${order}`;
}

export function* getRecords(action) {
  yield delay(500);
  const requestURL = getRequestURL(action.payload);
  if (process.env.REACT_APP_STATIC) {
    console.log(`Request URL=>> ${requestURL}`);
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
export function* patientsListFromSaga() {
  yield takeLatest(actions.loadRecords.type, getRecords);
}

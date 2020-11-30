import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { request } from 'utils/request';
import { fake } from 'utils/fake';
import { patientListParser, keysToCamel } from 'utils/formatters';

import { PatientsErrorType } from './types';
import { actions } from './slice';

const getRequestURL = params => {
  const base =
    'https://api.c19.devmode.xyz/c19-alpha/0.0.1/meta/demographics/patient_list';
  return `${base}?function=full`;
};

export function* getRecords(action) {
  yield delay(500);
  if (process.env.REACT_APP_STATIC) {
    return yield put(
      actions.recordsLoaded(patientListParser(keysToCamel(fake.PATIENT_LIST))),
    );
  }
  const requestURL = getRequestURL(action.payload);

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

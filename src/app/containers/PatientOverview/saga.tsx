import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { request } from 'utils/request';
import { fake } from 'utils/fake';
import { patientParser, keysToCamel } from 'utils/formatters';

import { PatientOverviewErrorType } from './types';
import { actions } from './slice';

export function* getRecord(action) {
  yield delay(500);
  const requestURL = `${
    (window as any)._env_.REACT_APP_API
  }/meta/demographics/patient_list?search_key=id&search_value=${
    action.payload
  }`;
  if ((window as any)._env_.REACT_APP_STATIC) {
    return yield put(
      actions.recordLoaded(
        patientParser(
          keysToCamel(
            fake.PATIENT_LIST.find(element => element.id === action.payload),
          ),
        ),
      ),
    );
  }
  try {
    const patient = yield call(request, requestURL);
    if (Object.keys(patient[0]).length > 0) {
      yield put(actions.recordLoaded(patientParser(keysToCamel(patient[0]))));
    } else {
      yield put(
        actions.recordError(PatientOverviewErrorType.USER_HAS_NO_RECORDS),
      );
    }
  } catch (err) {
    yield put(actions.recordError(PatientOverviewErrorType.RESPONSE_ERROR));
  }
}
/**
 * Root saga manages watcher lifecycle
 */
export function* patientOverviewSaga() {
  yield takeLatest(actions.loadRecord.type, getRecord);
}

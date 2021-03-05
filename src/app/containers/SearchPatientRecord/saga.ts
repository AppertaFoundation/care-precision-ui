import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { request } from 'utils/request';
import { fake, searchByNameOrNhs } from 'utils/fake';
import { patientListParser, keysToCamel } from 'utils/formatters';
import { actions } from './slice';

export function* searchRecord(action) {
  yield delay(500);

  if (
    (window as any)[
      `${process.env.NODE_ENV === 'production' ? 'injectedEnv' : '_env_'}`
    ].REACT_APP_STATIC
  ) {
    const patientList = searchByNameOrNhs(
      patientListParser(keysToCamel(fake.PATIENT_LIST)),
      action.payload.search,
    );
    return yield put(actions.searchRecordsLoaded(patientList));
  }

  const requestURL = `${
    (window as any)[
      `${process.env.NODE_ENV === 'production' ? 'injectedEnv' : '_env_'}`
    ]['REACT_APP_API']
  }/meta/demographics/patient_list?${action?.payload?.search}`;
  try {
    const patientsList = yield call(request, requestURL);
    const formatedPatientList = patientListParser(keysToCamel(patientsList));
    if (formatedPatientList?.length > 0) {
      yield put(actions.searchRecordsLoaded(formatedPatientList));
    } else {
      yield put(actions.searchRecordsError('NO RESULTS'));
    }
  } catch (err) {
    yield put(actions.searchRecordsError('Response Error'));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* searchRecordsSaga() {
  yield takeLatest(actions.searchRecord.type, searchRecord);
}

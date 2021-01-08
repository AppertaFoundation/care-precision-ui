import { call, put, takeLatest, delay, select } from 'redux-saga/effects';
import { request } from 'utils/request';
import { fake } from 'utils/fake';
import { patientParser, keysToCamel, keysToSnake } from 'utils/formatters';

import { InfectionControlErrorType } from './types';
import { actions } from './slice';

const demographic = {
  setting: 'nursing home care', //Fixed
  composer: {
    //Clinical author of the document
    name: 'RN Joyce Brown',
    idScheme: 'NMC', // From Demographics
    id: '12342341', //From demographics
    idNamespace: 'uk.org.nmc', //from demographics
  },
  healthcareFacility: {
    //Clinical author of the document
    name: 'Glen Carse Care Home',
    idScheme: 'CQC', // From Demographics
    id: '44832', //From demographics
    idNamespace: 'uk.org.cqc', //from demographics
  },
};
export function* getRecord(action) {
  yield delay(500);
  const requestURL = `https://api.c19.devmode.xyz/c19-alpha/0.0.1/meta/demographics/patient_list?search_key=id&search_value=${action.payload}`;

  if (process.env.REACT_APP_STATIC) {
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
        actions.recordError(InfectionControlErrorType.USER_HAS_NO_RECORDS),
      );
    }
  } catch (err) {
    yield put(actions.recordError(InfectionControlErrorType.RESPONSE_ERROR));
  }
}

export function* getInfectionControl(action) {
  yield delay(500);

  if (process.env.REACT_APP_STATIC) {
    return yield put(
      actions.infectionControlLoaded(keysToCamel(fake.COVID_MENAGMENT)),
    );
  }
}
// State Selectors
const covidMenagmentForm = state => state.infectionControl.covidMenagment;
// const patientId = state => state.infectionControl.patient.id;

export function* updateCovidPathway(action) {
  yield delay(500);
  // const id = yield select(patientId);

  const requestURL = '';
  const covidMenagment = yield select(covidMenagmentForm);

  const template = {
    ...covidMenagment,
    ...action.payload,
    startTime: Date.now(), //ISO DateTime
    ...demographic,
  };

  try {
    yield call(request, requestURL, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      // credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(keysToSnake(template)),
    });
    // yield call(getInfectionControl, { payload: id });
    yield put(actions.success());
  } catch (err) {
    // yield call(getInfectionControl, { payload: id });
    yield put(actions.success());

    // yield put(actions.covidStatusError(PatientErrorType.RESPONSE_ERROR));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* infectionControlSaga() {
  yield takeLatest(actions.loadRecord.type, getRecord);
  yield takeLatest(actions.loadInfectionControl.type, getInfectionControl);
  yield takeLatest(actions.pending.type, updateCovidPathway);
}
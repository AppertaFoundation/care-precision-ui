import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { request } from 'utils/request';
import { fake } from 'utils/fake';
import { patientParser, keysToCamel } from 'utils/formatters';
import { serializeAssessmentJSON } from 'utils/formatters/serialize';
import { PatientErrorType } from './types';
import { actions } from './slice';

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
    if (Object.keys(patient).length > 0) {
      yield put(actions.recordLoaded(patientParser(keysToCamel(patient))));
    } else {
      yield put(actions.recordError(PatientErrorType.USER_HAS_NO_RECORDS));
    }
  } catch (err) {
    yield put(actions.recordError(PatientErrorType.RESPONSE_ERROR));
  }
}

export function* makeCalculations(action) {
  yield delay(500);
  const { obsType } = action.payload;
  if (process.env.REACT_APP_STATIC) {
    yield put(
      {
        news2: actions.saveNews2({
          response: keysToCamel(fake.ASSESSMENTS_RESULT[`${obsType}`]),
        }),
        sepsis: actions.saveSepsis({
          response: keysToCamel(fake.ASSESSMENTS_RESULT[`${obsType}`]),
        }),
        denwis: actions.saveDenwis({
          response: keysToCamel(fake.ASSESSMENTS_RESULT[`${obsType}`]),
        }),
        covid: actions.saveCovid({
          response: keysToCamel(fake.ASSESSMENTS_RESULT[`${obsType}`]),
        }),
      }[obsType],
    );
    return yield put(
      actions.calculatedResult(
        keysToCamel(fake.ASSESSMENTS_RESULT[`${obsType}`]),
      ),
    );
  }
  // try {
  //   const result = yield call(request, requestURL);
  //   if (Object.keys(result).length > 0) {
  //     yield put(actions.calculatedResult(parseCalulation(keysToCamel(result))));
  //   } else {
  //     yield put(actions.calculationError(PatientErrorType.USER_HAS_NO_RECORDS));
  //   }
  // } catch (err) {
  //   yield put(actions.calculationError(PatientErrorType.RESPONSE_ERROR));
  // }
}

export function* submitAssessment(action) {
  yield delay(500);
  const requestURL = ``;

  // if (process.env.REACT_APP_STATIC) {
  //   return yield put(actions.successAssesment());
  // }
  const formatedAssessment = serializeAssessmentJSON(action.payload);
  try {
    yield call(request, requestURL, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      // credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(formatedAssessment),
    });
    yield put(actions.successAssesment());
  } catch (err) {
    yield put(actions.submissionError(PatientErrorType.RESPONSE_ERROR));
  }
}
/**
 * Root saga manages watcher lifecycle
 */
export function* assessmentEventSaga() {
  yield takeLatest(actions.loadRecord.type, getRecord);
  yield takeLatest(actions.calculateResult.type, makeCalculations);
  yield takeLatest(actions.pendingAssessment.type, submitAssessment);
}

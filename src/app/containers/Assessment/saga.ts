import { call, put, takeLatest, delay, select } from 'redux-saga/effects';
import { request } from 'utils/request';
import { fake } from 'utils/fake';
import { patientParser, keysToCamel, keysToSnake } from 'utils/formatters';
import { serializeAssessmentJSON } from 'utils/formatters/serialize';
import { PatientErrorType } from './types';
import { actions } from './slice';

const getUUID = state => state.assessmentEvent.patient.id;

export function* getRecord(action) {
  yield delay(500);
  const requestURL = `${
    (window as any)[
      `${process.env.NODE_ENV === 'production' ? 'injectedEnv' : '_env_'}`
    ].REACT_APP_API
  }/meta/demographics/patient_list?search_key=id&search_value=${
    action.payload
  }`;

  if (
    (window as any)[
      `${process.env.NODE_ENV === 'production' ? 'injectedEnv' : '_env_'}`
    ].REACT_APP_STATIC
  ) {
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
      yield put(actions.recordError(PatientErrorType.USER_HAS_NO_RECORDS));
    }
  } catch (err) {
    yield put(actions.recordError(PatientErrorType.RESPONSE_ERROR));
  }
}

export function* makeCalculations(action) {
  yield delay(500);
  const requestURL = `${
    (window as any)[
      `${process.env.NODE_ENV === 'production' ? 'injectedEnv' : '_env_'}`
    ].REACT_APP_API
  }/cdr/draft`;
  const { obsType, assessmentForm } = action.payload;
  const uuid = yield select(getUUID);
  const now = new Date();
  if (
    (window as any)[
      `${process.env.NODE_ENV === 'production' ? 'injectedEnv' : '_env_'}`
    ].REACT_APP_STATIC
  ) {
    const result = keysToCamel(fake.ASSESSMENTS_RESULT[`${obsType}`]);
    result[`${obsType}`].lastUpdate = now.toISOString();
    return yield put(
      actions.calculatedResult({
        ...result,
      }),
    );
  }
  try {
    const result = yield call(request, requestURL, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      // credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        header: {
          start_time: '2021-02-10T13:34:58.446Z',
          uuid: uuid,
          healthcare_facility: 'Glen Carse Care Home',
          composer: {
            name: 'RN Joyce Brown',
            id: {
              type: 'NMC',
              id: '12342341',
              namespace: 'uk.org.nmc',
            },
          },
        },
        [`${obsType}`]: keysToSnake(assessmentForm),
      }),
    });

    if (Object.keys(result).length > 0) {
      result[`${obsType}`].lastUpdate = now;

      yield put(
        actions.calculatedResult({
          ...keysToCamel(result),
        }),
      );
    } else {
      yield put(actions.calculationError(PatientErrorType.USER_HAS_NO_RECORDS));
    }
  } catch (err) {
    yield put(actions.calculationError(PatientErrorType.RESPONSE_ERROR));
  }
}

function download(content, fileName, contentType) {
  var a = document.createElement('a');
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

export function* submitAssessment(action) {
  yield delay(500);
  const requestURL = `${
    (window as any)[
      `${process.env.NODE_ENV === 'production' ? 'injectedEnv' : '_env_'}`
    ].REACT_APP_API
  }/cdr`;
  const formatedAssessment = serializeAssessmentJSON(action.payload);
  if (
    (window as any)[
      `${process.env.NODE_ENV === 'production' ? 'injectedEnv' : '_env_'}`
    ].REACT_APP_STATIC
  ) {
    download(JSON.stringify(formatedAssessment), 'json.txt', 'text/plain');
    yield put(actions.cleanAssessment);
    return yield put(actions.successAssesment());
  }

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
    yield put(actions.calculationError(PatientErrorType.RESPONSE_ERROR));
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

import { actions } from '../slice';
import { takeLatest } from 'redux-saga/effects';
import { patientListFromSaga, getRecords } from '../saga';

describe('patientListFromSaga', () => {
  const genObject = patientListFromSaga();

  it('should take last action of type loadRecords and call getRecords', () => {
    expect(genObject.next().value).toEqual(
      takeLatest(actions.loadRecords.type, getRecords),
    );
  });

  it('should be done on next iteration', () => {
    expect(genObject.next().done).toBeTruthy();
  });
});

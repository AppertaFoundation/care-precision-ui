import { createSelector } from 'reselect';

const assessmentType = state =>
  state.assessmentType || { assessmentType: '', assessmentsArray: [] };

export const assessmentTypeSelector = createSelector(
  assessmentType,
  assessmentType => assessmentType.assessmentType,
);

export const assessmentsTypesArraySelector = createSelector(
  assessmentType,
  assessmentType => assessmentType.assessmentsArray,
);
const SET_ASSESSMENT_TYPE = 'SET_ASSESSMENT_TYPE';
const END_ASSESSMENT_EVENT = 'END_ASSESSMENT_EVENT';

export const setAssessmentType = value => ({
  type: SET_ASSESSMENT_TYPE,
  payload: value,
});

export const endAssessmentEvent = () => ({
  type: END_ASSESSMENT_EVENT,
});
interface IinitialState {
  assessmentType: string;
  assessmentsArray: string[];
}
const initialState: IinitialState = {
  assessmentType: '',
  assessmentsArray: [],
};
export function assessmentReducer(state = initialState, action) {
  const assessmentType = action.payload;
  switch (action.type) {
    case 'SET_ASSESSMENT_TYPE':
      if (state.assessmentsArray.includes(assessmentType))
        return { assessmentType, assessmentsArray: state.assessmentsArray };
      else {
        const assessmentsArray = [...state.assessmentsArray, assessmentType];
        return { assessmentType, assessmentsArray };
      }
    case 'END_ASSESSMENT_EVENT':
      return { assessmentType: '', assessmentsArray: [] };
    default:
      return state;
  }
}

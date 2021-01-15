import { createSelector } from 'reselect';

const clean = state => state.clean || { assessmentEvent: false };

export const cleanAssessmentEventSelector = createSelector(
  clean,
  clean => clean.assessmentEvent,
);

// export const assessmentsTypesArraySelector = createSelector(
//   assessmentType,
//   assessmentType => assessmentType.assessmentsArray,
// );
const CLEAN_ASSESSMENT_EVENT = 'CLEAN_ASSESSMENT_EVENT';
// const END_ASSESSMENT_EVENT = 'END_ASSESSMENT_EVENT';

export const cleanAssessment = () => ({
  type: CLEAN_ASSESSMENT_EVENT,
  // payload: value,
});

// export const endAssessmentEvent = () => ({
//   type: END_ASSESSMENT_EVENT,
// });
interface IinitialState {
  assessmentEvent: boolean;
}
const initialState: IinitialState = {
  assessmentEvent: false,
};
export function assessmentCleanReducer(state = initialState, action) {
  switch (action.type) {
    case 'CLEAN_ASSESSMENT_EVENT':
      return { ...state, assessmentEvent: true };
    // case 'END_ASSESSMENT_EVENT':
    //   return { assessmentType: '', assessmentsArray: [] };
    default:
      return state;
  }
}

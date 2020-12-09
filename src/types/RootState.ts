// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
import { PatientsList } from 'app/containers/PatientList/types';
import { AssessmentEvent } from 'app/containers/Assessment/types';

export interface RootState {
  patientsList?: PatientsList;
  assessmentEvent?: AssessmentEvent;
}

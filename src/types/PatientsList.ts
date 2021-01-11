import { IPatient } from './PatientDemographic';
import { IAssessmentIcons } from './AssessmentIcons';

export type tPatientsList = IPatient & {
  assessment: IAssessmentIcons;
};

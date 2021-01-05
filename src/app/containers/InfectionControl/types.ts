import { IAssessmentIcons, IPatient } from 'types';
/* --- STATE --- */
export interface InfectionControl {
  loading: boolean;
  error?: InfectionControlErrorType | null;
  covidMenagment: null | any;
  patient:
    | null
    | (IPatient & {
        assessment: IAssessmentIcons;
      });
}

export enum InfectionControlErrorType {
  RESPONSE_ERROR = 1,
  USER_HAS_NO_RECORDS = 2,
}

export type ContainerState = InfectionControl;

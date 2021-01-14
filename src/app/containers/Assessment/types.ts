import { IAssessmentIcons, IPatient } from 'types';
/* --- STATE --- */
export interface AssessmentEvent {
  loading: boolean;
  error?: PatientErrorType | null;
  patient:
    | null
    | (IPatient & {
        assessment: IAssessmentIcons;
      });
  situation: any;
  background: any;
  news2: any;
  sepsis: any;
  covid: any;
  denwis: any;
  loadingResult: boolean;
  errorResult?: PatientErrorType | null;
  result: any;
  responseActions: any;
  pending: boolean;
  success: boolean | null;
  submissionError: any;
  response: {
    covidPathway: null | any;
    monitor: null | any;
    internalEscalation: null | any;
    noAction: null | any;
    externalEscalation: null | any;
    keepComfortable: null | any;
  };
}

export enum PatientErrorType {
  RESPONSE_ERROR = 1,
  USER_HAS_NO_RECORDS = 2,
}

export type ContainerState = AssessmentEvent;

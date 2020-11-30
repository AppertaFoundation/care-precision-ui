import { tPatientsList } from 'types';
/* --- STATE --- */
export interface PatientsList {
  loading: boolean;
  error?: PatientsErrorType | null;
  patientsList: [] | tPatientsList[];
}

export enum PatientsErrorType {
  RESPONSE_ERROR = 1,
  USER_HAS_NO_RECORDS = 2,
}

export type ContainerState = PatientsList;

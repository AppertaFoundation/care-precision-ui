import { tPatientsList } from 'types';
/* --- STATE --- */
export interface SearchPatientRecord {
  loading: boolean;
  error?: any | null;
  patientsList: [] | tPatientsList[];
}

export type ContainerState = SearchPatientRecord;

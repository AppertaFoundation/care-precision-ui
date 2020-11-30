import { keysToCamel } from './keysToCamel';
import { patientParser, patientListParser } from './patientParser';

export const capitalize = (value?: string) =>
  value
    ? value.charAt(0).toUpperCase() + value.slice(1).toLocaleLowerCase()
    : '';

export { keysToCamel, patientParser, patientListParser };

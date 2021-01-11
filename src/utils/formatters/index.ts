import { keysToCamel } from './keysToCamel';
import { patientParser, patientListParser } from './patientParser';
import { keysToSnake } from './serialize';
export const capitalize = (value?: string) =>
  value
    ? value.charAt(0).toUpperCase() + value.slice(1).toLocaleLowerCase()
    : '';

export { keysToCamel, keysToSnake, patientParser, patientListParser };

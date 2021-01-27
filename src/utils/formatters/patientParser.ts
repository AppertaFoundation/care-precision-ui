import { formatDate, formatAge } from './time';

export const getGender = (value: string) =>
  value === 'female' ? 'Female' : 'Male';

export const patientListParser = list => list.map(item => patientParser(item));

export const patientParser = ({
  location,
  nhsnumber,
  birthDateAsString,
  birthDate,
  gender,
  name,
  id,
  assessment,
}) => {
  return {
    location,
    nhsnumber: nhsnumber || '-',
    birthDate: `${formatDate(birthDateAsString)} ${formatAge(
      birthDateAsString,
    )}`,
    birthdate: birthDate,
    gender: getGender(gender),
    name,
    id,
    assessment,
  };
};

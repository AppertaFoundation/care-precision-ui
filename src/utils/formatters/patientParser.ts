import { formatDate, formatAge } from './time';

export const getGender = (value: string) =>
  value === 'female' ? 'Female' : 'Male';

export const patientListParser = list => list.map(item => patientParser(item));

export const assessmentResultFormatter = asssessment => {
  return {
    ...asssessment,
    ...(Boolean(asssessment?.news2) && {
      news2: news2ResultFormatter(asssessment.news2),
    }),
  };
};
export const news2ResultFormatter = news2 => {
  return {
    value: {
      value: news2?.score?.totalScore,
      trend: news2?.trend,
      clinicalRisk: news2?.clinicalRisk?.value,
    },
  };
};

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
    assessment: assessmentResultFormatter(assessment),
  };
};

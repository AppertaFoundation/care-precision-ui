import snakeCase from 'snake-case';
import { isArray, isObject } from './keysToCamel';

export const keysToSnake = function (o) {
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach(k => {
      n[snakeCase(k)] = keysToSnake(o[k]);
    });

    return n;
  } else if (isArray(o)) {
    return (
      o &&
      o.map(i => {
        return keysToSnake(i);
      })
    );
  }

  return o;
};

export const serializeBackground = function (o) {
  if (!o || Object.keys(o).length < 1) {
    return null;
  }
  return {
    frailty: [
      {
        code: o.frailty.code,
        value: o.frailty.value,
      },
    ],
    height: {
      magnitude: parseFloat(o.height),
      unit: 'cm',
    },
    weight: {
      magnitude: parseFloat(o.weight),
      unit: 'kg',
    },
    ...(Boolean(o.pastHistory) && { pastHistory: o.pastHistory }),
    ...(Boolean(o.allergies) && { allergies: o.allergies }),
    ...(Boolean(o.medication) && { medication: o.medication }),
  };
};

export const serializeSituation = function (o) {
  if (!o || Object.keys(o).length < 1) {
    return null;
  }
  const otherSoftSigns =
    o.softSigns && o.softSigns.includes('Other') ? o.other : null;
  return {
    uuid: o.uuid,
    softSigns: [otherSoftSigns, ...o.softSigns].filter(Boolean),
    ...(Boolean(o.notes) && { notes: o.notes }),
  };
};

export const serializeNews2 = function (news2, news2Score) {
  if (!news2 || Object.keys(news2).length < 1) {
    return null;
  }
  const formatedNews2 = { ...news2 };
  Object.keys(news2).forEach(key => {
    const magnitude = news2[`${key}`]?.magnitude;
    if (key === 'spo2') {
      formatedNews2.spo2 = Number(news2.spo2);
    }
    if (key === 'inspiredOxygen' && news2.inspiredOxygen.flowRate) {
      const flowRate = {
        magnitude: Number(news2.inspiredOxygen.flowRate.magnitude),
        unit: news2.inspiredOxygen.flowRate.unit,
      };
      formatedNews2.inspiredOxygen = {
        ...news2.inspiredOxygen,
        flowRate: flowRate,
      };
    }
    if (magnitude) {
      formatedNews2[`${key}`] = {
        magnitude: Number(magnitude),
        unit: news2[`${key}`].unit,
      };
    }
  });
  return {
    ...formatedNews2,
    news2Score: news2Score,
  };
};

export const serializeSepsisScreening = function (o) {
  if (!o || Object.keys(o).length < 1) {
    return null;
  }
  const sepsis = {
    ...(o.riskFactorsForSepsis.length > 0 && {
      risk_factors_for_sepsis: o.riskFactorsForSepsis,
    }),
    ...(o.likelySourceOfInfection.length > 0 && {
      likely_source_of_infection: o.likelySourceOfInfection,
    }),
    ...(o.redFlags.length > 0 && { red_flags: o.redFlags }),
    ...(o.amberFlags.length > 0 && { amber_flags: o.amberFlags }),
    ...(o.flags999.length > 0 && { [`${'999_flags'}`]: o.flags999 }),
  };
  return Object.keys(sepsis).length > 0 ? sepsis : 'Done, nothing was selected';
};
export const serializeDenwis = function (o, totalScore) {
  if (!o || Object.keys(o).length < 1) {
    return null;
  }

  return {
    q1_breathing: {
      code: o.q1Breathing.code,
      value: o.q1Breathing.value,
      ordinal: o.q1Breathing.code === 'at0031' ? 1 : 0,
    },
    q2_circulation: {
      code: o.q2Circulation.code,
      value: o.q2Circulation.value,
      ordinal:
        o.q2Circulation.code && o.q2Circulation.code === 'at0036' ? 1 : 0,
    },
    q3_temperature: {
      code: o.q3Temperature.code,
      value: o.q3Temperature.value,
      ordinal: o.q3Temperature.code === 'at0105' ? 1 : 0,
    },
    q4_mentation: {
      code: o.q4Mentation.code,
      value: o.q4Mentation.value,
      ordinal: o.q4Mentation.code === 'at0045' ? 1 : 0,
    },

    q5_agitation: {
      code: o.q5Agitation.code,
      value: o.q5Agitation.value,
      ordinal: o.q5Agitation.code === 'at0049' ? 1 : 0,
    },

    q6_pain: {
      code: o.q6Pain.code,
      value: o.q6Pain.value,
      ordinal: o.q6Pain.code === 'at0052' ? 1 : 0,
    },

    q7_trajectory: {
      code: o.q7Trajectory.code,
      value: o.q7Trajectory.value,
      ordinal: o.q7Trajectory.code === 'at0055' ? 1 : 0,
    },

    q8_patient_subjective: {
      code: o.q8PatientSubjective.code,
      value: o.q8PatientSubjective.value,
      ordinal: o.q8PatientSubjective.code === 'at0058' ? 1 : 0,
    },

    q9_nurse_subjective: {
      code: o.q9NurseSubjective.code,
      value: o.q9NurseSubjective.value,
      ordinal: o.q9NurseSubjective.code === 'at0061' ? 1 : 0,
    },
    q_10_other_comment: o.q10OtherComment,
    total_score: totalScore,
  };
};

export const serializeCovid = function (o) {
  if (!o || Object.keys(o).length < 1) {
    return null;
  }

  return {
    ...(o.symptoms.length > 0 && {
      dateOfOnsetOfFirstSymptoms: new Date(o.firstSympomsDate).toISOString(),
      specificSymptomSign: o.symptoms,
    }),
    ...(o.contact.length > 0 && {
      'covid-19_exposure': {
        'care_setting_has_confirmed_covid-19': {
          code: 'at0.14',
          value: 'Potential contact exposure based on location',
        },
        'contact_with_suspected_confirmed_covid-19': {
          code: 'at0.9',
          value: 'Contact with confirmed Covid-19 case',
        },
      },
    }),
    ...(o.covidNotes.length > 0 && {
      covidNotes: o.covidNotes,
    }),
  };
};

const isEmpty = o => {
  return Object.keys(o).length < 1;
};
export const serializeAssessmentJSON = function ({
  uuid,
  situation,
  background,
  news2,
  result,
  sepsis,
  denwis,
  covid,
  clinical,
  response,
}: {
  uuid: string;
  situation: any;
  background: any;
  news2?: any;
  result?: any;
  sepsis?: any;
  denwis?: any;
  covid?: any;
  response?: any;
  clinical: boolean;
}) {
  const header = {
    start_time: new Date().toISOString(),
    uuid: uuid,
    healthcare_facility: 'Glen Carse Care Home',
    composer: {
      name: 'RN Joyce Brown',
      id: {
        type: 'NMC',
        id: '12342341',
        namespace: 'uk.org.nmc',
      },
    },
  };
  const situationSection = isEmpty(situation)
    ? null
    : serializeSituation(situation);
  const backgroundSection =
    !isEmpty(background) && serializeBackground(background);
  const news2Seciton = isEmpty(news2)
    ? null
    : serializeNews2(news2, result['news2'].value.value);
  const sepsisSection = isEmpty(sepsis)
    ? null
    : serializeSepsisScreening(sepsis);
  const denwisSection = isEmpty(denwis)
    ? null
    : serializeDenwis(denwis, result?.denwis.value.value);
  const covidSection = isEmpty(covid) ? null : serializeCovid(covid);
  return keysToSnake({
    header: header,
    situation: situationSection,
    background: backgroundSection,
    assessment: {
      ...(Boolean(denwisSection) && { denwis: denwisSection }),
      ...(Boolean(covidSection) && { covid: covidSection }),
      ...(Boolean(sepsisSection) && {
        [`${
          clinical
            ? 'sepsis_clinical_screening_age_12_plus'
            : 'sepsis_non_clinical_screening_age_12_plus'
        }`]: sepsisSection,
      }),
      ...(Boolean(news2Seciton) && { news2: news2Seciton }),
    },
  });
};

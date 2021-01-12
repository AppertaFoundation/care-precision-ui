import snakeCase from 'snake-case';
import { isArray, isObject } from './keysToCamel';

const acvpuMapToCoded = value =>
  ({
    Alert: 'at0005',
    Confusion: 'at0015',
    Voice: 'at0006',
    Pain: 'at0007',
    Unresponsive: 'at0008',
  }[value]);

const riskFactorsForSepsisCoded = value =>
  ({
    'Age over 75': 'at0007',
    'Impaired immunity': 'at0008',
    'Recent Trauma': 'at0009',
    'Indwelling Lines': 'at0010',
  }[value]);

const likelySourceOfInfectionCoded = value =>
  ({
    Respiratory: 'at0012',
    Brain: 'at0013',
    Urine: 'at0014',
    Surgical: 'at0015',
    'Skin/ Joint/ Wound': 'at0026',
    'Indweling device': 'at0027',
  }[value]);

const redFlagAcuteCoded = value =>
  ({
    'Objective evidence of new or altered mental state': 'at0074',
    'Systolic BP ≤ 90 mmHg (or drop of >40 from normal)': 'at0075',
    'Heart rate ≥ 130 per minute': 'at0076',
    'Respiratory rate ≥ 25 per minute': 'at0077',
    'Needs O2 to keep SpO2 ≥ 92% (88% in COPD)': 'at0078',
    'Non-blanching rash / mottled / ashen / cyanotic': 'at0079',
    'Lactate ≥ 2 mmol/l': 'at0080',
    'Recent chemotherapy': 'at0081',
    'Not passed urine in 18 hours (<0.5ml/kg/hr if catheterised)': 'at0082',
  }[value]);

const amberFlagAcuteCoded = value =>
  ({
    'Relatives concerned about mental status': 'at0090',
    'Acute deterioration in functional ability': 'at0091',
    // 'Immunosuppressed',
    'Trauma / surgery / procedure in last 8 weeks': 'at0092',
    'Respiratory rate 21-24': 'at0093',
    'Systolic BP 91-100 mmHg': 'at0094',
    'Heart rate 91-130 or new dysrhythmia': 'at0095',
    'Temperature <36°C': 'at0096',
    'Clinical signs of wound infection': 'at0097',
  }[value]);

const breathingIndicatorCoded = value =>
  ({
    'Noisy breathing': 'at0067',
    'Short of breath': 'at0068',
    'Unable to speak full sentences': 'at0069',
    'Use accessory muscles': 'at0070',
  }[value]);

const circulationIndicatorCoded = value =>
  ({
    'Colour changes: pale, grey': 'at0096',
    'Sweaty/clammy': 'at0097',
    Coldness: 'at0098',
    'Impaired perfusion': 'at0099',
  }[value]);

const covidSymptomsCoded = value =>
  ({
    'Noisy breathing': 'at0067',
    'Short of breath': 'at0068',
    'Unable to speak full sentences': 'at0069',
    'Use accessory muscles': 'at0070',
  }[value]);

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
    pastHistory: o.pastHistory,
    allergies: o.allergies,
    medication: o.medication,
  };
};

export const serializeSituation = function (o) {
  if (!o || Object.keys(o).length < 1) {
    return null;
  }
  const otherSoftSigns =
    o.softSigns && o.softSigns.includes('Other') ? o.other : null;
  return {
    softSigns: [otherSoftSigns, ...o.softSigns].filter(Boolean),
    notes: o.notes,
  };
};

export const serializeNews2 = function (o, news2Score) {
  if (!o || Object.keys(o).length < 1) {
    return null;
  }
  return {
    temperature: {
      magnitude: parseFloat(o.tempature),
      unit: '°C',
    },
    pulse: {
      magnitude: parseFloat(o.pulse),
      unit: '/min',
    },
    respirations: {
      magnitude: parseFloat(o.respirations),
      unit: '/min',
    },
    spo2: o.spO2,
    inspiredOxygen: {
      flowRate: {
        magnitude: parseFloat(o.flowRate),
        unit: 'l/min',
      },
      methodOfOxygenDelivery: 'Room air',
    },
    acvpu: {
      code: acvpuMapToCoded(o.consciousness),
      value: 'Confusion',
    },
    systolic: {
      magnitude: parseFloat(o.systolic),
      unit: '/min',
    },
    diastolic: {
      magnitude: parseFloat(o.diastolic),
      unit: '/min',
    },
    news2Score: news2Score,
  };
};

export const serializeSepsisScreening = function (o) {
  if (!o || Object.keys(o).length < 1) {
    return null;
  }
  return {
    risk_factors_for_sepsis:
      o.riskFactorsForSepsis &&
      o.riskFactorsForSepsis.map(item => riskFactorsForSepsisCoded(item)),
    likely_source_of_infection:
      o.likelySourceOfInfection &&
      o.likelySourceOfInfection.map(item => likelySourceOfInfectionCoded(item)),
    red_flag_acute:
      o.redFlagAcute && o.redFlagAcute.map(item => redFlagAcuteCoded(item)),
    amber_flag_acute:
      o.amberFlagAcute &&
      o.amberFlagAcute.map(item => amberFlagAcuteCoded(item)),
  };
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
    breathing_indicator:
      o.breathingIndicator &&
      o.breathingIndicator.map(item => ({
        value: item,
        code: breathingIndicatorCoded(item),
      })),
    q2_circulation: {
      code: o.q2Circulation.code,
      value: o.q2Circulation.value,
      ordinal:
        o.q2Circulation.code && o.q2Circulation.code === 'at0036' ? 1 : 0,
    },
    circulation_indicator:
      o.circulationIndicator &&
      o.circulationIndicator.map(item => ({
        value: item,
        code: circulationIndicatorCoded(item),
      })),
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
  const careSettings =
    o.contact && o.contact.includes('Care settings has confirmed case')
      ? {
          code: 'at0.14',
          value: 'Potential contact exposure based on location',
          terminology: 'local',
        }
      : {};
  const haveContact =
    o.contact && o.contact.includes('Contact with suspected/ confirmed COVID')
      ? {
          code: 'at0.9',
          value: 'Contact with confirmed Covid-19 case',
          terminology: 'local',
        }
      : {};
  return {
    covidSymptoms: {
      dateOfOnsetOfFirstFymptoms: o.firstSympomsDate,
      specificSymptomSign:
        o.covidSymptomsCoded &&
        o.covidSymptomsCoded.map(item => covidSymptomsCoded(item)),
      covid_19_exposure: {
        care_setting_has_confirmed_covid_19: careSettings,
        contact_with_suspected_confirmed_covid_19: haveContact,
      },
    },
  };
};
const isEmpty = o => {
  return Object.keys(o).length < 1;
};
export const serializeAssessmentJSON = function ({
  situation,
  background,
  news2,
  result,
  sepsis,
  denwis,
  covid,
}: {
  situation: any;
  background: any;
  news2?: any;
  result?: any;
  sepsis?: any;
  denwis?: any;
  covid?: any;
}) {
  const header = {
    setting: 'other care', //Fixed
    healthcareFacility: 'Glen Carse Care Home', // Institution name
    composer: {
      //Clinical author of the document
      name: 'RN Joyce Brown',
      id: {
        type: 'NMC', // From Demographics
        id: '12342341', //From demographics
        namespace: 'uk.org.nmc', //from demographics
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
    : serializeNews2(news2, result['news2']);
  const sepsisSection = isEmpty(sepsis)
    ? null
    : serializeSepsisScreening(sepsis);
  const denwisSection = isEmpty(denwis)
    ? null
    : serializeDenwis(denwis, result?.denwis.value.value);
  const covidSection = isEmpty(covid) ? null : serializeCovid(covid);
  return keysToSnake([
    {
      templateId: 'open_eREACT-Care', //Fixed
    },
    {
      ...header,
      situation: situationSection,
      background: backgroundSection,
      assessment: {
        denwis: denwisSection,
        sepsisScreening: sepsisSection,
        covid: covidSection,
        news2: news2Seciton,
      },
      response: {},
      service: {},
    },
  ]);
};

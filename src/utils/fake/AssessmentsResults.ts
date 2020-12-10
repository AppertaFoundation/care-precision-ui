const ASSESSMENTS_RESULT = {
  news2: {
    respiration_rate: {
      code: 'at0020',
      value: '21-24',
      ordinal: 2,
    },
    spo_scale_1: {
      code: 'at0031',
      value: '94-95',
      ordinal: 1,
    },
    spo_scale_2: {
      code: 'at0050',
      value: '84-85',
      ordinal: 2,
    },
    air_or_oxygen: {
      code: 'at0036',
      value: 'Air',
      ordinal: 0,
    },
    systolic_blood_pressure: {
      code: 'at0017',
      value: '≤90',
      ordinal: 3,
    },
    pulse: {
      code: 'at0013',
      value: '51-90',
      ordinal: 0,
    },
    consciousness: {
      code: 'at0024',
      value: 'Alert',
      ordinal: 0,
    },
    temperature: {
      code: 'at0023',
      value: '35.1-36.0',
      ordinal: 1,
    },
    total_score: 14,
    clinical_risk_category: {
      code: 'at0059',
      value: 'Medium',
    },
  },
  sepsis: {
    value: {
      value: 'amber',
    },
  },
};

export default ASSESSMENTS_RESULT;

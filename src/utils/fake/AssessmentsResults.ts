const ASSESSMENTS_RESULT = {
  news2: {
    news2: {
      score: {
        pulse: {
          code: 'at0013',
          ordinal: 0,
          value: '51-90',
        },
        spo_scale_1: {
          ordinal: 1,
          value: '94-95',
          code: 'at0031',
        },
        // clinical_risk_category: {
        //   value: 'Medium',
        //   terminology: 'local',
        //   code: 'at0059',
        // },
        air_or_oxygen: {
          code: 'at0036',
          value: 'Air',
          ordinal: 0,
        },
        systolic_blood_pressure: {
          code: 'at0017',
          ordinal: 3,
          value: '≤90',
        },
        consciousness: {
          ordinal: 0,
          value: 'Alert',
          code: 'at0024',
        },
        respiration_rate: {
          ordinal: 2,
          value: '21-24',
          code: 'at0020',
        },
        total_score: 3,
        temperature: {
          value: '35.1-36.0',
          ordinal: 1,
          code: 'at0023',
        },
      },
      clinicalRisk: {
        value: 'at0057',
        localizedDescriptions: {
          en: 'Ward-based response.',
        },
        localizedLabels: {
          en: 'Low',
        },
        label: 'Low',
      },
      trend: 'first',
    },
  },
  sepsis: {
    sepsis: {
      value: {
        value: 'amber',
      },
    },
  },
  denwis: {
    denwis: {
      value: {
        trend: 'decreasing',
        value: 14,
      },
    },
  },
  covid: {
    covid: {
      value: {
        date_isolation_due_to_end: '2020-11-10T22:39:31.826Z',
        suspected_covid_status: 'grey',
        covid_test_request: {
          date: '2020-11-10T22:39:31.826Z',
          value: 'EXAMPLE TEXT',
        },
      },
    },
  },
};

export default ASSESSMENTS_RESULT;

const COVID_MENAGMENT = {
  start_time: '2021-01-04T21:04:10.789Z', //ISO DateTime
  setting: 'nursing home care', //Fixed
  composer: {
    //Clinical author of the document
    name: 'RN Joyce Brown',
    id_scheme: 'NMC', // From Demographics
    id: '12342341', //From demographics
    id_namespace: 'uk.org.nmc', //from demographics
  },
  healthcare_facility: {
    //Clinical author of the document
    name: 'Glen Carse Care Home',
    id_scheme: 'CQC', // From Demographics
    id: '44832', //From demographics
    id_namespace: 'uk.org.cqc', //from demographics
  },
  suspected_covid_status: 'Symptoms',
  isolation_request: {
    reason_for_request: {
      code: '840539006',
      value: 'Disease caused by 2019-nCoV',
      terminology: 'SNOMED-CT',
    },
    reason_for_isolation: 'Tested positive (10 days)',
    isolation_duration: 'P10D',
    date_isolation_due_to_start: '2021-01-04T22:39:31.826Z',
    date_isolation_due_to_end: '2021-01-14T22:39:31.826Z',
  },
  covid_test_request: {
    reason_for_request: 'Recovery Check',
    status: {
      code: 'at0026',
      value: 'Service request sent',
      terminology: 'local',
    },
    status_time: '2020-11-13T16:57:22.995Z',
  },
  covid_test_result: {
    test_result: {
      code: '1321111000000101', //Positive: 1300721000000109
      value: 'COVID-19 excluded by laboratory test',
      terminology: 'SNOMED-CT',
    },
    specimenTakenTime: '2020-11-13T16:57:22.995Z',
  },
};
export default COVID_MENAGMENT;

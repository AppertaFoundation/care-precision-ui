const PATIENT_LIST = [
  {
    assessment: {
      news2: {
        value: {
          trend: 'same',
          value: 4,
          clinicalRisk: 'at0057',
        },
      },
      covid: {
        value: null,
      },
      sepsis: {
        value: {
          value: 'amber',
        },
      },
      denwis: {
        value: {
          trend: 'decreasing',
          value: 14,
        },
      },
    },
    birthDateAsString: '1965-12-13',
    gender: 'female',
    name: 'Mrs Fredrica Smith',
    location: 'Bedroom',
    birthDate: -127872000,
    nhsnumber: '3333333333',
    id: '3B9170C6-30B6-11EB-9B84-84525E058BE1',
  },
  {
    id: '3B917756-30B6-11EB-9B84-84525E058BE1',
    nhsnumber: '9564963656',
    location: 'Bedroom',
    birthDate: -870919200,
    name: 'Miss Kendra Fitzgerald',
    birthDateAsString: '1942-05-28',
    assessment: {
      sepsis: {
        value: null,
      },
      denwis: {
        value: null,
      },
      news2: {
        value: null,
      },
      covid: {
        value: null,
      },
    },
    gender: 'female',
  },
  {
    name: 'Miss Zara Tengku',
    assessment: {
      sepsis: {
        value: {
          value: 'red',
        },
      },
      denwis: {
        value: null,
      },
      news2: {
        value: null,
      },
      covid: {
        value: null,
      },
    },
    birthDateAsString: '1945-04-30',
    gender: 'female',
    id: '3B9183B8-30B6-11EB-9B84-84525E058BE1',
    nhsnumber: null,
    location: 'Bedroom',
    birthDate: -778644000,
  },
  {
    name: 'Miss Praveen Dora',
    gender: 'female',
    assessment: {
      denwis: {
        value: { value: 0, trend: null },
      },
      sepsis: {
        value: null,
      },
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
      news2: {
        value: null,
      },
    },
    birthDateAsString: '1998-03-13',
    id: '3B90A7AE-30B6-11EB-9B84-84525E058BE1',
    nhsnumber: '9876543210',
    identifier: [
      {
        system: 'https://fhir.nhs.uk/Id/nhs-number',
        value: '9876543210',
        extension: [
          {
            valueCodeableConcept: {
              coding: [
                {
                  system:
                    'https://fhir.hl7.org.uk/STU3/CodeSystem/CareConnect-NHSNumberVerificationStatus-1',
                  code: '01',
                  display: 'Number present and verified',
                },
              ],
            },
            url:
              'https://fhir.hl7.org.uk/STU3/StructureDefinition/Extension-CareConnect-NHSNumberVerificationStatus-1',
          },
        ],
      },
      {
        system: 'https://fhir.leedsth.nhs.uk/Id/pas-number',
        value: 'ABC8650149',
      },
      {
        system: 'https://fhir.leedsth.nhs.uk/Id/PPMIdentifier',
        value: '1',
      },
    ],
    birthDate: 889747200,
    location: 'Bedroom',
  },
  {
    birthDateAsString: '1923-08-14',
    assessment: {
      news2: {
        value: null,
      },
      covid: {
        value: null,
      },
      sepsis: {
        value: {
          value: 'amber',
        },
      },
      denwis: {
        value: {
          trend: 'same',
          value: 18,
        },
      },
    },
    gender: 'female',
    name: 'Mrs Christine Taylor',
    location: 'Bedroom',
    birthDate: -1463792400,
    id: '3B917A62-30B6-11EB-9B84-84525E058BE1',
    nhsnumber: '9933157213',
  },
  {
    location: 'Bedroom',
    birthDate: -1081904400,
    nhsnumber: null,
    id: '3B917418-30B6-11EB-9B84-84525E058BE1',
    birthDateAsString: '1935-09-20',
    assessment: {
      news2: {
        value: null,
      },
      covid: {
        value: {
          covid_test_request: {
            date: '2020-11-10T22:39:31.826Z',
            value: 'EXAMPLE TEXT',
          },
          date_isolation_due_to_end: '2020-11-10T22:39:31.826Z',
          suspected_covid_status: 'amber',
        },
      },
      sepsis: {
        value: {
          value: 'red',
        },
      },
      denwis: {
        value: null,
      },
    },
    gender: 'female',
    name: 'Mrs Vicky Munoz',
  },
  {
    nhsnumber: '9876512345',
    id: '3B916D60-30B6-11EB-9B84-84525E058BE1',
    birthDate: 281318400,
    location: 'Bedroom',
    name: 'Mrs Elsie Mills-Samson',
    gender: 'male',
    assessment: {
      sepsis: {
        value: {
          value: 'grey',
        },
      },
      denwis: {
        value: null,
      },
      news2: {
        value: null,
      },
      covid: {
        value: null,
      },
    },
    birthDateAsString: '1978-12-01',
  },
  {
    nhsnumber: '9876543210',
    id: '3B917D6E-30B6-11EB-9B84-84525E058BE1',
    location: 'Bedroom',
    birthDate: 964998000,
    name: 'Miss Delisay Santos',
    assessment: {
      covid: {
        value: {
          covid_test_request: {
            value: 'EXAMPLE TEXT',
            date: '2020-11-10T22:39:31.826Z',
          },
          date_isolation_due_to_end: '2020-11-10T22:39:31.826Z',
          suspected_covid_status: 'amber',
        },
      },
      news2: {
        value: {
          trend: 'raising',
          value: 10,
          clinicalRisk: 'at0060',
        },
      },
      denwis: {
        value: null,
      },
      sepsis: {
        value: {
          value: 'grey',
        },
      },
    },
    birthDateAsString: '2000-07-31',
    gender: 'female',
  },
  {
    location: 'Bedroom',
    birthDate: 897346800,
    id: '3B9180AC-30B6-11EB-9B84-84525E058BE1',
    nhsnumber: '9712738531',
    assessment: {
      denwis: {
        value: {
          value: 4,
          trend: 'raising',
        },
      },
      sepsis: {
        value: {
          value: 'red',
        },
      },
      covid: {
        value: null,
      },
      news2: {
        value: {
          trend: 'raising',
          value: 6,
          clinicalRisk: 'at0059',
        },
      },
    },
    birthDateAsString: '1998-06-09',
    gender: 'female',
    name: 'Miss Darlene Cunningham',
  },
  {
    name: 'Mr Horatio Samson',
    gender: 'male',
    assessment: {
      covid: {
        value: {
          covid_test_request: {
            value: 'EXAMPLE TEXT',
            date: '2020-11-10T22:39:31.826Z',
          },
          suspected_covid_status: 'red',
          date_isolation_due_to_end: '2020-11-10T22:39:31.826Z',
        },
      },
      news2: {
        value: null,
      },
      denwis: {
        value: {
          value: 14,
          trend: 'same',
        },
      },
      sepsis: {
        value: null,
      },
    },
    birthDateAsString: '1970-10-16',
    nhsnumber: '9876543211',
    id: '3B91690A-30B6-11EB-9B84-84525E058BE1',
    birthDate: 24879600,
    location: 'Bedroom',
  },
];
export default PATIENT_LIST;

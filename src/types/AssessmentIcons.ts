interface ICovid {
  value: null | {
    covidTestRequest: {
      date: string;
      value: string;
    };
    suspectedCovidStatus: 'red' | 'grey' | 'amber' | 'green';
    dateIsolationDueToEnd: string;
  };
}

interface INews2 {
  value: {
    trend: 'raising' | 'same' | 'decreasing';
    value: number;
    clinicalRisk: 'at0057' | 'at0058' | 'at0059' | 'at0060';
  };
}

export interface ISepsis {
  value: {
    value: 'amber' | 'red' | 'grey' | 'white';
  } | null;
}

export interface IAssessmentIcons {
  covid: ICovid;
  news2: INews2;
  sepsis: ISepsis;
  denwis: INews2;
}

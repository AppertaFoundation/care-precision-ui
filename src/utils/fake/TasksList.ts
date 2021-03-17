const getLast24hDate = () => {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 1);
  const randomTime = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
  return randomTime;
};

// const taskStatus = tasks => {
//   const STATUS = ['ACCEPTED', 'AWAITING', 'PENDING', 'COMPLETED'];
//   tasks.forEach(task => {
//     const status = STATUS[Math.floor(Math.random() * STATUS.length)];
//     task.status = status;
//   });
//   return tasks;
// };
const addDate = tasks => {
  tasks.forEach(task => {
    task.actionDate = getLast24hDate();
  });
  return tasks;
};

const LIST = [
  {
    name: 'Mr Horatio Samson',
    gender: 'male',
    birthDateAsString: '1970-10-16',
    nhsnumber: '9876543211',
    id: '3B91690A-30B6-11EB-9B84-84525E058BE1',
    birthDate: 24879600,
    location: 'Bedroom',
    action: {
      type: 'Monitor',
      value: 'NEWS2',
    },
    status: 'PENDING',
    delayed: true,
  },
  {
    location: 'Bedroom',
    birthDate: 897346800,
    id: '3B9180AC-30B6-11EB-9B84-84525E058BE1',
    nhsnumber: '9712738531',
    birthDateAsString: '1998-06-09',
    gender: 'female',
    name: 'Miss Darlene Cunningham',
    action: {
      type: 'Monitor',
      value: 'NEWS2',
    },
    status: 'PENDING',
    delayed: true,
  },
  {
    nhsnumber: '9876512345',
    id: '3B916D60-30B6-11EB-9B84-84525E058BE1',
    birthDate: 281318400,
    location: 'Bedroom',
    name: 'Mrs Elsie Mills-Samson',
    gender: 'male',

    birthDateAsString: '1978-12-01',
    action: {
      type: 'Management',
      value: 'COVID',
    },
    status: 'CANCELLED',
  },
  {
    birthDateAsString: '1965-12-13',
    gender: 'female',
    name: 'Mrs Fredrica Smith',
    location: 'Bedroom',
    birthDate: -127872000,
    nhsnumber: '3333333333',
    id: '3B9170C6-30B6-11EB-9B84-84525E058BE1',
    action: {
      type: 'Monitor',
      value: 'NEWS2',
    },
    status: 'ACCEPTED',
  },
  {
    id: '3B917756-30B6-11EB-9B84-84525E058BE1',
    nhsnumber: '9564963656',
    location: 'Bedroom',
    birthDate: -870919200,
    name: 'Miss Kendra Fitzgerald',
    birthDateAsString: '1942-05-28',
    gender: 'female',
    action: {
      type: 'Internal Escalation',
      value: 'Senior Review',
    },
    status: 'ACCEPTED',
  },
  {
    name: 'Miss Zara Tengku',

    birthDateAsString: '1945-04-30',
    gender: 'female',
    id: '3B9183B8-30B6-11EB-9B84-84525E058BE1',
    nhsnumber: '9876543211',
    location: 'Bedroom',
    birthDate: -778644000,
    action: {
      type: 'Management',
      value: 'COVID',
    },
    status: 'AWAITING',
  },
  {
    name: 'Miss Praveen Dora',
    gender: 'female',

    birthDateAsString: '1998-03-13',
    id: '3B90A7AE-30B6-11EB-9B84-84525E058BE1',
    nhsnumber: '9876543210',

    birthDate: 889747200,
    location: 'Bedroom',
    action: {
      type: 'External Escalation',
      value: 'Duty Doctor Review',
    },
    status: 'AWAITING',
  },
  {
    birthDateAsString: '1923-08-14',

    gender: 'female',
    name: 'Mrs Christine Taylor',
    location: 'Bedroom',
    birthDate: -1463792400,
    id: '3B917A62-30B6-11EB-9B84-84525E058BE1',
    nhsnumber: '9933157213',
    action: {
      type: 'Monitor',
      value: 'NEWS2',
    },
    status: 'PENDING',
  },
  {
    location: 'Bedroom',
    birthDate: -1081904400,
    nhsnumber: '9876543211',
    id: '3B917418-30B6-11EB-9B84-84525E058BE1',
    birthDateAsString: '1935-09-20',

    gender: 'female',
    name: 'Mrs Vicky Munoz',
    action: {
      type: 'External Escalation',
      value: 'Duty Doctor Review',
    },
    status: 'REJECTED',
  },
  {
    nhsnumber: '9876543210',
    id: '3B917D6E-30B6-11EB-9B84-84525E058BE1',
    location: 'Bedroom',
    birthDate: 964998000,
    name: 'Miss Delisay Santos',

    birthDateAsString: '2000-07-31',
    gender: 'female',
    action: {
      type: 'Management',
      value: 'COVID',
    },
    status: 'COMPLETED',
  },
];

const TASKS = addDate(LIST);
export default TASKS;

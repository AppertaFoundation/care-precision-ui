import PATIENT_LIST from './PatientList';
import ASSESSMENTS_RESULT from './AssessmentsResults';
import COVID_MANAGEMENT from './CovidMenagment';

export const fake = { COVID_MANAGEMENT, PATIENT_LIST, ASSESSMENTS_RESULT };

const checkByASC = (a, b, key) => {
  if (a.assessment[`${key}`].value && !b.assessment[`${key}`].value) {
    return true;
  }
  if (!a.assessment[`${key}`].value && b.assessment[`${key}`].value) {
    return false;
  }
  if (a.assessment[`${key}`].value && b.assessment[`${key}`].value) {
    return (
      a.assessment[`${key}`].value.value > b.assessment[`${key}`].value.value
    );
  }
  return false;
};

const checkOrder = (a, b, sort) => {
  const { key, value } = sort;
  const ASC = 'ASC';
  const sortedASC = checkByASC(a, b, key);
  return value === ASC ? sortedASC : !sortedASC;
};

const sortByAsssessmentValue = (unsorted, sort) =>
  unsorted.reduce((sorted, el) => {
    let index = 0;
    while (index < sorted.length && checkOrder(el, sorted[index], sort))
      index++;
    sorted.splice(index, 0, el);
    return sorted;
  }, []);

const checkOrderByAge = (a, b, order) => {
  console.log(a);
  const sortedASC = a.birthdate > b.birthdate;
  return order === 'ASC' ? sortedASC : !sortedASC;
};

const sortByAge = (unsorted, order) =>
  unsorted.reduce((sorted, el) => {
    let index = 0;
    while (index < sorted.length && checkOrderByAge(el, sorted[index], order))
      index++;
    sorted.splice(index, 0, el);
    return sorted;
  }, []);

const removePrefix = name => {
  const splitedName = name.split(' ');
  splitedName.shift();
  return splitedName.join(' ');
};
const SortByName = unsorted => {
  return unsorted.sort((a, b) => {
    const aName = removePrefix(a.name);
    const bName = removePrefix(b.name);

    return aName.localeCompare(bName);
  });
};

export const sort = (arrayToSort, params) => {
  const { value, key } = params;
  if (key === 'news2' || key === 'denwis') {
    return sortByAsssessmentValue(arrayToSort, params);
  }
  if (key === 'name') {
    const sorted = SortByName(arrayToSort);
    return key === 'ASC' ? sorted : sorted.reverse();
  }
  if (key === 'birthdate') {
    return sortByAge(arrayToSort, value);
  }
  return arrayToSort;
};

const filterSepis = (arrayToFiltr, flag) =>
  arrayToFiltr.filter(el => el?.assessment?.sepsis?.value?.value === flag);

const filterDenwis = arrayToFiltr =>
  arrayToFiltr.filter(el => el?.assessment?.denwis?.value?.value > 4);

export const filter = (arrayToFiltr, parmas) => {
  if (parmas?.sepsis) {
    return filterSepis(arrayToFiltr, parmas?.sepsis?.value);
  }
  if (parmas?.denwis) {
    return filterDenwis(arrayToFiltr);
  }
  return arrayToFiltr;
};

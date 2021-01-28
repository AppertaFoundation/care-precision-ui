const hasSituation = value =>
  (value && value.softSigns && value.softSigns.length > 0) ||
  'You have to mark at least one soft sign (situation Tab)';
const hasHeight = value =>
  (value && value.height && value.height > 10) ||
  'You have to complete the Height field (background Tab)';
const hasWeight = value =>
  (value && value.weight && value.weight > 10) ||
  'You have to complete the Weight field (background Tab)';
const hasFrailty = value =>
  (value && value.frailty && Object.keys(value.frailty).length > 0) ||
  'You have to mark one frailty (background Tab)';

export const validate = (situation, background) => {
  const situationArray = hasSituation(situation);
  const height = hasHeight(background);
  const weight = hasWeight(background);
  const frailty = hasFrailty(background);
  const errorsArray = [situationArray, height, weight, frailty].filter(
    error => typeof error === 'string',
  );
  return errorsArray as string[] | [];
};

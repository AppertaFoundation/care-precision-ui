const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
export const daysDifference = (start?: string, end?: string) => {
  if (start) {
    const oneDay = 24 * 60 * 60 * 1000;
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : Date.now();
    return Math.round(
      Math.abs((startDate.valueOf() - endDate.valueOf()) / oneDay),
    );
  }
  return null;
};

export const formatTime = (value?: string) => {
  if (value) {
    const date = new Date(value);
    const houre = date.getHours();
    const minuts = date.getMinutes();
    return `${houre}:${minuts}`;
  }
  return null;
};
//TODO[3]: https://stackoverflow.com/questions/15109894/new-date-works-differently-in-chrome-and-firefox
//Chrome adds timezone offset while Firefox doesn
export const formatDate = (value: string) => {
  const date = new Date(value);
  if (!date) {
    const birthDate = value.split('-');
    return renderDate(birthDate);
  }
  return renderDate(date);
};

const renderDate = date => {
  const year = date.getFullYear().toString().slice(-2);
  const day = date.getDate();
  const month = MONTHS[date.getMonth()];
  return `${day}-${month}-${year}`;
};

export const formatAge = (value: string) => {
  const date = new Date(value);
  if (!date) {
    const birthDate = value.split('-');
    return renderAge(birthDate);
  }
  return renderAge(date);
};

const renderAge = date => {
  const diffMs = Date.now() - date.getTime();
  const ageDt = new Date(diffMs);
  return `(${Math.abs(ageDt.getUTCFullYear() - 1970)} yrs)`;
};

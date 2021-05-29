export const createDate = (dateISOString) => {
  let date;

  if (!dateISOString) {
    date = new Date();
  } else {
    date = new Date(dateISOString);
  }

  return date.toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'medium',
  });
};

export const dateISOtoMySQL = (dateISOString) => {
  const dateArg = createDate(dateISOString);
  const [date, time] = dateArg.split(' ');
  const [day, month, year] = date.split('/');
  return `${year}-${month}-${day} ${time}`;
};

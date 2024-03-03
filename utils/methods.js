function convertStringToDate(date) {
  const [day, month, year] = date.split('/');
  return new Date(`${year}-${month}-${day}`);
}

module.exports = { convertStringToDate }
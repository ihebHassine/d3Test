export const randomDataGenerator = (length, startDate, endDate) => {
  const arr = [];
  const data = [];
  while (arr.length < length) {
    var date = convertDateYyyyMmDd(randomDate(startDate, endDate));
    if (arr.indexOf(date) === -1) arr.push(date);
  }
  for (let index = 0; index < length; index++) {
    data.push({
      id: index,
      value: Math.floor(Math.random() * length * 100 + 1),
      date: arr[index],
    });
  }

  return data;
};

export const randomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

export const getDateOfXDaysAgo = (days) => {
  var date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

export const convertDateDdMmYyyy = (inputFormat, separator) => {
  function pad(s) {
    return s < 10 ? "0" + s : s;
  }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join(
    separator ? separator : "/"
  );
};
export const convertDateYyyyMmDd = (inputFormat, separator) => {
  function pad(s) {
    return s < 10 ? "0" + s : s;
  }
  var d = new Date(inputFormat);
  return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join(
    separator ? separator : "/"
  );
};

export const getMaxValueInData = (data) => {
  return Math.max(...data.map((o) => o.value));
};

export const getIndexFromArrayById = (array, id) => {
  var index = array.findIndex((item, i) => {
    return id === item.id;
  });

  return index;
};

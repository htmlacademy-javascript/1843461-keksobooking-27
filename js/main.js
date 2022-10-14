const getRandomInt = (min, max) => {
  if (min > max) {
    [min, max] = [max, min];
  } else if (min === max) {
    return -1;
  }

  if (min < 0 || max < 0) {
    return -1;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let res = getRandomInt(2, 5);
// console.log('res1: ', res);

const getRandomNum = (min, max, quantum) => {
  if (min > max) {
    [min, max] = [max, min];
  } else if (min === max) {
    return -1;
  }

  if (min < 0 || max < 0) {
    return -1;
  }

  return +(Math.random() * (max - min) + min).toFixed(quantum);
};

res = getRandomNum(1, 3, 4);
//console.log('res2: ', res)

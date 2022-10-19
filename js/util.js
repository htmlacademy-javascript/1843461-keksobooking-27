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

const getRandomFloat = (min, max, quantum) => {
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

export { getRandomInt, getRandomFloat };

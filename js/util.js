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

const numDecline = (num, nominative, genitiveSingular, genitivePlural) => {
  if (num > 10 && Math.round((num % 100) / 10) === 1) {
    return `${num} ${genitivePlural}`;
  }
  switch (num % 10) {
    case 1: return `${num} ${nominative}`;
    case 2:
    case 3:
    case 4: return `${num} ${genitiveSingular}`;
  }
  return `${num} ${genitivePlural}`;
};

const numGenitiveDecline = (num, genitiveSingular, genitivePlural) => {
  if (num === 11) {
    return `${num} ${genitivePlural}`;
  }
  switch (num % 10) {
    case 1: return `${num} ${genitiveSingular}`;
    default: return `${num} ${genitivePlural}`;
  }
};

export { getRandomInt, getRandomFloat, numDecline, numGenitiveDecline };


import { getRandomInt, getRandomFloat } from './util';

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const MIN_PRICE = 100; //вилка цен не была объявлена; задаю на свое усмотрение
const MAX_PRICE = 2500;
const TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const QUANTUM = 5; //число знаков после запятой
const CHEK = ['12:00', '13:00', '14:00'];
const Coords = {
  LAT: { MIN: 35.65, MAX: 35.70 },
  LNG: { MIN: 139.7, MAX: 139.8 }
};

const getObject = () => {
  const randomAva = getRandomInt(1, 10);
  const randomCheckin = getRandomInt(0, 2); // во сколько заехали, во столько же и выезжают

  const randomFeatures = () => {
    const length = getRandomInt(1, 6);
    const arr = [];
    for (let i = 0; i < length; i++) {
      let index = getRandomInt(0, FEATURES.length - 1);
      if (index === -1) {
        index = 0;
      } //на случай, когда при рандомной длине length=6 в массиве features останется один элемент, getRandomInt(0,1-1) выдаст ошибку -1, т.к. min=max
      arr[i] = FEATURES[index];
      FEATURES.splice(index, 1); //удаляю введенный элемент, чтобы не было повторений
    }
    return arr;
  };

  const randomPhotos = getRandomInt(0, 3);
  const locationLAT = getRandomFloat(Coords.LAT.MIN, Coords.LAT.MAX, QUANTUM);
  const locationLNG = getRandomFloat(Coords.LNG.MIN, Coords.LNG.MAX, QUANTUM);

  return {
    author: {
      avatar: `img/avatars/user${randomAva < 10 ? 0 : ''}${randomAva}.png`,
    },
    offer: {
      title: 'Мозамбик ждёт тебя...',
      address: `${locationLAT}, ${locationLNG}`,
      price: getRandomInt(MIN_PRICE, MAX_PRICE),
      type: TYPE[getRandomInt(0, TYPE.length - 1)],
      rooms: getRandomInt(1, 7),
      guests: getRandomInt(1, 30),
      checkin: `${CHEK[randomCheckin]}`,
      checkout: `${CHEK[randomCheckin]}`,
      features: randomFeatures(),
      description:
        'Евроремонт, всё чики-пуки, all inclusive, вид на Кремль из любого окна, даже если вы в Париже',
      photos: PHOTOS.slice(0, randomPhotos),
    },
    location: {
      lat: locationLAT,
      lng: locationLNG,
    },
  };
};

const demandedArray = Array.from({ length: 10 }, getObject);

export { demandedArray };

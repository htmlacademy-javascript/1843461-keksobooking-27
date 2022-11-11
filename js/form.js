import { TYPE } from './genesis.js';
import { resetMap } from './map.js';

const roomsToGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const guestsToRooms = {
  0: ['100'],
  1: ['1', '2', '3'],
  2: ['2', '3'],
  3: ['3'],
};

const minPriceForType = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000'
};

const formMap = document.querySelectorAll('.map__filters select, .map__filters fieldset');
const formAd = document.querySelectorAll('.ad-form fieldset');
const adFormElement = document.querySelector('.ad-form');
const roomsNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const pricePerNight = document.querySelector('#price');
const typeOfLiving = document.querySelector('#type');
const resetButton = document.querySelector('.ad-form__reset');

const toggleDisabled = () => {
  document.querySelector('.map__filters').classList.toggle('map__filters--disabled');
  formMap.forEach((item) => {
    item.disabled = !item.disabled;
  });

  document.querySelector('.ad-form').classList.toggle('ad-form--disabled');
  formAd.forEach((item) => {
    item.disabled = !item.disabled;
  });
};

const pristine = new Pristine(
  adFormElement,
  {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    errorTextParent: 'ad-form__element',
  },
  true
);

const validatePrice = () => Number(pricePerNight.value) > Number(pricePerNight.min);
const validateCapacity = () => roomsToGuests[roomsNumber.value].includes(capacity.value);
const getCapacityError = () =>
  `Указанное количество комнат вмещает ${roomsToGuests[roomsNumber.value].join(' или ')}  число гостей`;
const getRoomsNumberError = () =>
  `Для указанного количества гостей требуется ${guestsToRooms[capacity.value].join(' или ')} комнаты`;
const getPriceError = () =>
  `Минимальная цена за ${TYPE[typeOfLiving.value]} за ночь должна быть не менее ${pricePerNight.min}`;

pristine.addValidator(
  roomsNumber,
  validateCapacity,
  getRoomsNumberError
);
pristine.addValidator(
  capacity,
  validateCapacity,
  getCapacityError
);
pristine.addValidator(
  pricePerNight,
  validatePrice,
  getPriceError
);

const onRoomsNumberChange = () => {
  pristine.validate(roomsNumber);
  pristine.validate(capacity);
};

const onCapacityChange = () => {
  pristine.validate(roomsNumber);
  pristine.validate(capacity);
};

roomsNumber.addEventListener('change', onRoomsNumberChange);
capacity.addEventListener('change', onCapacityChange);

adFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

resetButton.addEventListener('click', () => {
  resetMap();
});

//Валидация мин-ой цены и ползунка при выборе типа жилья
const validateMinPrice = (evt) => {
  pricePerNight.placeholder = minPriceForType[evt.target.value];
  pricePerNight.min = minPriceForType[evt.target.value];
  pristine.validate(pricePerNight);
};

const onTypeOfLivingChange = (evt) => validateMinPrice(evt);
typeOfLiving.addEventListener('change', onTypeOfLivingChange);

// Валидация времени выезда по времени заезда и наоборот
const timein = document.querySelector('#timein');
const timeout = document.querySelector('#timeout');
const onTimeinChange = (evt) => {
  timeout.value = evt.target.value;
};
const onTimeoutChange = (evt) => {
  timein.value = evt.target.value;
};
timein.addEventListener('change', onTimeinChange);
timeout.addEventListener('change', onTimeoutChange);

export { toggleDisabled };

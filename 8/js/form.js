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
  flat: '1 000',
  hotel: '3 000',
  house: ' 5 000',
  palace: '10 000'
};

const ckeckIn = {
  '12:00': 'После 12',
  '13:00': 'После 13',
  '14:00': 'После 14',
};
const ckeckOut = {
  '12:00': 'Выезд до 12',
  '13:00': 'Выезд до 13',
  '14:00': 'Выезд до 14',
};

const formMap = document.querySelectorAll('.map__filters select, .map__filters fieldset');
const formAd = document.querySelectorAll('.ad-form fieldset');
const adFormElement = document.querySelector('.ad-form');
const roomsNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');

//Валидация мин-ой цены при выборе типа жилья
const pricePerNight = document.querySelector('#price');
const typeOfLiving = document.querySelector('#type');
const validateMinPrice = (evt) => {
  pricePerNight.placeholder = minPriceForType[evt.target.value];
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

const validateCapacity = () => roomsToGuests[roomsNumber.value].includes(capacity.value);
const getCapacityError = () =>
  `Указанное количество комнат вмещает ${roomsToGuests[roomsNumber.value].join(' или ')}  число гостей`;
const getRoomsNumberError = () =>
  `Для указанного количества гостей требуется ${guestsToRooms[capacity.value].join(' или ')} комнаты`;

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


export { toggleDisabled };

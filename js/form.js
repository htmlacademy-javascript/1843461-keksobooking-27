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

const formMap = document.querySelectorAll('.map__filters select, .map__filters fieldset');
const formAd = document.querySelectorAll('.ad-form fieldset');
const adFormElement = document.querySelector('.ad-form');
const roomsNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');

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
  const isValid = pristine.validate();

  if (isValid) { //временная заглушка с консолями со слов Игоря. "не виноватая я, он сам сказал" :))
    console.log('Можно отправлять');
  } else {
    console.log(pristine.getErrors());
  }
});


export { toggleDisabled };

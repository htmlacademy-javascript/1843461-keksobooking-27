const sliderElem = document.querySelector('.ad-form__slider');
const pricePerNight = document.querySelector('#price');
const typeOfLiving = document.querySelector('#type');

const minPriceForType = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000'
};

noUiSlider.create(sliderElem, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 1000,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    }
  }
});

sliderElem.noUiSlider.on('update', () => {
  pricePerNight.value = sliderElem.noUiSlider.get(true);
});

typeOfLiving.addEventListener('change', (evt) => {
  sliderElem.noUiSlider.set(Number(minPriceForType[evt.target.value]));
});

pricePerNight.addEventListener('change', function () {
  sliderElem.noUiSlider.set(this.value);
});


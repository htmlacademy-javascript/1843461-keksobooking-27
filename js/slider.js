const sliderElem = document.querySelector('.ad-form__slider');
const pricePerNight = document.querySelector('#price');

noUiSlider.create(sliderElem, {
  range: {
    min: 1000,
    max: 100000,
  },
  start: 2000,
  step: 1,
  connect: 'lower',
});

// sliderElem.noUiSlider.on('update', () => {
//   pricePerNight.value = sliderElem.noUiSlider.get();
// });


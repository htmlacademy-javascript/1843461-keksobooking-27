const formMap = document.querySelectorAll('.map__filters select, .map__filters fieldset');
const formAd = document.querySelectorAll('.ad-form fieldset');

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

export { toggleDisabled };

import { offersArray } from './data.js';
import { numDecline, numGenitiveDecline } from './util.js';

const TYPE = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель'
};

const renderCard = () => {
  const template = document.querySelector('#card').content;
  const popup = template.cloneNode(true);

  const popupTitle = popup.querySelector('.popup__title');
  if (offersArray[0].offer.title) {
    popupTitle.textContent = offersArray[0].offer.title;
  } else {
    popupTitle.remove();
  }

  const popupAddress = popup.querySelector('.popup__text--address');
  if (offersArray[0].offer.address) {
    popupAddress.textContent = offersArray[0].offer.address;
  } else {
    popupAddress.remove();
  }

  const popupPrice = popup.querySelector('.popup__text--price');
  if (offersArray[0].offer.price) {
    popupPrice.innerHTML = `${offersArray[0].offer.price} <span>₽/ночь</span>`;
  } else {
    popupPrice.remove();
  }

  const popupType = popup.querySelector('.popup__type');
  if (offersArray[0].offer.type) {
    popupType.textContent = TYPE[offersArray[0].offer.type];
  } else {
    popupType.remove();
  }

  const popupCapacity = popup.querySelector('.popup__text--capacity');
  if (offersArray[0].offer.rooms && offersArray[0].offer.guests) {
    popupCapacity.textContent = `${numDecline(offersArray[0].offer.rooms, 'комната', 'комнаты', 'комнат')} для ${numGenitiveDecline(offersArray[0].offer.guests, 'гостя', 'гостей')}.`;
  } else {
    popupCapacity.remove();
  }

  const popupTime = popup.querySelector('.popup__text--time');
  if (offersArray[0].offer.checkin && offersArray[0].offer.checkout) {
    popupTime.textContent = `Заезд после ${offersArray[0].offer.checkin}, выезд до ${offersArray[0].offer.checkout}`;
  } else {
    popupTime.remove();
  }

  const popupFeatures = popup.querySelector('.popup__features');
  const renderFeature = (arr1, arr2) => {
    if (arr2) {
      for (let i = arr1.length - 1; i >= 0; i--) {
        let key = false;
        for (let j = 0; j < arr2.length; j++) {
          if (arr1[i].classList[1].replace('popup__feature--', '') === arr2[j]) {
            key = true;
            arr1[i].textContent = arr2[j]; //ВПИСЫВАЮ В ТЕГ li значение "удобства: wi-fi" и тд
            break;
          }
        }
        if (!key) {
          arr1[i].remove();
        }
      }
    } else {
      popupFeatures.remove();
    }
  };
  renderFeature(popupFeatures.children, offersArray[0].offer.features);

  const popupDescription = popup.querySelector('.popup__description');
  if (offersArray[0].offer.description) {
    popupDescription.textContent = offersArray[0].offer.description;
  } else {
    popupDescription.remove();
  }

  const popupPhotos = popup.querySelector('.popup__photos');
  if (offersArray[0].offer.photos.length) {
    popupPhotos.children[0].src = offersArray[0].offer.photos[0];

    offersArray[0].offer.photos.slice(1).forEach((photo) => {
      const photoTemplate = popupPhotos.querySelector('.popup__photo').cloneNode(true);
      photoTemplate.src = photo;
      popupPhotos.appendChild(photoTemplate);
    });
  } else {
    popupPhotos.remove();
  }

  const popupAvatar = popup.querySelector('.popup__avatar');
  if (offersArray[0].author.avatar) {
    popupAvatar.src = offersArray[0].author.avatar;
  } else {
    popupAvatar.remove();
  }

  return popup;
};

const mapCanvas = document.querySelector('.map__canvas');
mapCanvas.appendChild(renderCard());

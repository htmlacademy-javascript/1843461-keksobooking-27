import { offersArray } from './data.js';
import { numDecline, numGenitiveDecline } from './util.js';

const TYPE = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель'
};

const renderCard = ({ offer, author }) => {
  const template = document.querySelector('#card').content;
  const popup = template.cloneNode(true);

  const popupTitle = popup.querySelector('.popup__title');
  if (offer.title) {
    popupTitle.textContent = offer.title;
  } else {
    popupTitle.remove();
  }

  const popupAddress = popup.querySelector('.popup__text--address');
  if (offer.address) {
    popupAddress.textContent = offer.address;
  } else {
    popupAddress.remove();
  }

  const popupPrice = popup.querySelector('.popup__text--price');
  if (offer.price) {
    popupPrice.innerHTML = `${offer.price} <span>₽/ночь</span>`;
  } else {
    popupPrice.remove();
  }

  const popupType = popup.querySelector('.popup__type');
  if (offer.type) {
    popupType.textContent = TYPE[offer.type];
  } else {
    popupType.remove();
  }

  const popupCapacity = popup.querySelector('.popup__text--capacity');
  if (offer.rooms && offer.guests) {
    popupCapacity.textContent = `${numDecline(offer.rooms, 'комната', 'комнаты', 'комнат')} для ${numGenitiveDecline(offer.guests, 'гостя', 'гостей')}.`;
  } else {
    popupCapacity.remove();
  }

  const popupTime = popup.querySelector('.popup__text--time');
  if (offer.checkin && offer.checkout) {
    popupTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    popupTime.remove();
  }

  const popupFeatures = popup.querySelectorAll('.popup__feature');
  const renderFeature = (children, features) => {
    if (features.length > 0) {
      children.forEach((child) => {
        if (!features.includes(child.classList[1].replace('popup__feature--', ''))) {
          child.remove();
        }
      });
    } else {
      popup.querySelector('.popup__features').remove();
    }
  };
  renderFeature(popupFeatures, offer.features);


  const popupDescription = popup.querySelector('.popup__description');
  if (offer.description) {
    popupDescription.textContent = offer.description;
  } else {
    popupDescription.remove();
  }

  const popupPhotos = popup.querySelector('.popup__photos');
  if (offer.photos.length) {
    popupPhotos.children[0].src = offer.photos[0];

    offer.photos.slice(1).forEach((photo) => {
      const photoTemplate = popupPhotos.querySelector('.popup__photo').cloneNode(true);
      photoTemplate.src = photo;
      popupPhotos.appendChild(photoTemplate);
    });
  } else {
    popupPhotos.remove();
  }

  const popupAvatar = popup.querySelector('.popup__avatar');
  if (author.avatar) {
    popupAvatar.src = author.avatar;
  } else {
    popupAvatar.remove();
  }

  return popup;
};

const mapCanvas = document.querySelector('.map__canvas');
mapCanvas.appendChild(renderCard(offersArray[0]));

export { TYPE };

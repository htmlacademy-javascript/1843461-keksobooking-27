import { toggleDisabled } from './form.js';
import { offersArray } from './data.js';
import { renderCard } from './genesis.js';

const address = document.querySelector('#address');

const map = L.map('map-canvas')
  .on('load', toggleDisabled)
  .setView({
    lat: 35.6895,
    lng: 139.692,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const points = offersArray;

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPin = L.marker(
  {
    lat: 35.6895,
    lng: 139.692,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);
mainPin.addTo(map);


const createMarker = (item) => {
  const { lat, lng } = item.location;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    }
  );

  marker
    .addTo(map)
    .bindPopup(() => renderCard(item));
};

points.forEach((item) => {
  createMarker(item);
});


mainPin.on('moveend', (evt) => {
  const strAddress = `${evt.target.getLatLng()}`;
  address.value = strAddress.slice(7, strAddress.length - 2); //я был вынужден выкручиваться, т.к. деструктуризация: {lat, lng} = evt.target.getLatLng(); не сработала, а строчка выше выводится как: LatLng(35.574493, 139.720928);
});

const resetMap = () => {
  mainPin.setLatLng({
    lat: 35.68950,
    lng: 139.69200,
  });
  map.setView({
    lat: 35.68950,
    lng: 139.69200,
  }, 10);
};

export { resetMap };

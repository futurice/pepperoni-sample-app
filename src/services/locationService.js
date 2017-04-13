import * as env from '../../env';
import * as Utils from '../utils/utils';
import {
  RESPONSE_FAILURE,
  RESPONSE_OFFICE_PLACE
} from '../modules/office/OfficeState';

const CLIENT_ID = env.SERVICE_CLIENT_ID;
const CLIENT_SECRET = env.SERVICE_CLIENT_SECRET;
const CATEGORY_ID = '4d4b7105d754a06374d81259'; //CatergoryId for 'Food'
const RADIUS = '500'; //In meters

var venues = [];

export function getPlace(city) {
  var url = 'https://api.foursquare.com/v2/venues/explore?' +
    'radius=' + RADIUS +
    '&categoryId=' + CATEGORY_ID +
    '&ll=' + city.latitude + ',' + city.longitude +
    '&v=' + Utils.getTodayFormatted() +
    '&client_id=' + CLIENT_ID +
    '&client_secret=' + CLIENT_SECRET;

  return fetch(url)
    .then(response => response.json())
    .then(jsonData => {
      venues = jsonData.response.groups[0].items;
      return getRamdonPlace(venues);
    })
    .then((place) => ({type: RESPONSE_OFFICE_PLACE, payload: place}))
    .catch((error) => ({type: RESPONSE_FAILURE, payload: error.message}));
}

function getRamdonPlace(places) {
  var place = places[Utils.getRamdonNumberBetweenRange(places.length, 0)].venue;
  console.log('ramdon place: ', place);
  return place;
}

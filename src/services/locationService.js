import * as env from '../../env';
import {
  FAILURE_RESPONSE,
  VENUES_RESPONSE,
  RETRY_PLACE_RESPONSE_SUCCESS
} from '../modules/office/OfficeState';
import {_} from 'lodash';

const CLIENT_ID = env.FOURSQUARE_CLIENT_ID;
const CLIENT_SECRET = env.FOURSQUARE_CLIENT_SECRET;
const CATEGORY_ID = '4d4b7105d754a06374d81259'; //CatergoryId for 'Food'
const RADIUS = '500'; //In meters

/**
 * Function to get all the venues around the office selected
 */
export function getVenues(office) {
  //Get the todays date with the format yyyyMMdd
  const dateFormatted = new Date().toISOString().slice(0,10).split('-').join('');
  var url = 'https://api.foursquare.com/v2/venues/explore?' +
    'radius=' + RADIUS +
    '&categoryId=' + CATEGORY_ID +
    '&ll=' + office.latitude + ',' + office.longitude +
    '&v=' + dateFormatted +
    '&client_id=' + CLIENT_ID +
    '&client_secret=' + CLIENT_SECRET;

  return fetch(url)
    .then(response => response.json())
    .then(jsonData => jsonData.response.groups[0].items)
    .then(venues => ({type: VENUES_RESPONSE, payload: venues}))
    .catch(error => ({type: FAILURE_RESPONSE, payload: error.message}));
}

/**
 * Function to select a ramdon place from an array of venues
 */
function getRamdonPlace(venues) {
  //Check if venues is an array or an object and return one place
  return (venues.length)
    ? venues[_.random(0, venues.length - 1)].venue
    : venues;
}

/**
 * Function to get all the information about one of the ramdon places
 */
export function getInfoPlace(venues, typeResponse) {
  const place = getRamdonPlace(venues);
  //Get the todays date with the format yyyyMMdd
  const dateFormatted = new Date().toISOString().slice(0,10).split('-').join('');
  var url = 'https://api.foursquare.com/v2/venues/' +
    place.id +
    '?v=' + dateFormatted +
    '&client_id=' + CLIENT_ID +
    '&client_secret=' + CLIENT_SECRET;

  return fetch(url)
    .then(response => response.json())
    .then(jsonData => jsonData.response.venue)
    .then(venue => ({type: typeResponse, payload: venue}))
    .catch(error => ({type: FAILURE_RESPONSE, payload: error.message}));
}

/**
 * Function to get another different place from the list of venues
 */
export function getAnotherPlace(venues, oldPlace) {
  if (venues.length > 1) {
    var newPlace = oldPlace;
    while (newPlace.name === oldPlace.name) {
      newPlace = getRamdonPlace(venues);
    }
    return getInfoPlace(newPlace, RETRY_PLACE_RESPONSE_SUCCESS);
  }
  return getInfoPlace(oldPlace, RETRY_PLACE_RESPONSE_SUCCESS);
}

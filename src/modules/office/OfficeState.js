import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop-symbol-ponyfill';
import {NavigationActions} from 'react-navigation';
import {getVenues, getInfoPlace, getAnotherPlace} from '../../services/locationService';
import {Alert} from 'react-native';

// Initial state
const initialState = Map({
  position: 0,
  loading: false,
  office: {},
  place: {},
  venues: []
});

// Actions
//Select Office
const OFFICE_REQUEST = 'OFFICE_REQUEST';

//Find a ramdon place from a list of venues
export const VENUES_RESPONSE = 'VENUES_RESPONSE';
const PLACE_DETAILS_RESPONSE_SUCCESS = 'PLACE_DETAILS_RESPONSE_SUCCESS';

//Retry a new ramdon place
const RETRY_PLACE_REQUEST = 'RETRY_PLACE_REQUEST';
export const RETRY_PLACE_RESPONSE_SUCCESS = 'RETRY_PLACE_RESPONSE_SUCCESS';

//Error
export const FAILURE_RESPONSE = 'FAILURE_RESPONSE';

const POSITION_CHANGED = 'POSITION_CHANGED';

// Action creators
export function changePosition(position) {
  return {
    type: POSITION_CHANGED,
    payload: position
  };
}

export function selectOffice(office) {
  return {
    type: OFFICE_REQUEST,
    payload: office
  };
}

export function retryPlace(venues, oldPlace) {
  return {
    type: RETRY_PLACE_REQUEST,
    payload: {
      venues,
      oldPlace
    }
  };
}

// Reducer
export default function OfficeStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case POSITION_CHANGED:
      return state.set('position', action.payload);

    case OFFICE_REQUEST:
      return loop(
        state
          .set('loading', true)
          .set('office', action.payload), //office
        Effects.promise(getVenues, action.payload)
      );

    case VENUES_RESPONSE:
      return loop(
        state
          .set('venues', action.payload), //places around the office
        Effects.promise(getInfoPlace, action.payload, PLACE_DETAILS_RESPONSE_SUCCESS)
      );

    case PLACE_DETAILS_RESPONSE_SUCCESS:
      return loop(
        state
          .set('loading', false)
          .set('place', action.payload), //place with details
        Effects.constant(NavigationActions.navigate({routeName: 'Place'}))
      );

    case RETRY_PLACE_REQUEST:
      return loop(
        state
          .set('loading', true)
          .set('venues', action.payload.venues),
        Effects.promise(getAnotherPlace, action.payload.venues, action.payload.oldPlace)
      );

    case RETRY_PLACE_RESPONSE_SUCCESS:
      return state
        .set('loading', false)
        .set('place', action.payload);

    case FAILURE_RESPONSE:
      Alert.alert('Warning', action.payload);
      return state.set('loading', false);

    default:
      return state;
  }
}

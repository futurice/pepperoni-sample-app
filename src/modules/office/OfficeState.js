import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop-symbol-ponyfill';
import {NavigationActions} from 'react-navigation';
import {getPlace, getInfoPlace, getAnotherPlace} from '../../services/locationService';

// Initial state
const initialState = Map({
  position: 0,
  loading: false,
  value: {},
  place: {}
});

// Actions
const POSITION_CHANGED = 'POSITION_CHANGED';
const REQUEST_OFFICE = 'REQUEST_OFFICE';
export const RESPONSE_OFFICE_PLACE = 'RESPONSE_OFFICE_PLACE';
const RESPONSE_SUCCESS_PLACE_DETAILS = 'RESPONSE_SUCCESS_PLACE_DETAILS';
export const RESPONSE_FAILURE = 'RESPONSE_FAILURE';
const REQUEST_RETRY_PLACE = 'REQUEST_RETRY_PLACE';
export const RESPONSE_SUCCESS_RETRY_PLACE = 'RESPONSE_SUCCESS_RETRY_PLACE';

// Action creators
export function changePosition(position) {
  return {
    type: POSITION_CHANGED,
    payload: position
  };
}

export function selectOffice(office) {
  return {
    type: REQUEST_OFFICE,
    payload: office
  };
}

export function retryPlace(office, oldPlace) {
  return {
    type: REQUEST_RETRY_PLACE,
    payload: {
      office,
      oldPlace
    }
  };
}

// Reducer
export default function OfficeStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case POSITION_CHANGED:
      return state.set('position', action.payload);

    case REQUEST_OFFICE:
      return loop(
        state
          .set('loading', true)
          .set('value', action.payload), //office
        Effects.promise(getPlace, action.payload)
      );

    case RESPONSE_OFFICE_PLACE:
      return loop(
        state
          .set('place', action.payload), //place without details
        Effects.promise(getInfoPlace, action.payload, RESPONSE_SUCCESS_PLACE_DETAILS)
      );

    case RESPONSE_SUCCESS_PLACE_DETAILS:
      return loop(
        state
          .set('loading', false)
          .set('place', action.payload), //place with details
        Effects.constant(NavigationActions.navigate({routeName: 'Place'}))
      );

    case REQUEST_RETRY_PLACE:
      return loop(
        state
          .set('loading', true)
          .set('value', action.payload.office),
        Effects.promise(getAnotherPlace, action.payload.office, action.payload.oldPlace)
      );

    case RESPONSE_SUCCESS_RETRY_PLACE:
      return state
        .set('loading', false)
        .set('place', action.payload);

    case RESPONSE_FAILURE:
      return state
        .set('loading', false)
        .set('errorMessage', action.payload);

    default:
      return state;
  }
}

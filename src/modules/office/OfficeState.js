import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop-symbol-ponyfill';
import {NavigationActions} from 'react-navigation';
import {getPlace} from '../../services/locationService';

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
export const RESPONSE_FAILURE = 'RESPONSE_FAILURE';

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

// Reducer
export default function OfficeStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case POSITION_CHANGED:
      return state.set('position', action.payload);

    case REQUEST_OFFICE:
      return loop(
        state
          .set('loading', true)
          .set('value', action.payload),
        Effects.promise(getPlace, action.payload)
      );

    case RESPONSE_OFFICE_PLACE:
      return loop(
        state
          .set('loading', false)
          .set('place', action.payload), //place without details
        Effects.constant(NavigationActions.navigate({routeName: 'Place'}))
      );

    case RESPONSE_FAILURE:
      return state
        .set('loading', false)
        .set('errorMessage', action.payload);

    default:
      return state;
  }
}

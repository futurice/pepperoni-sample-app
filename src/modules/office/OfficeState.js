import {Map} from 'immutable';

// Initial state
const initialState = Map({
  position: 0
});

// Actions
const POSITION_CHANGED = 'POSITION_CHANGED';

// Action creators
export function changePosition(position) {
  return {
    type: POSITION_CHANGED,
    payload: position
  };
}

// Reducer
export default function OfficeStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case POSITION_CHANGED:
      return state.set('position', action.payload);

    default:
      return state;
  }
}

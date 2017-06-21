/*eslint-disable max-nested-callbacks, no-unused-expressions*/

import {initialState, dispatch} from '../../../../test/state';
import * as OfficeStateActions from '../OfficeState';

describe('OfficeState', () => {

  describe('selectOffice', () => {
    const getValue = state => state.getIn(['office', 'office']);
    // Futirice offices
    const offices = require('../../../data/locations.json');

    it('should change the value to the city name', () => {
      const [secondState] = dispatch(initialState, OfficeStateActions.selectOffice(offices[2]));
      expect(getValue(secondState).city).toBe('London');
    });
  });

  describe('pager position', () => {
    const getValue = state => state.getIn(['office', 'position']);

    it('should change the position in the pager', () => {
      const [secondState] = dispatch(initialState, OfficeStateActions.changePosition(2));
      expect(getValue(secondState)).toBe(2);
    });
  });
});

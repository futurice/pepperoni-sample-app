import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import OfficeView from './OfficeView';
import {NavigationActions} from 'react-navigation';
import * as OfficeStateActions from './OfficeState';

export default connect(
  state => ({
    position: state.getIn(['office', 'position']),
    loading: state.getIn(['office', 'loading']),
    office: state.getIn(['office', 'value']),
    place: state.getIn(['office', 'place'])
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      officeStateActions: bindActionCreators(OfficeStateActions, dispatch)
    };
  }
)(OfficeView);

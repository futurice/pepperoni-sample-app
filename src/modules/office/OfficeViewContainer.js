import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import OfficeView from './OfficeView';
import {NavigationActions} from 'react-navigation';
import * as OfficeStateActions from './OfficeState';

export default connect(
  state => ({
    position: state.getIn(['office', 'position'])
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      officeStateActions: bindActionCreators(OfficeStateActions, dispatch)
    };
  }
)(OfficeView);

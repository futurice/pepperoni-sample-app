import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PlaceView from './PlaceView';
import {NavigationActions} from 'react-navigation';

export default connect(
  state => ({
    loading: state.getIn(['office', 'loading']),
    office: state.getIn(['office', 'value']),
    place: state.getIn(['office', 'place'])
  }),
   dispatch => {
     return {
       navigate: bindActionCreators(NavigationActions.navigate, dispatch)
     };
   }
)(PlaceView);

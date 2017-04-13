import React, {PropTypes, Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import * as theme from '../../utils/theme';

class PlaceView extends Component {
  static displayName = 'PlaceView';

  static navigationOptions = {
    header: {
      tintColor: theme.colors.text,
      style: {
        backgroundColor: theme.colors.navBar
      }
    }
  }

  static propTypes = {
    office: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    place: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired
  };

  render() {
    console.log('place: ', this.props.place.name);
    return (
      <View style={styles.container}>
        <Text>Ramdon place: {this.props.place.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  }
});

export default PlaceView;

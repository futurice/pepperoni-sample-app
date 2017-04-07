import React, {PropTypes, Component} from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet
} from 'react-native';
import * as theme from '../../utils/theme';
import Icon from 'react-native-vector-icons/Ionicons';

const tabTitle = 'About Us';
const tabIcon = 'ios-information-circle';
/**
 * About page
 */
class AboutView extends Component {
  static displayName = 'ColorView';

  static navigationOptions = {
    title: tabTitle,
    tabBar: () => ({
      icon: (props) => (
        <Icon name={tabIcon} size={24} color={props.tintColor} />
      )
    })
  }

  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  renderHeader = () => {
    return (
        <View style={styles.header}>
          <Image source={require('../../../assets/sample-app-header.png')}/>
        </View>);
  }

  renderBody = () => {
    return (
        <View style={styles.body}>
          <Text style={styles.bodyText}>
            Pepperoni is a free and open-source blueprint
            to kickstart your mobile product development for Android and iOS,
            powered by React Native
          </Text>
        </View>);
  }

  renderFooter = () => {
    const futuriceImage = require('../../../assets/futurice-logo.png');
    return (
        <View style={styles.footer}>
          <Text style={styles.bodyText}>
            Brought to you by
          </Text>
          <Image source={futuriceImage}/>
        </View>);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderBody()}
        {this.renderFooter()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background
  },
  header: {
    flex: 1,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  bodyText: {
    fontSize: 18,
    color: theme.colors.text,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'System'
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default AboutView;

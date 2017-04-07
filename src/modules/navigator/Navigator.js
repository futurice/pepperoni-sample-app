import {Platform} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';
import * as theme from '../../utils/theme';
import OfficeViewContainer from '../office/OfficeViewContainer';
import AboutViewContainer from '../about/AboutViewContainer';

// TabNavigator is nested inside StackNavigator
export const MainScreenNavigator = TabNavigator({
  Office: {screen: OfficeViewContainer},
  About: {screen: AboutViewContainer}
},{
  tabBarOptions: {
    ...Platform.select({
      android: {
        activeTintColor: theme.colors.text,
        indicatorStyle: {backgroundColor: theme.colors.text},
        style: {backgroundColor: theme.colors.navBar}
      },
      ios: {
        activeTintColor: theme.colors.text,
        indicatorStyle: {backgroundColor: theme.colors.text},
        style: {backgroundColor: theme.colors.navBar}
      }
    })
  }
});

MainScreenNavigator.navigationOptions = {
  title: 'Lunch Wheel',
  header: {
    titleStyle: {color: theme.colors.text},
    style: {
      backgroundColor: theme.colors.navBar,
      elevation: 0 // disable header elevation when TabNavigator visible
    }
  }
};

// Root navigator is a StackNavigator
const AppNavigator = StackNavigator({
  Home: {screen: MainScreenNavigator},
  InfiniteColorStack: {screen: AboutViewContainer}
});

export default AppNavigator;

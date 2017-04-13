import {TabNavigator, StackNavigator} from 'react-navigation';
import * as theme from '../../utils/theme';
import OfficeViewContainer from '../office/OfficeViewContainer';
import AboutViewContainer from '../about/AboutViewContainer';
import PlaceViewContainer from '../place/PlaceViewContainer';

// TabNavigator is nested inside StackNavigator
export const MainScreenNavigator = TabNavigator({
  Office: {screen: OfficeViewContainer},
  About: {screen: AboutViewContainer}
},{
  tabBarOptions: {
    activeTintColor: theme.colors.text,
    indicatorStyle: {backgroundColor: theme.colors.text},
    style: {backgroundColor: theme.colors.navBar}
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
  Place: {screen: PlaceViewContainer}
});

export default AppNavigator;

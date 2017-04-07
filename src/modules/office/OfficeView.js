import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ListView,
  Platform,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import * as theme from '../../utils/theme';
import Button from '../../components/Button';
import PageIndicator from '../../components/PageIndicator';
import Icon from 'react-native-vector-icons/Ionicons';

// Futurice offices
const offices = require('../../data/locations.json');
const window = Dimensions.get('window');
const titleTab = 'Where to eat';

class OfficeView extends Component {
  static displayName = 'CounterView';

  static navigationOptions = {
    title: titleTab,
    tabBar: () => ({
      icon: (props) => (
        <Icon name='ios-restaurant' size={24} color={props.tintColor} />
      )
    })
  }

  static propTypes = {
    position: PropTypes.number.isRequired,
    officeStateActions: PropTypes.shape({
      changePosition: PropTypes.func.isRequired
    }).isRequired,
    navigate: PropTypes.func.isRequired
  };

  // Initialize the hardcoded data
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(offices)
    };
  }

  changePositionPager = (position) => {
    this.props.officeStateActions.changePosition(position);
  }

  renderRow = (rowData, section, index) => {
    console.log('index', index);
    // Show pageIndicator and button for Android on the row because the function
    // 'onChangeVisibleRows' does not work for Android
    let androidView = (Platform.OS === 'android')
      ? (<View style={styles.buttonsContainer}>
          <PageIndicator pageCount={offices.length}
            selectedIndex={+index}
            style={styles.pageIndicator} />
          <Button
              text="What's for lunch?"
              buttonStyle={theme.buttons.primary}
              textStyle={theme.fonts.primary}
              action={() => 'TODO'} />
        </View>)
      : (<View/>);

    return (
      <View style={styles.cityCard}>
        <TouchableOpacity onPress={() => 'TODO'}>
          <Image source={{uri: rowData.picture}} style={styles.image} />
        </TouchableOpacity>
        <Text style={[theme.fonts.h1, styles.title]}>
          {rowData.city.toUpperCase()}
        </Text>
        {androidView}
      </View>
    );
  }

 // This method is currently only working on iOS but not on Android
  onChangeVisibleRows = (visibleRows) => {
    const visibleRowNumbers = Object.keys(visibleRows.s1).map((row) => parseInt(row));
    if (visibleRowNumbers.length === 2) {
      // visible row is visibleRowNumbers[0]
      // but in the case of the last item it is visibleRowNumbers[1]
      if (visibleRowNumbers[1] === (offices.length - 1)) {
        this.changePositionPager(visibleRowNumbers[1]);

      } else {
        this.changePositionPager(visibleRowNumbers[0]);
      }
    }
    if (visibleRowNumbers.length === 3) {
      // visible row is visibleRowNumbers[1]
      this.changePositionPager(visibleRowNumbers[1]);
    }
  }

  render() {
    console.log('position', this.props.position);
    // Hide pageIndicator and button for Android because the function
    // 'onChangeVisibleRows' does not work for Android
    let iosView = (Platform.OS === 'ios')
      ? (<View style={styles.buttonsContainer}>
          <PageIndicator pageCount={offices.length}
            selectedIndex={this.props.position}
            style={styles.pageIndicator} />
          <Button
              text="What's for lunch?"
              buttonStyle={theme.buttons.primary}
              textStyle={theme.fonts.primary}
              action={() => 'TODO'} />
         </View>)
      : (<View/>);

    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          style={styles.swiper}
          vertical={false}
          alwaysBounceVertical={false}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          bounces={true}
          loop={true}
          onChangeVisibleRows={this.onChangeVisibleRows}
        />
        {iosView}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  swiper: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center'
  },
  cityCard: {
    flex: 1,
    overflow: 'hidden',
    width: window.width,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 90
  },
  image: {
    height: 170,
    width: 170,
    borderRadius: 85
  },
  title: {
    marginTop: 20
  },
  pageIndicator: {
    marginBottom: 50,
    ...Platform.select({
      android: {
        marginTop: 20
      }
    })
  },
  buttonsContainer: {
    ...Platform.select({
      ios: {
        marginLeft: 10,
        marginRight: 10,
        paddingBottom: 60
      }
    })
  }
});

export default OfficeView;

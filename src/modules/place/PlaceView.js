import React, {PropTypes, Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Linking
} from 'react-native';
import * as theme from '../../utils/theme';
import Button from '../../components/Button';
import {repeat, _} from 'lodash';

const window = Dimensions.get('window');

class PlaceView extends Component {
  static displayName = 'PlaceView';

  static navigationOptions = {
    title: 'Place',
    header: {
      tintColor: theme.colors.text,
      style: {
        backgroundColor: theme.colors.navBar
      }
    }
  }

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    place: PropTypes.object.isRequired,
    venues: PropTypes.array.isRequired,
    back: PropTypes.func.isRequired,
    officeStateActions: PropTypes.shape({
      retryPlace: PropTypes.func.isRequired
    }).isRequired
  };

  componentWillMount() {
    //if this.prop.place doesn't contain the right data go back to home screen
    if (!this.props.place.name) {
      this.props.back();
    }
  }

  onNextPress = () => {
    this.props.officeStateActions.retryPlace(this.props.venues, this.props.place);
  }

  buildPhotosURL = () => {
    // At this point we have checked that the array contains photos
    var size = this.props.place.photos.groups[0].items.length;
    var photo = this.props.place.photos.groups[0].items[_.random(0, size - 1)];
    return (photo.prefix + '500x500' + photo.suffix);
  }

  getImage = () => {
    if (this.props.place.photos && this.props.place.photos.count && this.props.place.photos.count > 0) {
      return <Image style={styles.image} source={{uri: this.buildPhotosURL()}}>{this.getRating()}</Image>;
    } else {
      return <View style={styles.noImage}>{this.getRating()}</View>;
    }
  }

  getPrice = () => {
    const price = this.props.place.price;
    return price ? repeat(price.currency, price.tier) : '';
  }

  getCategories = () => {
    const categories = this.props.place.categories || [];
    const categoryNames = _.map(categories, 'name');
    return _.join(categoryNames, ', ');
  }

  getAddress = () => {
    return (this.props.place.location)
      ? _.join(_.compact([this.props.place.location.address, this.props.place.location.postalCode]), ', ')
      : '';
  }

  getRatingStyles = () => {
    return (this.props.place.ratingColor)
    ? {backgroundColor: '#' + this.props.place.ratingColor}
    : '';
  }

  getRating = () => {
    return (this.props.place.rating)
      ? <Image style={styles.gradient}
              source={require('../../../assets/gradient.png')}>
              <View style={[styles.ratingView].concat(this.getRatingStyles())}>
                <Text style={styles.rating}>{this.props.place.rating}</Text>
                <Text style={styles.ratingTotal}>/ 10</Text>
              </View>
            </Image>
      : <Image style={styles.gradient} source={require('../../../assets/gradient.png')}/>;
  }

  getHours = () => {
    return _.get(this.props.place.hours, 'status', '');
  }

  getContact = () => {
    return _.get(this.props.place.contact, 'formattedPhone', '');
  }

  getLinkURL = () => {
    const url = (Platform.OS === 'android')
      ? 'https://maps.google.com?q='
      : 'http://maps.apple.com/?q=';
    return url + this.props.place.location.lat + ',' + this.props.place.location.lng;
  }

  render() {
    const spinner = this.props.loading
      ? <ActivityIndicator style={styles.spinner} size='large' color='white'/>
      : null;

    return (
      <View style={styles.container}>
        <ScrollView>
          {this.getImage()}
          <View style={styles.cardInfo}>
            <Text numberOfLines={2} style={styles.title}>
              {this.props.place.name}
            </Text>
            <Text style={[styles.text].concat({fontWeight: '500'})}>
              {this.getCategories()}
            </Text>
            <Text style={[styles.text].concat({fontWeight: '500', marginBottom: 10})}>
              {this.getPrice()}
            </Text>
            <Text numberOfLines={2} style={styles.text}>
              {this.getAddress()}
            </Text>
            <Text style={styles.text}>
              {this.getHours()}
            </Text>
            <Text style={styles.text}>
              {this.getContact()}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              text='YEAH, TAKE ME THERE!'
              buttonStyle={theme.buttons.primary}
              textStyle={theme.fonts.primary}
              action={() => Linking.openURL(this.getLinkURL())
                .catch(err => console.error('An error occurred', err))} />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              text='NAH, TRY ANOTHER ONE'
              buttonStyle={theme.buttons.secondary}
              textStyle={theme.fonts.secondary}
              action={this.onNextPress} />
          </View>
        </ScrollView>
        {spinner}
      </View>
    );
  }
}

const spacing = {
  marginHorizontal: 20
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  title: {
    ...spacing,
    ...theme.fonts.h2,
    margin: 8
  },
  text: {
    ...spacing,
    ...theme.fonts.body,
    marginBottom: 5
  },
  buttonContainer: {
    margin: 10
  },
  spinner: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: window.height,
    backgroundColor: theme.colors.spinner
  },
  image: {
    height: 200,
    width: window.width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noImage: {
    height: 40,
    width: window.width,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  cardInfo: {
    backgroundColor: theme.colors.selectedTab
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: window.width,
    height: 50
  },
  ratingView: {
    flexDirection: 'row',
    backgroundColor: 'transparent', // default backgroundColor
    width: 72,
    height: 30,
    bottom: 0,
    left: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rating: {
    margin: 5,
    fontSize: 18,
    color: theme.colors.text,
    fontFamily: 'System',
    fontWeight: '500',
    backgroundColor: 'transparent'
  },
  ratingTotal: {
    fontSize: 10,
    marginHorizontal: 2,
    color: theme.colors.text,
    fontFamily: 'System',
    marginBottom: 5
  }
});

export default PlaceView;

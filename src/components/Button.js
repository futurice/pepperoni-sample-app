import React, {PropTypes, Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import * as theme from '../utils/theme';

class Button extends Component {
  static displayName = 'Button';
  static propTypes = {
    buttonStyle: View.propTypes.style,
    textStyle: Text.propTypes.style,
    text: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.action}
        style={[theme.buttons.basic].concat(this.props.buttonStyle)}>
        <Text style={[theme.fonts.button].concat(this.props.textStyle)}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}

export default Button;

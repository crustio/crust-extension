import React, { Component } from 'react';
import { IconVisibility, IconVisibilityOff } from '../../icon';

export default class PasswordVisibility extends Component {
  render() {
    const {
      showPassword, showColor, hideColor, ...otherProps
    } = this.props;
    return (
      <div {...otherProps} style={{ maxHeight: 24 }}>
        {showPassword ? (
          <IconVisibility style={showColor} />
        ) : (
          <IconVisibilityOff style={hideColor} />
        )}
      </div>
    );
  }
}

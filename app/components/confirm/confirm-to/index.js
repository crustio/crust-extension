import React, { Component } from 'react';
import Avatar from '../../common/identicon';
import Address from '../../common/address';

export default class ConfirmTo extends Component {
  render() {
    const {
      address, theme, colorTheme, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <Avatar theme={theme} size={44} value={address} />
        <Address
          style={{ marginLeft: '22px', fontSize: '14px', color: colorTheme.text.quaternary }}
          hash={address}
        />
      </div>
    );
  }
}

import React, { Component } from 'react';
import FontRegular from '../../common/fonts/font-regular';
import Avatar from '../../common/identicon';
import Address from '../../common/address';
import './styles.css';

export default class AccountInfo extends Component {
  render() {
    const { account, theme } = this.props;
    return (
      <div className="account-info-container">
        <Avatar className="account-info-avadar" value={account.address} theme={theme} />
        <div className="account-info-right-container">
          <FontRegular className="account-info-alias-text" text={account.alias} />
          <Address className="account-info-address-text" hash={account.address} />
        </div>
      </div>
    );
  }
}

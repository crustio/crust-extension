import React, { Component } from 'react';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import Avatar from '../../common/identicon';
import AccountDetails from '../../account/account-details';
import './styles.css';

export default class SendToFrom extends Component {
  render() {
    const {
      toAccount, fromAccount, onCopyAddress, colortheme, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            className="account-avatar"
            onCopyAddress={onCopyAddress}
            value={fromAccount.address}
            size="34"
          />
          <AccountDetails
            className="account-item-identity-container"
            alias={fromAccount.alias}
            address={fromAccount.address}
            onCopyAddress={onCopyAddress}
            colortheme={colortheme}
            fontSize="18px"
          />
        </div>

        <ArrowForwardOutlinedIcon style={{ color: 'black', width: '16px' }} />

        {toAccount && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              className="account-avatar"
              onCopyAddress={onCopyAddress}
              value={toAccount.address}
              size="32"
            />
            <AccountDetails
              className="account-item-identity-container"
              alias={toAccount.alias}
              address={toAccount.address}
              onCopyAddress={onCopyAddress}
              fontSize="18px"
              colortheme={colortheme}
            />
          </div>
        )}
      </div>
    );
  }
}

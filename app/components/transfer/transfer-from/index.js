import React, { Component } from 'react';
import Avatar from '../../common/identicon';
import TransferFromAddress from '../transfer-from-address';
import './styles.css';

export default class TransferFrom extends Component {
  render() {
    const {
      address, alias, theme, canCopy, onCopyAddress, colortheme, ...otherProps
    } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          padding: '16px',
          background: colortheme.card,
          borderRadius: '12px',
        }}
        {...otherProps}
      >
        <Avatar
          className="transfer-form-identicon"
          onCopyAddress={onCopyAddress}
          value={address}
          size={44}
          theme={theme}
        />
        <TransferFromAddress
          canCopy={canCopy}
          onCopyAddress={onCopyAddress}
          className="transfer-from-address"
          alias={alias}
          address={address}
          colortheme={colortheme}
        />
      </div>
    );
  }
}

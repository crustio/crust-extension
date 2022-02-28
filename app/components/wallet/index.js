import React, { Component } from 'react';
import Avatar from '../common/identicon';
import AccountPanel from '../account/account-panel';
import './styles.css';

export default class Wallet extends Component {
  render() {
    const {
      selectedAccount,
      onCopyAddress,
      accountMenu,
      onAccountMenuOptionsChange,
      onAliasChange,
      onAliasInputBlur,
      onAliasInputKeyPress,
      inputRef,
      theme,
      colortheme,
      network,
      onCreateAccountClick,
      onImportAccountClick,
      ...otherProps
    } = this.props;

    return (
      <div {...otherProps}>
        <Avatar
          className="account-avatar"
          onCopyAddress={onCopyAddress}
          value={selectedAccount ? selectedAccount.address : ''}
          theme={theme}
        />
        <AccountPanel
          inputRef={inputRef}
          onAliasChange={onAliasChange}
          onAliasInputKeyPress={onAliasInputKeyPress}
          onAliasInputBlur={onAliasInputBlur}
          selectedAccount={selectedAccount}
          onCopyAddress={onCopyAddress}
          className="account-detail-container"
          accountMenu={accountMenu}
          onAccountMenuOptionsChange={onAccountMenuOptionsChange}
          colortheme={colortheme}
          network={network}
          onCreateAccountClick={onCreateAccountClick}
          onImportAccountClick={onImportAccountClick}
        />
      </div>
    );
  }
}

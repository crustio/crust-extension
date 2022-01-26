import React, { Component } from 'react';
import AccountDetails from '../account-details';
import { WalletDropDownIcon } from '../../common/icon';
import CrustMenu from '../../common/crust-menu';

export default class AccountPanel extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const {
      selectedAccount,
      onCopyAddress,
      onAccountMenuOptionsChange,
      accountMenu,
      onAliasChange,
      onAliasInputBlur,
      onAliasInputKeyPress,
      inputRef,
      colorTheme,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <AccountDetails
          className="account-detail"
          address={selectedAccount.address}
          alias={selectedAccount.alias}
          onCopyAddress={onCopyAddress}
          inputRef={inputRef}
          editMode={selectedAccount.editMode ? selectedAccount.editMode : false}
          colorTheme={colorTheme}
          onAliasChange={event => {
            onAliasChange(event.target.value, selectedAccount);
          }}
          onAliasInputKeyPress={event => {
            onAliasInputKeyPress(event, selectedAccount);
          }}
          aliasValue={
            selectedAccount.editAlias !== undefined
              ? selectedAccount.editAlias
              : selectedAccount.alias
          }
          onAliasInputBlur={() => {
            onAliasInputBlur(selectedAccount);
          }}
        />
        {accountMenu && accountMenu.length > 0 && (
          <WalletDropDownIcon
            onClick={this.handleClick}
            className="account-list-icon"
            colorTheme={colorTheme}
          />
        )}
        {accountMenu && accountMenu.length > 0 && (
          <CrustMenu
            options={accountMenu}
            onChange={option => {
              onAccountMenuOptionsChange(option, selectedAccount);
            }}
            anchorEl={anchorEl}
            onClose={this.handleClose}
          />
        )}
      </div>
    );
  }
}

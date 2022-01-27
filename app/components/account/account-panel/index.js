import React, { Component } from 'react';
import AccountDetails from '../account-details';
import { WalletDropDownIcon } from '../../common/icon';
import ModalWithThreeButton from '../../common/modal-with-three-button';

export default class AccountPanel extends Component {
  state = {
    showModal: false,
  };

  handleClick = event => {
    this.setState({ showModal: true });
  };

  handleCancel = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { showModal } = this.state;
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
      network,
      onCreateAccountClick,
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
        <ModalWithThreeButton
          show={showModal}
          colorTheme={colorTheme}
          handleCancel={this.handleCancel}
          handleTopClick={onCreateAccountClick}
          handleBottomClick={null}
          topButton="Create Account"
          bottomButton="Import Account"
          network={network}
        />
      </div>
    );
  }
}

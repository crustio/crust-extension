import React, { Component } from 'react';
import classNames from 'classnames';
import { withTranslation } from 'react-i18next';
import BalanceDetails from '../balance-details';
import './styles.css';
import AccountDetails from '../account-details';
import Avatar from '../../common/identicon';

class AccountItem extends Component {
  render() {
    const {
      account,
      balance,
      onCopyAddress,
      onAliasChange,
      onAliasInputBlur,
      onAliasInputKeyPress,
      inputRef,
      colortheme,
      t,
      ...otherProps
    } = this.props;
    const accountItemClassNames = classNames({
      'account-item-container': true,
      'clickable-icon': true,
    });
    return (
      <div
        className={accountItemClassNames}
        {...otherProps}
        style={{ background: colortheme.card }}
      >
        <Avatar className="account-avatar" onCopyAddress={onCopyAddress} value={account.address} />
        <AccountDetails
          className="account-item-identity-container"
          alias={account.alias}
          inputRef={inputRef}
          address={account.address}
          editMode={account.editMode ? account.editMode : false}
          onAliasChange={event => {
            onAliasChange(event.target.value, account);
          }}
          onAliasInputKeyPress={event => {
            onAliasInputKeyPress(event, account);
          }}
          aliasValue={account.editAlias !== undefined ? account.editAlias : account.alias}
          onAliasInputBlur={() => {
            onAliasInputBlur(account);
          }}
          blockchain={account.blockchain}
          onCopyAddress={onCopyAddress}
          colortheme={colortheme}
        />
        <BalanceDetails
          className="account-item-balance-section"
          balance={balance && balance.balanceFormatted}
          token={balance && balance.token}
        />
      </div>
    );
  }
}

export default withTranslation()(AccountItem);

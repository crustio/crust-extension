import React, { Component } from 'react';
import RequestType from '../request-type';
import WalletExpansionPanel from '../../common/wallet-expansion-panel';
import FontRegular from '../../common/fonts/font-regular';
import FooterTwoSMButton from '../../common/footer-two-sm-button';
import Disclaimer from '../disclaimer';
import AccountItem from '../../account/account-item';
import DarkDivider from '../../common/divider/dark-divider';
import './styles.css';
import ClickToCopy from '../../common/click-to-copy';
import CrustPassword from '../../common/password/crust-password';

const Summary = props => (
  <div className={props.className}>
    <RequestType
      type={props.t('Sign')}
      blockchain={props.blockchain}
      className="sign-message-summary-request-type"
    />
    <AccountItem
      className="sign-message-summary-account-item"
      account={props.account}
      balance={props.balance}
      onCopyAddress={props.onCopyAddress}
      colorTheme={props.colorTheme}
    />
  </div>
);

const SignedMessage = props => (
  <div className={props.className}>
    <DarkDivider style={{ width: '100%' }} />
    <ClickToCopy
      className="signedmessage-data clickable-icon"
      text={props.data}
      value={props.data}
      onCopy={props.onCopyData}
    />
    <DarkDivider style={{ width: '100%' }} />
  </div>
);

export default class SignMessage extends Component {
  render() {
    const {
      isSignMessageExpanded,
      handleSignMessageExpansion,
      onCopyAddress,
      account,
      balance,
      onCancel,
      onAllow,
      errorMessage,
      data,
      onCopyData,
      password,
      handleOnChange,
      errorText,
      colorTheme,
      t,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <WalletExpansionPanel
          isBelowExpandIcon
          expanded={isSignMessageExpanded}
          handleChange={handleSignMessageExpansion}
          summary={
            <Summary
              t={t}
              className="sign-message-summary-container"
              account={account}
              balance={balance}
              onCopyAddress={onCopyAddress}
              colorTheme={colorTheme}
            />
          }
        >
          <Disclaimer
            className="sign-message-disclaimer"
            notice={t(
              'Signing can provide access to the value of your account. Only sign this if you know and trust the requesting source.',
            )}
          />
          <FontRegular className="sign-message-title" text={t('Sign the following data')} />
          <SignedMessage className="sign-message-body" data={data} onCopyData={onCopyData} />
          <CrustPassword
            className="confirm-form-password"
            onChange={e => handleOnChange('password', e)}
            password={password}
            placeholder={t('Wallet Password')}
          />
          {errorText !== '' ? (
            <div className="error-msg">{t(errorText)}</div>
          ) : (
            <div className="place-holder"> </div>
          )}
          <FooterTwoSMButton
            className="sign-message-footer-container"
            namePrimary={t('Cancel')}
            nameSecondary={t('Sign')}
            onClickPrimary={onCancel}
            onClickSecondary={onAllow}
            isSecondaryDisabled={!!errorMessage}
          />
        </WalletExpansionPanel>
      </div>
    );
  }
}

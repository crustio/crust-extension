import React, { Component } from 'react';
import RequestType from '../request-type';
import WalletExpansionPanel from '../../common/wallet-expansion-panel';
import FontRegular from '../../common/fonts/font-regular';
import Disclaimer from '../disclaimer';
import AccountItem from '../../account/account-item';
import FooterWithTwoButton from '../../common/footer-with-two-button';
import './styles.css';
import ClickToCopy from '../../common/click-to-copy';
import CrustPassword from '../../common/password/crust-password';

const Summary = props => (
  <div className={props.className}>
    <RequestType
      type={props.t('Sign')}
      blockchain={props.blockchain}
      className="sign-message-summary-request-type"
      colorTheme={props.colorTheme}
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
    <ClickToCopy
      className="signedmessage-data clickable-icon"
      text={props.data}
      value={props.data}
      onCopy={props.onCopyData}
      style={{ background: props.colorTheme.card, color: props.colorTheme.text.secondary }}
    />
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
        <Disclaimer
          className="sign-message-disclaimer"
          notice={t(
            'Signing can provide access to the value of your account. Only sign this if you know and trust the requesting source.',
          )}
          style={{ background: colorTheme.card }}
          colorTheme={colorTheme}
        />
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
          <FontRegular
            className="sign-message-title"
            text={t('Sign the following data')}
            style={{ color: colorTheme.text.primary }}
          />
          <SignedMessage
            className="sign-message-body"
            data={data}
            onCopyData={onCopyData}
            colorTheme={colorTheme}
          />
          <CrustPassword
            className="confirm-form-password"
            onChange={e => handleOnChange('password', e)}
            password={password}
            placeholder={t('Wallet Password')}
            style={{ background: colorTheme.card, color: colorTheme.text.secondary }}
            colorTheme={colorTheme}
          />
          {errorText !== '' ? (
            <div className="error-msg">{t(errorText)}</div>
          ) : (
            <div className="place-holder"> </div>
          )}
          <FooterWithTwoButton
            onNextClick={onAllow}
            onBackClick={onCancel}
            backButtonName={t('Cancel')}
            nextButtonName={t('Sign')}
            nextColor={colorTheme.button.primary.text}
            nextBackground={colorTheme.button.primary.main}
            backColor={colorTheme.button.tertiary.text}
            backBackground={colorTheme.button.tertiary.main}
          />
        </WalletExpansionPanel>
      </div>
    );
  }
}

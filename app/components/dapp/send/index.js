import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { createAccountObject } from '../../../services/wallet-service';
import FooterWithTwoButton from '../../common/footer-with-two-button';
import CrustPassword from '../../common/password/crust-password';
import SendToFrom from '../send-to-from';
import './styles.css';

const Summary = props => (
  <div className={props.className}>
    <div className="send_item_title">Request</div>
    <div className="send_summary_item">
      <div className="ssi_left">From:</div>
      <div className="ssi_right">{props.from}</div>
    </div>
    <div className="send_summary_item">
      <div className="ssi_left">Chain:</div>
      <div className="ssi_right">{props.chain}</div>
    </div>
    <div className="send_summary_item">
      <div className="ssi_left">Version:</div>
      <div className="ssi_right">{props.version}</div>
    </div>
  </div>
);

const isTx = item => (item.method === 'transfer' || item.method === 'transferKeepAlive')
  && item.section === 'balances';

class Send extends Component {
  render() {
    const {
      accounts,
      fromAccount,
      // toAccount,
      onCopyAddress,
      isSendExpanded,
      handleSendExpansion,
      handleInfoExpansion,
      isInfoExpanded,
      amount,
      onCancel,
      onAllow,
      errorMessage,
      txnForUI,
      txnUi,
      data,
      onCopyData,
      password,
      errorText,
      handleOnChange,
      colortheme,
      t,
      ...otherProps
    } = this.props;
    const { items = [] } = txnForUI || {};
    return (
      <div {...otherProps}>
        <div className="send-panel-container">
          <Summary
            className="send-summary-container"
            onCopyAddress={onCopyAddress}
            fromAccount={fromAccount}
            from={txnForUI.url}
            chain={txnForUI.chain}
            version={txnForUI.sVersion}
            colortheme={colortheme}
          />
          {items.map((item, index) => (
            <div key={`items_${index}`} className="send_item">
              <div className="send_item_title">{item.method}</div>
              {isTx(item) ? (
                <>
                  <SendToFrom
                    toAccount={createAccountObject(accounts, item.args[0])}
                    fromAccount={fromAccount}
                    onCopyAddress={onCopyAddress}
                    className="send_tx_from_to"
                    colortheme={colortheme}
                  />
                  <div>Amount: {item.args[1]}</div>
                </>
              ) : (
                <div>
                  {item.args.map((arg, argIndex) => (
                    <div key={`args_${argIndex}`}>{JSON.stringify(arg)}</div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <CrustPassword
          className="confirm-form-password"
          onChange={e => handleOnChange('password', e)}
          password={password}
          placeholder={t('Wallet Password')}
          colortheme={colortheme}
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
          nextButtonName={t('Allow')}
        />
      </div>
    );
  }
}

export default withTranslation()(Send);

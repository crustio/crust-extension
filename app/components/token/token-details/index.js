import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import TokenBalance from '../token-balance';
import TokenDetailFooter from '../token-detail-footer';
import './styles.css';

class TokenDetails extends Component {
  render() {
    const {
      balance,
      unit,
      handleDeposit,
      handleSend,
      marketData,
      amount,
      t,
      labelText,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <TokenBalance
          className="token-balance"
          unit={unit}
          balance={`${balance}`}
          amount={amount}
          marketData={marketData}
          labelText={labelText}
        />
        <TokenDetailFooter
          className="token-detail-footer"
          handleDeposit={handleDeposit}
          handleSend={handleSend}
          receiveButtonName={t('Receive')}
          sendButtonName={t('Send')}
        />
      </div>
    );
  }
}

export default withTranslation()(TokenDetails);

import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import FontMedium from '../../common/fonts/font-medium';
import TransactionItems from '../transaction-items';
import TransactionMessage from '../transaction-message';
import './styles.css';

class Transaction extends Component {
  render() {
    const {
      transactions, isLinkToFaucet, network, t, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <FontMedium className="transactions-header" text={t('Transactions')} />
        {transactions.length > 0 ? (
          <TransactionItems className="transaction-list-container" transactions={transactions} />
        ) : (
          <TransactionMessage
            className="transaction-message"
            isLinkToFaucet={isLinkToFaucet}
            network={network}
          />
        )}
      </div>
    );
  }
}

export default withTranslation()(Transaction);

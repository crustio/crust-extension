import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
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

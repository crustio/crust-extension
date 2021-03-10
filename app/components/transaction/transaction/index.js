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
    const ttt = transactions[0];
    const trans = [ttt, ttt, ttt, ttt, ttt, ttt];
    return (
      <div {...otherProps}>
        {transactions.length > 0 ? (
          <TransactionItems className="transaction-list-container" transactions={trans} />
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

import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import TransactionItems from '../transaction-items';
import TransactionMessage from '../transaction-message';
import './styles.css';

class Transaction extends Component {
  render() {
    const {
      transactions,
      account,
      isLinkToFaucet,
      network,
      t,
      listHeight,
      colortheme,
      fetchMore,
      loadMore,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        {transactions.length > 0 ? (
          <TransactionItems
            network={network}
            account={account}
            style={{ height: listHeight || '350px' }}
            className="transaction-list-container"
            transactions={transactions}
            colortheme={colortheme}
            fetchMore={fetchMore}
            loadMore={loadMore}
          />
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

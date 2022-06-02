import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import RefreshIcon from '@material-ui/icons/Refresh';
import TransactionItems from '../transaction-items';
import FontMedium from '../../common/fonts/font-medium';
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
      fetchTransactionHistory,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <div className="transaction-refresh-button" onClick={() => fetchTransactionHistory(true)}>
          <RefreshIcon />
          <FontMedium text="Refresh" style={{ color: colortheme.text.primary }} />
        </div>
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

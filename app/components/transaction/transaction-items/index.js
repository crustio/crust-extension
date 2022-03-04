import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import TransactionItem from '../transaction-item';
import { CRUST_MAXWELL_NETWORK } from '../../../../lib/constants/networks';
import './styles.css';

export default class TransactionItems extends Component {
  fetchMoreData = () => {
    this.props.fetchMore();
  };

  render() {
    const {
      transactions, network, account, colortheme, loadMore, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <InfiniteScroll
          dataLength={transactions.length}
          next={this.fetchMoreData}
          hasMore={loadMore}
          loader={<h4>Loading...</h4>}
          height={350}
        >
          {transactions.map(transaction => (
            <div key={transaction.block_timestamp}>
              <TransactionItem
                className="transaction-item"
                transaction={transaction}
                network={network}
                account={account}
                colortheme={colortheme}
                style={{
                  background: colortheme.card,
                  boxShadow: network.value === CRUST_MAXWELL_NETWORK.value ? 'none' : '',
                }}
              />
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

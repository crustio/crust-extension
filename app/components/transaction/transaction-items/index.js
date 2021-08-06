import React, { Component } from 'react';
import TransactionItem from '../transaction-item';
import './styles.css';

export default class TransactionItems extends Component {
  render() {
    const { transactions, network, ...otherProps } = this.props;
    return (
      <div {...otherProps}>
        {transactions.map(transaction => (
          <div key={transaction.date}>
            <TransactionItem
              className="transaction-item"
              transaction={transaction}
              network={network}
            />
          </div>
        ))}
      </div>
    );
  }
}

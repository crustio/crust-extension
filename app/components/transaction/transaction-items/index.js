import React, { Component } from 'react';
import TransactionItem from '../transaction-item';
import { CRUST_MAXWELL_NETWORK } from '../../../../lib/constants/networks';
import './styles.css';

export default class TransactionItems extends Component {
  render() {
    const {
      transactions, network, colorTheme, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        {transactions.map(transaction => (
          <div key={transaction.date}>
            <TransactionItem
              className="transaction-item"
              transaction={transaction}
              network={network}
              colorTheme={colorTheme}
              style={{
                background: colorTheme.card,
                boxShadow: network.value === CRUST_MAXWELL_NETWORK.value ? 'none' : '',
              }}
            />
          </div>
        ))}
      </div>
    );
  }
}

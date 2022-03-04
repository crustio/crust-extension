import React, { Component } from 'react';
import FontMedium from '../../common/fonts/font-medium';
import TransactionItemStatus from '../transaction-item-status';
import './styles.css';

export default class TransactionItemDetails extends Component {
  render() {
    const {
      amount, address, moment, colortheme, ...otherProps
    } = this.props;
    return (
      <div className="transfer-item-details" {...otherProps}>
        <div className="transaction-item-status-container">
          <FontMedium
            className="transaction-item-details-amount"
            text={amount}
            style={{ color: colortheme.text.primary }}
          />
        </div>

        <TransactionItemStatus
          address={address}
          moment={moment}
          className="transaction-item-info-container"
          style={{ color: colortheme.text.quaternary }}
        />
      </div>
    );
  }
}

import React, { Component } from 'react';
import FontMedium from '../../common/fonts/font-medium';
import TransactionItemStatus from '../transaction-item-status';
import './styles.css';

export default class TransactionItemDetails extends Component {
  render() {
    const {
      amount, address, moment, status, color, ...otherProps
    } = this.props;
    return (
      <div className="transfer-item-details" {...otherProps}>
        <div className="transaction-item-status-container">
          <FontMedium className="transaction-item-details-amount" text={amount} />
          <FontMedium className="" text={status} style={{ color, fontSize: '14px' }} />
        </div>

        <TransactionItemStatus
          address={address}
          moment={moment}
          status={status}
          color={color}
          className="transaction-item-info-container"
        />
      </div>
    );
  }
}

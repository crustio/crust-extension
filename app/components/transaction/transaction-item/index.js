import React, { Component } from 'react';
import SendIcon from '../../../images/send-icon.png';
import TransactionItemDetails from '../transaction-item-details';
import { DAPP } from '../../../../lib/constants/transaction';
import './styles.css';

export default class TransactionItem extends Component {
  render() {
    const { transaction, network, ...otherProps } = this.props;
    const {
      internal: {
        network: { transactionUrl },
      },
    } = transaction;
    return (
      <div>
        {transaction.status !== DAPP ? (
          <a
            href={`${transactionUrl || network.transactionUrl}${transaction.txnHash}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <div {...otherProps}>
              <img src={SendIcon} alt="send-icon" className="transfer-item-icon" />
              <TransactionItemDetails
                amount={transaction.transferAmount}
                address={transaction.metadata.to}
                moment={transaction.modifiedDate}
                status={transaction.status}
                color={transaction.color}
              />
            </div>
          </a>
        ) : (
          <div {...otherProps}>
            <img src={SendIcon} alt="send-icon-dapp" className="transfer-item-icon" />
            <TransactionItemDetails
              amount={transaction.transferAmount}
              address={transaction.metadata.to}
              moment={transaction.modifiedDate}
              status={transaction.status}
              color={transaction.color}
            />
          </div>
        )}
      </div>
    );
  }
}

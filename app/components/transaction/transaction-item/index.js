import React, { Component } from 'react';
import CallMadeIcon from '@material-ui/icons/CallMade';
import SendIcon from '../../../images/send-icon.png';
import TransactionItemDetails from '../transaction-item-details';
import { DAPP } from '../../../../lib/constants/transaction';
import './styles.css';

export default class TransactionItem extends Component {
  render() {
    const {
      transaction, network, colorTheme, ...otherProps
    } = this.props;
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
              <CallMadeIcon
                className="transfer-item-icon"
                style={{ color: colorTheme.text.primary }}
              />
              <TransactionItemDetails
                amount={transaction.transferAmount}
                address={transaction.metadata.to}
                moment={transaction.modifiedDate}
                status={transaction.status}
                color={transaction.color}
                colorTheme={colorTheme}
              />
            </div>
          </a>
        ) : (
          <div {...otherProps}>
            <CallMadeIcon
              className="transfer-item-icon"
              style={{ color: colorTheme.text.primary }}
            />
            <TransactionItemDetails
              amount={transaction.transferAmount}
              address={transaction.metadata.to}
              moment={transaction.modifiedDate}
              status={transaction.status}
              color={transaction.color}
              colorTheme={colorTheme}
            />
          </div>
        )}
      </div>
    );
  }
}

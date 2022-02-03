import React, { Component } from 'react';
import CallMadeIcon from '@material-ui/icons/CallMade';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import SendIcon from '../../../images/send-icon.png';
import TransactionItemDetails from '../transaction-item-details';
import { DAPP } from '../../../../lib/constants/transaction';
import './styles.css';

export default class TransactionItem extends Component {
  render() {
    const {
      transaction, network, colorTheme, account, ...otherProps
    } = this.props;
    return (
      <div>
        {transaction.status !== DAPP ? (
          <a
            href={`${network.transactionUrl}${transaction.hash}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            {transaction.from === account.address ? (
              <div {...otherProps}>
                <CallMadeIcon
                  className="transfer-item-icon"
                  style={{ color: colorTheme.text.primary }}
                />
                <TransactionItemDetails
                  amount={`Send ${transaction.amount}`}
                  address={transaction.to}
                  moment={transaction.modifiedDate}
                  colorTheme={colorTheme}
                />
              </div>
            ) : (
              <div {...otherProps}>
                <CallReceivedIcon
                  className="transfer-item-icon"
                  style={{ color: colorTheme.text.primary }}
                />
                <TransactionItemDetails
                  amount={`Received ${transaction.amount}`}
                  address={transaction.from}
                  moment={transaction.modifiedDate}
                  colorTheme={colorTheme}
                />
              </div>
            )}
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

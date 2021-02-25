import React, { Component } from 'react';
import './styles.css';
import FontRegular from '../../common/fonts/font-regular';
import FaucetLink from '../faucet-link';
import { withTranslation } from 'react-i18next';

class TransactionMessage extends Component {
  render() {
    const { isLinkToFaucet, network, t, ...otherProps } = this.props;
    return (
      <div {...otherProps}>
        <FontRegular className="transaction-message-text" text={t("No transactions yet.")} />
        {isLinkToFaucet ? <FaucetLink network={network} className="faucets-message" /> : null}
      </div>
    );
  }
}
export default withTranslation()(TransactionMessage);

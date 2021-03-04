import React, { Component } from 'react';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import './styles.css';
import { withTranslation } from 'react-i18next';
import FontRegular from '../../common/fonts/font-regular';

class TransactionMessage extends Component {
  render() {
    const {
      isLinkToFaucet, network, t, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <InfoOutlinedIcon className="transaction-message-icon" />
        <FontRegular className="transaction-message-text" text={t('No transactions yet')} />
      </div>
    );
  }
}
export default withTranslation()(TransactionMessage);

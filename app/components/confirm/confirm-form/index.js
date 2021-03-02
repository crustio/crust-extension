import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import DarkDivider from '../../common/divider/dark-divider';
import FooterButton from '../../common/footer-button';
import ConfirmParticular from '../confirm-particular';
import ConfirmFromTo from '../confirm-from-to';
import './styles.css';

class ConfirmForm extends Component {
  render() {
    const {
      confirmDetails: {
        metadata: {
          to,
          account: { address, alias },
          transferAmount,
          transferFee,
          totalTransferAmount,
        },
      },
      handleSend,
      buttonText,
      theme,
      t
    } = this.props;
    return (
      <div className="confirm-form-container">
        <div className="confirm-form-top-container">
          <ConfirmFromTo to={to} theme={theme} from={address} alias={alias} />
          <DarkDivider className="confirm-form-amount-divider" />
          <ConfirmParticular
            className="confirm-form-amount-container"
            description={t('Amount')}
            price={`${transferAmount}`}
          />
          <ConfirmParticular
            className="confirm-form-fee-container"
            description={t('Fee')}
            price={`${transferFee}`}
          />
          <DarkDivider className="confirm-form-total-amount-divider" />
          <ConfirmParticular
            className="confirm-form-total-container"
            description={t('Total')}
            price={`${totalTransferAmount}`}
          />
        </div>

        <FooterButton onClick={handleSend} name={buttonText} />
      </div>
    );
  }
}

export default withTranslation()(ConfirmForm);

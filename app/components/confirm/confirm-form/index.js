import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import FooterButton from '../../common/footer-button';
import ConfirmParticular from '../confirm-particular';
import CrustPassword from '../../common/password/crust-password';
import { shortenAddress } from '../../../services/wallet-service';
import FooterWithTwoButton from '../../common/footer-with-two-button';
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
      handleBack,
      buttonText,
      theme,
      password,
      errorText,
      handleOnChange,
      colortheme,
      t,
    } = this.props;
    return (
      <div className="confirm-form-container">
        <div className="confirm-form-top-container" style={{ background: colortheme.card }}>
          <ConfirmParticular
            className="confirm-form-to-container"
            description={t('To')}
            price={`${shortenAddress(to)}`}
            colortheme={colortheme}
          />
          <ConfirmParticular
            className="confirm-form-amount-container"
            description={t('Amount')}
            price={`${transferAmount}`}
            colortheme={colortheme}
          />
          <ConfirmParticular
            className="confirm-form-fee-container"
            description={t('Fee')}
            price={`${transferFee}`}
            colortheme={colortheme}
          />
          <ConfirmParticular
            className="confirm-form-total-container"
            description={t('Total')}
            price={`${totalTransferAmount}`}
            colortheme={colortheme}
          />
          <div className="confirm-form-password-container">
            <CrustPassword
              className="confirm-form-password"
              onChange={e => handleOnChange('password', e)}
              password={password}
              placeholder={t('Wallet Password')}
              colortheme={colortheme}
            />
            {errorText !== '' ? (
              <div className="error-msg">{t(errorText)}</div>
            ) : (
              <div className="place-holder"> </div>
            )}
          </div>
        </div>
        <FooterWithTwoButton
          onNextClick={handleSend}
          onBackClick={handleBack}
          backButtonName={t('Cancel')}
          nextButtonName={t('Send')}
          nextColor={colortheme.button.primary.text}
          nextBackground={colortheme.button.primary.main}
          backColor={colortheme.button.secondary.text}
          backBackground={colortheme.button.secondary.main}
        />
      </div>
    );
  }
}

export default withTranslation()(ConfirmForm);

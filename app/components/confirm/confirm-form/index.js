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
      colorTheme,
      t,
    } = this.props;
    return (
      <div className="confirm-form-container">
        <div className="confirm-form-top-container" style={{ background: colorTheme.card }}>
          <ConfirmParticular
            className="confirm-form-to-container"
            description={t('To')}
            price={`${shortenAddress(to)}`}
            colorTheme={colorTheme}
          />
          <ConfirmParticular
            className="confirm-form-amount-container"
            description={t('Amount')}
            price={`${transferAmount}`}
            colorTheme={colorTheme}
          />
          <ConfirmParticular
            className="confirm-form-fee-container"
            description={t('Fee')}
            price={`${transferFee}`}
            colorTheme={colorTheme}
          />
          <ConfirmParticular
            className="confirm-form-total-container"
            description={t('Total')}
            price={`${totalTransferAmount}`}
            colorTheme={colorTheme}
          />
          <div className="confirm-form-password-container">
            <CrustPassword
              className="confirm-form-password"
              onChange={e => handleOnChange('password', e)}
              password={password}
              placeholder={t('Wallet Password')}
              colorTheme={colorTheme}
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
          nextColor={colorTheme.button.primary.text}
          nextBackground={colorTheme.button.primary.main}
          backColor={colorTheme.button.secondary.text}
          backBackground={colorTheme.button.secondary.main}
        />
      </div>
    );
  }
}

export default withTranslation()(ConfirmForm);

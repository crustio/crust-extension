import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import DarkDivider from '../../common/divider/dark-divider';
import FooterButton from '../../common/footer-button';
import ConfirmParticular from '../confirm-particular';
import ConfirmFromTo from '../confirm-from-to';
import CrustPassword from '../../common/password/crust-password'
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
      password,
      errorText,
      handleOnChange,
      t
    } = this.props;
    return (
      <div className="confirm-form-container">
        <div className="confirm-form-top-container">
          <ConfirmFromTo to={to} theme={theme} from={address} alias={alias} />
          <DarkDivider className="confirm-form-amount-divider" background="#E2E4EA" style={{ width: '100%' }}/>
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
          <ConfirmParticular
            className="confirm-form-total-container"
            description={t('Total')}
            price={`${totalTransferAmount}`}
          />
          <DarkDivider className="confirm-form-total-amount-divider" background="#E2E4EA" style={{ width: '100%' }}/>
          <div className="confirm-form-password-container">
            <CrustPassword
              className="confirm-form-password"
              onChange={e => handleOnChange('password', e)}
              password={password}
              placeholder={t('Wallet Password')}
            />
            {errorText !== '' ? (
              <div className="error-msg">{t(errorText)}</div>
            ) : (
              <div className="place-holder"> </div>
            )}
          </div>
        </div>

        

        <FooterButton onClick={handleSend} name={buttonText} />
      </div>
    );
  }
}

export default withTranslation()(ConfirmForm);

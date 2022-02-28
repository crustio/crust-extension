import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import TransferTo from '../../transfer/transfer-to';
import CrustInput from '../../common/crust-input';
import FooterButton from '../../common/footer-button';
import './styles.css';

class CreateContactForm extends Component {
  render() {
    const {
      address,
      theme,
      isAddressError,
      addressPropName,
      addressErrorMessage,
      addressInputRef,
      handleToChange,
      fname,
      fnameLabel,
      isFnameError,
      fnameErrorMessage,
      fnamePropName,
      handleFnameChange,
      lname,
      lnameLabel,
      lnamePropName,
      isLnameError,
      lnameErrorMessage,
      handleLnameChange,
      onSubmit,
      buttonName,
      colortheme,
      t,
    } = this.props;
    return (
      <div className="create-address-book-form">
        <div className="create-address-book-top" style={{ background: colortheme.background }}>
          <TransferTo
            className="contact-to-container"
            addressValue={address}
            theme={theme}
            isError={isAddressError}
            label={t('Address')}
            propName={addressPropName}
            toValue={address}
            errorMessage={addressErrorMessage}
            onChange={handleToChange}
            inputRef={addressInputRef}
            colortheme={colortheme}
          />
          <div className="contact-fname-input-container">
            <CrustInput
              className="contact-fname-input"
              value={fname}
              onChange={handleFnameChange(fnamePropName)}
              placeholder={fnameLabel}
              colortheme={colortheme}
              style={{ background: colortheme.card }}
            />
            {isFnameError ? (
              <span className="error-msg">{fnameErrorMessage}</span>
            ) : (
              <span className="place-holder"> </span>
            )}
          </div>
          <div className="contact-lname-input-container">
            <CrustInput
              className="contact-lname-input"
              value={lname}
              onChange={handleLnameChange(lnamePropName)}
              placeholder={lnameLabel}
              colortheme={colortheme}
              style={{ background: colortheme.card }}
            />
            {isLnameError ? (
              <span className="error-msg">{lnameErrorMessage}</span>
            ) : (
              <span className="place-holder"> </span>
            )}
          </div>
          {/*
          <DropDown
            className="contact-network-dropdown"
            options={networks}
            disabled
            value={network}
            onChange={onNetworkChange}
          />*/}
        </div>

        <FooterButton onClick={onSubmit} name={buttonName} />
      </div>
    );
  }
}

export default withTranslation()(CreateContactForm);

import React, { Component } from 'react';
import TransferFromTo from '../transfer-from-to';
import FooterButton from '../../common/footer-button';
import TransferFormAmount from '../transfer-form-amount';
import { withTranslation } from 'react-i18next';
import './styles.css';

class TransferForm extends Component {
  render() {
    const {
      address,
      theme,
      alias,
      to,
      amount,
      units,
      toRef,
      amountRef,
      isAddressEncoded,
      isToError,
      toErrorText,
      isAmountError,
      amountErrorText,
      unit,
      buttonText,
      amountPropName,
      toPropName,
      handleAmountChange,
      handleToChange,
      handleSendButton,
      handleUnitOnChange,
      onAddressBookClick,
      t
    } = this.props;
    return (
      <div className="transfer-form-container">
        <div className="transfer-form-top-container">
          <TransferFromTo
            address={address}
            theme={theme}
            alias={alias}
            isToError={isToError}
            isAddressEncoded={isAddressEncoded}
            toPropName={toPropName}
            to={to}
            toRef={toRef}
            toErrorText={toErrorText}
            handleToChange={handleToChange}
            onAddressBookClick={onAddressBookClick}
          />
        </div>
        <TransferFormAmount
          className="transfer-form-amount-container"
          error={isAmountError}
          label={t("Amount")}
          value={amount}
          helperText={amountErrorText}
          onChange={handleAmountChange}
          propName={amountPropName}
          inputRef={amountRef}
          options={units}
          dropDownValue={unit}
          onDropDownChange={handleUnitOnChange}
        />
        <FooterButton onClick={handleSendButton} name={buttonText} />
      </div>
    );
  }
}

export default withTranslation()(TransferForm)

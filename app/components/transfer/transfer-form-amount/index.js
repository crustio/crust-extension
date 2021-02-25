import React, { Component } from 'react';
import CrustInput from '../../common/crust-input';
import DropDown from '../../common/drop-down';
import FontRegular from '../../common/fonts/font-regular';
import {convertBalanceToShow} from '../../../../lib/services/numberFormatter';
import { withTranslation } from 'react-i18next';
import './styles.css';
class TransferFormAmount extends Component {
  render() {
    const {
      error,
      label,
      value,
      helperText,
      onChange,
      inputRef,
      options,
      dropDownValue,
      propName,
      onDropDownChange,
      t,
      ...otherProps
    } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
        {...otherProps}
      >
        <div className="transfer-form-amount-dropdown-container">
          <FontRegular className="transfer-form-amount-dropdown-label" text={t('Assets')+':'} />
          <DropDown className="transfer-form-amount-dropdown" options={options} value={dropDownValue} onChange={onDropDownChange} />
        </div>

        <FontRegular className="transfer-form-amount-balance" text={`${t("Balance")}:  ${convertBalanceToShow(dropDownValue.balance, dropDownValue.decimals)}`} />
        
        <div className="transfer-form-amount-input-container">
          <FontRegular className="transfer-form-amount-input-label" text={t('Amount')+':'} />
          <CrustInput
            className='transfer-from-amount-input'
            onChange={onChange(propName)}
            value={value}
          />
        </div>
        {error ? (
          <span className="transfer-from-amount-input-error-msg">{helperText}</span>
        ) : (
          <span className="transfer-from-amount-input-place-holder "> </span>
        )}
      </div>
    );
  }
}

export default withTranslation()(TransferFormAmount)

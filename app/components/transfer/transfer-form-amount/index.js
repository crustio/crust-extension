import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import CrustInput from '../../common/crust-input';
import DropDown from '../../common/drop-down';
import FontRegular from '../../common/fonts/font-regular';
import { convertBalanceToShow } from '../../../../lib/services/numberFormatter';
import './styles.css';

class TransferFormAmount extends Component {
  onClickMax = () => {
    this.props.setValue(
      this.props.dropDownValue.balance === '-'
        ? 0
        : convertBalanceToShow(this.props.dropDownValue.balance, this.props.dropDownValue.decimals),
    );
  };

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
      colorTheme,
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
          <DropDown
            className="transfer-form-amount-dropdown"
            style={{ background: colorTheme.card }}
            options={options}
            value={dropDownValue}
            onChange={onDropDownChange}
            colorTheme={colorTheme}
          />
        </div>

        <div className="transfer-form-amount-input-container">
          <CrustInput
            className="transfer-from-amount-input"
            onChange={onChange(propName)}
            value={value}
            placeholder={t('Amount')}
            style={{ background: colorTheme.card }}
            endAdornment={
              <FontRegular
                text={t('Max')}
                style={{
                  marginRight: 8,
                  position: 'relative',
                  cursor: 'pointer',
                  color: colorTheme.text.secondary,
                }}
                onClick={this.onClickMax}
              />
            }
          />
        </div>
        {error ? (
          <span className="transfer-from-amount-input-error-msg">{helperText}</span>
        ) : (
          <span className="transfer-from-amount-input-place-holder "> </span>
        )}

        <FontRegular
          className="transfer-form-amount-balance"
          text={`${t('Balance')}:  ${
            dropDownValue.balance === '-'
              ? '-'
              : convertBalanceToShow(dropDownValue.balance, dropDownValue.decimals)
          }`}
          style={{ color: colorTheme.text.quaternary }}
        />
      </div>
    );
  }
}

export default withTranslation()(TransferFormAmount);

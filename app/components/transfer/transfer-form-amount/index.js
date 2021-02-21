import React, { Component } from 'react';
import CrustInput from '../../common/crust-input';
import DropDown from '../../common/drop-down';
import './styles.css';
export default class TransferFormAmount extends Component {
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
      ...otherProps
    } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        {...otherProps}
      >
        <div>
          <CrustInput
            className='transfer-from-amount-input'
            onChange={onChange(propName)}
            placeholder={label}
            value={value}
          />
          {error ? (
            <span className="transfer-from-amount-input-error-msg">{helperText}</span>
          ) : (
            <span className="transfer-from-amount-input-place-holder "> </span>
          )}
        </div>
        <div>
          <DropDown options={options} value={dropDownValue} onChange={onDropDownChange} />
          <span className="transfer-from-amount-input-place-holder "> </span>
        </div>
        
        
      </div>
    );
  }
}

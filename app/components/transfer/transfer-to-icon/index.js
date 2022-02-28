import React, { Component } from 'react';
import CrustInput from '../../common/crust-input';
import AddressBookAdorment from '../address-book-adornment';
import './styles.css';

export default class TransferToIcon extends Component {
  render() {
    const {
      addressValue,
      toValue,
      size,
      theme,
      isError,
      label,
      propName,
      errorMessage,
      onChange,
      onBlur,
      inputRef,
      onAddressBookClick,
      colortheme,
      ...otherProps
    } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        {...otherProps}
      >
        <CrustInput
          className="transfer-to-icon-input"
          value={toValue}
          onChange={onChange(propName)}
          placeholderText={label}
          spellCheck={false}
          colortheme={colortheme}
          style={{
            background: colortheme.card,
            '&::placeholder': { color: colortheme.text.tertiary },
          }}
          endAdornment={
            <AddressBookAdorment
              position="end"
              onClick={onAddressBookClick}
              colortheme={colortheme}
            />
          }
        />
        {isError ? <span className="tranfer-to-icon-error-msg">{errorMessage}</span> : null}
      </div>
    );
  }
}

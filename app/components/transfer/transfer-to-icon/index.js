import React, { Component } from 'react';
import Avatar from '../../common/identicon';
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
      ...otherProps
    } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        {...otherProps}
      >
        <CrustInput
          className="transfer-to-icon-input"
          value={toValue}
          onChange={onChange(propName)}
          placeholder={label}
          spellCheck={false}
          endAdornment={<AddressBookAdorment position="end" onClick={onAddressBookClick} />}
        />
        {isError ? (
          <span className="tranfer-to-icon-error-msg">{errorMessage}</span>
        ) : (
          <span className="place-holder"> </span>
        )}
      </div>
    );
  }
}

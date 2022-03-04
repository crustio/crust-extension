import React, { Component } from 'react';
import TransferToIcon from '../transfer-to-icon';
import './styles.css';

export default class TransferFromTo extends Component {
  render() {
    const {
      toRef,
      address,
      theme,
      alias,
      isToError,
      label,
      isAddressEncoded,
      toPropName,
      to,
      toErrorText,
      handleToChange,
      page,
      onAddressBookClick,
      colortheme,
      ...otherProps
    } = this.props;
    return (
      <div className="transfer-from-to-container" {...otherProps}>
        <TransferToIcon
          className="transfer-to-container"
          addressValue={to}
          theme={theme}
          isError={isToError}
          label={label}
          propName={toPropName}
          toValue={to}
          errorMessage={toErrorText}
          onChange={handleToChange}
          inputRef={toRef}
          onAddressBookClick={onAddressBookClick}
          colortheme={colortheme}
        />
      </div>
    );
  }
}

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
      isAddressEncoded,
      toPropName,
      to,
      toErrorText,
      handleToChange,
      page,
      onAddressBookClick,
      ...otherProps
    } = this.props;
    return (
      <div className="transfer-from-to-container" {...otherProps}>
        <TransferToIcon
          className="transfer-to-container"
          addressValue={to}
          theme={theme}
          isError={isToError}
          label="To Address"
          propName={toPropName}
          toValue={to}
          errorMessage={toErrorText}
          onChange={handleToChange}
          inputRef={toRef}
          onAddressBookClick={onAddressBookClick}
        />
      </div>
    );
  }
}

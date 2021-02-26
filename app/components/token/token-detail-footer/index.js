import React, { Component } from 'react';
import ButtonMD from '../../common/buttons/button-md';

export default class TokenDetailFooter extends Component {
  render() {
    const {
      handleDeposit,
      handleSend,
      receiveButtonName,
      sendButtonName,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <ButtonMD onClick={handleDeposit} custom>{receiveButtonName}</ButtonMD>
        <ButtonMD onClick={handleSend} custom>{sendButtonName}</ButtonMD>
      </div>
    );
  }
}

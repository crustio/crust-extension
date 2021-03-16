import React, { Component } from 'react';
import ButtonCustom from '../../common/buttons/button-custom';

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
        <ButtonCustom
          onClick={handleDeposit}
          border="1px solid #FF8D00"
          width="142px"
          height="38px"
        >
          {receiveButtonName}
        </ButtonCustom>
        <ButtonCustom onClick={handleSend} border="1px solid #FF8D00" width="142px" height="38px">
          {sendButtonName}
        </ButtonCustom>
      </div>
    );
  }
}

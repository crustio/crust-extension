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
          width="155px"
          height="38px"
          marginRight="10px"
        >
          {receiveButtonName}
        </ButtonCustom>
        <ButtonCustom
          onClick={handleSend}
          border="1px solid #FF8D00"
          width="155px"
          height="38px"
          marginLeft="10px"
        >
          {sendButtonName}
        </ButtonCustom>
      </div>
    );
  }
}

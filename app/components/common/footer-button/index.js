import React, { Component } from 'react';
import ButtonCustom from '../buttons/button-custom';

export default class FooterButton extends Component {
  render() {
    const {
      style, name, disabled, onClick, custom, ...otherProps
    } = this.props;
    return (
      <div
        style={{
          position: 'absolute',
          top: '544px',
          alignSelf: 'center',
          justifyContent: 'center',
          display: 'flex',
          ...style,
        }}
        {...otherProps}
      >
        <ButtonCustom
          disabled={disabled}
          onClick={onClick}
          custom={custom}
          textColor="white"
          background="#FF8D00"
        >
          {name}
        </ButtonCustom>
      </div>
    );
  }
}

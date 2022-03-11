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
          bottom: '11px',
          alignSelf: 'center',
          justifyContent: 'center',
          display: 'flex',
          width: '100%',
          left: 0,
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

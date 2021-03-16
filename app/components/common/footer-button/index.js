import React, { Component } from 'react';
import ButtonXL from '../buttons/button-xl';

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
        <ButtonXL disabled={disabled} onClick={onClick} custom={custom}>
          {name}
        </ButtonXL>
      </div>
    );
  }
}

import React, { Component } from 'react';
import ButtonCustom from '../buttons/button-custom';

export default class FooterWithTwoButton extends Component {
  render() {
    const {
      style,
      backButtonName,
      nextButtonName,
      onBackClick,
      onNextClick,
      ...otherProps
    } = this.props;
    return (
      <div
        style={{
          position: 'absolute',
          bottom: '11px',
          right: '20px',
          left: '20px',
          justifyContent: 'space-between',
          display: 'flex',
          ...style,
        }}
        {...otherProps}
      >
        <ButtonCustom
          onClick={onNextClick}
          border="1px solid #FF8D00"
          width="150px"
          background="transparent"
        >
          {nextButtonName}
        </ButtonCustom>
        <ButtonCustom
          onClick={onBackClick}
          width="150px"
          color="#858B9C"
          background="transparent"
          border="1px solid rgba(65, 72, 93, 0.5)"
          custom
        >
          {backButtonName}
        </ButtonCustom>
      </div>
    );
  }
}

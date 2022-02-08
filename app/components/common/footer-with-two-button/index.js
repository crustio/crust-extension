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
      nextColor,
      nextBackground,
      backColor,
      backBackground,
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
          width="150px"
          color={nextColor}
          background={nextBackground}
        >
          {nextButtonName}
        </ButtonCustom>
        <ButtonCustom
          onClick={onBackClick}
          width="150px"
          color={backColor}
          background={backBackground}
          custom
        >
          {backButtonName}
        </ButtonCustom>
      </div>
    );
  }
}

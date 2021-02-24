import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import classNames from 'classnames';
import './styles.css'

class ButtonCustom extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    disabled: false,
  };

  render() {
    const { custom, ...otherProps } = this.props;
    const ButtonCustom = styled(Button)`
      font-size: 14px;
      font-family: 'Inter-Bold';
      font-style: normal;
      height: 45px;
      border: ${this.props.border ? this.props.border : 'none'};
      width: ${this.props.width ? this.props.width : '320px'};
      background: ${this.props.background
      ? this.props.background
      : 'white'};
        color: ${this.props.color ? this.props.color : '#FF8D00'};
    `;
    const buttonCustomClassNames = classNames({
      'button-custom': true,
      'button-custom1': custom,
    });
    return (
      <div className={buttonCustomClassNames}>
        <ButtonCustom disabled={this.props.disabled} onClick={this.props.onClick} {...otherProps}>
          {this.props.children}
        </ButtonCustom>
      </div>
    );
  }
}

export default ButtonCustom;

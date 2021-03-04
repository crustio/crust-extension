import React, { Component } from 'react';
import Logo from '../../../images/crust-logo-big.svg';

export default class CrustLogo extends Component {
  render() {
    const { ...otherProps } = this.props;
    return <img src={Logo} {...otherProps} alt="logo" />;
  }
}

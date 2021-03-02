import React, { Component } from 'react';
import FontRegular from '../../common/fonts/font-regular';
import './styles.css';

export default class TokenValue extends Component {
  render() {
    const {
      token, marketData, amount, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <FontRegular className="token" text={token} />
      </div>
    );
  }
}

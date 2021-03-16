import React, { Component } from 'react';
import FontRegular from '../../common/fonts/font-regular';
import './styles.css';

export default class TokenValue extends Component {
  render() {
    const {
      token, marketData, amount, labelText, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        {labelText && (
          <FontRegular
            style={{ fontSize: '12px', color: '#41485D' }}
            text={labelText}
          />
        )}

        <FontRegular className="token" text={token} />
      </div>
    );
  }
}

import React, { Component } from 'react';
import FontMedium from '../../common/fonts/font-medium';
import FontRegular from '../../common/fonts/font-regular';
import './styles.css';

export default class ConfirmQuote extends Component {
  render() {
    const {
      description, price, colortheme, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <FontMedium
          className="confirm-quote-description"
          text={description}
          style={{ color: colortheme.text.primary }}
        />
        <FontRegular
          className="confirm-quote-price"
          text={price}
          style={{ color: colortheme.text.fifth }}
        />
      </div>
    );
  }
}

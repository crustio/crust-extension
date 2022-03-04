import React, { PureComponent } from 'react';

export default class FontMedium extends PureComponent {
  render() {
    const {
      text, style, colortheme, ...otherProps
    } = this.props;
    return (
      <div
        style={{
          fontFamily: 'Roboto-Medium',
          color: colortheme ? colortheme.text.primary : '',
          ...style,
        }}
        {...otherProps}
      >
        {text}
      </div>
    );
  }
}

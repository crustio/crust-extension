import React, { PureComponent } from 'react';

export default class FontMedium extends PureComponent {
  render() {
    const {
      text, style, colorTheme, ...otherProps
    } = this.props;
    return (
      <div
        style={{
          fontFamily: 'Roboto-Medium',
          color: colorTheme ? colorTheme.text.primary : '',
          ...style,
        }}
        {...otherProps}
      >
        {text}
      </div>
    );
  }
}

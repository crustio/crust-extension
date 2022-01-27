import React, { PureComponent } from 'react';

export default class FontRegular extends PureComponent {
  render() {
    const { style, text, ...otherProps } = this.props;
    return (
      <div
        style={{
          fontFamily: 'Roboto-Regular',
          wordBreak: 'break-all',
          ...style,
        }}
        {...otherProps}
      >
        {text}
      </div>
    );
  }
}

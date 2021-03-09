import React, { Component } from 'react';

export default class DarkDivider extends Component {
  render() {
    const { style, background, ...otherProps } = this.props;

    return (
      <div
        style={{
          width: '100vw',
          height: '1px',
          backgroundColor: background ? background : 'rgba(227, 227, 227, 1)',
          ...style,
        }}
        {...otherProps}
      />
    );
  }
}

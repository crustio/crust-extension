import React, { Component } from 'react';
import MultilineInput from '../../common/multiline-input';

export default class SeedWordsBox extends Component {
  render() {
    const { value, colortheme, ...otherProps } = this.props;
    return (
      <div {...otherProps}>
        <MultilineInput value={value} colortheme={colortheme} />
      </div>
    );
  }
}

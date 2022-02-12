import React, { Component } from 'react';
import MultilineInput from '../../common/multiline-input';

export default class SeedWordsBox extends Component {
  render() {
    const { value, colorTheme, ...otherProps } = this.props;
    return (
      <div {...otherProps}>
        <MultilineInput value={value} colorTheme={colorTheme} />
      </div>
    );
  }
}

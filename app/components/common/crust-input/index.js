import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Input from '@material-ui/core/Input';
import { styles } from './styles';

class CrustInput extends Component {
  render() {
    const {
      classes,
      InputProps,
      placeholderText,
      standardInput,
      colorTheme,
      ...otherProps
    } = this.props;
    return standardInput ? (
      <Input
        placeholder={placeholderText}
        labelWidth={0}
        inputProps={{
          className: classes.crustInput,
          style: {
            color: colorTheme.text.primary,
          },
        }}
        disableUnderline
        {...otherProps}
      />
    ) : (
      <OutlinedInput
        placeholder={placeholderText}
        labelWidth={0}
        classes={{
          adornedEnd: classes.rootEndAdornment,
        }}
        inputProps={{
          className: classes.crustInput,
          style: {
            color: colorTheme.text.primary,
          },
        }}
        {...otherProps}
      />
    );
  }
}

export default withStyles(styles)(CrustInput);

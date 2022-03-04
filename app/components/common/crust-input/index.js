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
      colortheme,
      ...otherProps
    } = this.props;
    return standardInput ? (
      <Input
        placeholder={placeholderText}
        labelWidth={0}
        inputProps={{
          className: classes.crustInput,
          style: {
            color: colortheme.text.primary,
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
            color: colortheme.text.primary,
          },
        }}
        {...otherProps}
      />
    );
  }
}

export default withStyles(styles)(CrustInput);

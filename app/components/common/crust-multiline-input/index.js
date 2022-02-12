import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

class CrustMultilineInput extends Component {
  render() {
    const {
      classes,
      inputRef,
      placeholder,
      onChange,
      error,
      onBlur,
      value,
      helperText,
      name,
      colorTheme,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <TextField
          name={name}
          inputRef={inputRef}
          placeholder={placeholder}
          multiline
          error={error}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          rows="5"
          rowsMax="5"
          className={classes.textField}
          helperText={helperText}
          FormHelperTextProps={{
            classes: {
              root: classes.helperText,
              error: classes.helperTextError,
            },
          }}
          InputProps={{
            classes: {
              underline: classes.underline,
              root: classes.inputRoot,
              input: classes.input,
              error: classes.inputError,
            },
            style: {
              background: colorTheme ? colorTheme.card : null,
              color: colorTheme ? colorTheme.text.primary : null,
              '&::placeholder': {
                color: colorTheme ? colorTheme.text.primary : null,
              },
            },
          }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(CrustMultilineInput);

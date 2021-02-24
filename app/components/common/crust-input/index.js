import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Input from '@material-ui/core/Input';
import { styles } from './styles';

class CrustInput extends Component {
  render() {
    const {
      classes, InputProps, placeholderText, standardInput, ...otherProps
    } = this.props;
    return (
      standardInput ? 
        <Input
          placeholder={placeholderText}
          labelWidth={0}
          inputProps={{
            className: classes.crustInput,
          }}
          disableUnderline={true}
          {...otherProps}
        />
        :
        <OutlinedInput
          placeholder={placeholderText}
          labelWidth={0}
          inputProps={{
            className: classes.crustInput,
          }}
          {...otherProps}
        />
    );
  }
}

export default withStyles(styles)(CrustInput);

import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { styles } from './styles';

class CrustInput extends Component {
  render() {
    const {
      classes, InputProps, placeholderText, ...otherProps
    } = this.props;
    return (
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

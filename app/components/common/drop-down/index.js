import React, { Component } from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';
import withStyles from '@material-ui/core/styles/withStyles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { styles } from './styles';

class DropDown extends Component {
  render() {
    const {
      classes, options, value, onChange, disabled, colortheme, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <NativeSelect
          className={classes.test}
          classes={{
            root: classes.root,
            select: classes.select,
            icon: classes.icon,
          }}
          style={{ color: colortheme.text.primary }}
          onChange={onChange}
          value={value.value}
          disableUnderline
          disabled={disabled}
          IconComponent={props => (
            <ExpandMoreIcon
              {...props}
              className={`material-icons ${props.className}`}
              style={{ color: colortheme.text.secondary }}
            />
          )}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value} style={{ color: 'black' }}>
              {opt.text}
            </option>
          ))}
        </NativeSelect>
      </div>
    );
  }
}

export default withStyles(styles)(DropDown);

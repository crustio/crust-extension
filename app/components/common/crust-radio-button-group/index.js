import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

class CrustRadioButtonGroup extends Component {
  render() {
    const {
      classes, options, value, onChange, disabled, vertical, ...otherProps
    } = this.props;
    return (
      <RadioGroup
        onChange={onChange}
        classes={{ root: vertical ? classes.radioGroupRootVertical : classes.radioGroupRoot }}
        value={value.value}
        {...otherProps}
      >
        {options.map(option => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={
              <Radio
                classes={{
                  colorSecondary: classes.colorSecondary,
                  checked: classes.checked,
                  root: classes.radioRoot,
                }}
              />
            }
            label={option.text}
            classes={{
              root: vertical ? classes.rootVertical : classes.root,
              label: vertical ? classes.labelVertical : classes.label,
            }}
            labelPlacement={vertical ? 'start' : 'end'}
            disabled={disabled}
          />
        ))}
      </RadioGroup>
    );
  }
}

export default withStyles(styles)(CrustRadioButtonGroup);

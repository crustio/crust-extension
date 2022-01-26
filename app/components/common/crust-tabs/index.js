import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

class CrustTabs extends Component {
  render() {
    const {
      value, onChange, classes, labels, parent, colorTheme, ...otherProps
    } = this.props;
    return (
      <Tabs
        value={value}
        onChange={onChange}
        TabIndicatorProps={{
          style: {
            display: 'none',
          },
        }}
        classes={{
          root: parent === 'home' ? classes.tabsRootHome : classes.tabsRootAccount,
          indicator: classes.tabsIndicator,
        }}
        {...otherProps}
      >
        {labels.map(label => (
          <Tab
            key={label}
            disableRipple
            classes={{
              root: parent === 'home' ? classes.tabRootHome : classes.tabRootAccount,
              selected: parent === 'home' ? classes.tabSelected : classes.tabSelected,
            }}
            label={label}
          />
        ))}
      </Tabs>
    );
  }
}

export default withStyles(styles)(CrustTabs);

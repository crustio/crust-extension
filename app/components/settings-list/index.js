/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import List from '@material-ui/core/List';
import withStyles from '@material-ui/core/styles/withStyles';
import SettingsItemCard from '../common/settings-item-card';
import './styles.css';

class SettingsList extends Component {
  render() {
    const {
      classes, options, onOptionsChange, colortheme, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <List
          classes={{
            root: classes.root,
          }}
        >
          {options.map((option, i) => (
            <SettingsItemCard
              key={i}
              listItem={option}
              handleListItemClick={onOptionsChange}
              className="settings-card-container"
              colortheme={colortheme}
              style={{ background: colortheme.card }}
            />
          ))}
        </List>
        <div ref={this.accountsEndRef} />
      </div>
    );
  }
}

const styles = () => ({
  root: {
    paddingTop: '0px !important',
  },
});

export default withStyles(styles)(SettingsList);

import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import withStyles from '@material-ui/core/styles/withStyles';
import ReactTooltip from 'react-tooltip';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import './styles.css';

class KeyPairItemCard extends Component {
  render() {
    const {
      classes,
      listItem,
      primaryText,
      handleListItemAvatarClick,
      handleListItemClick,
      isActive,
      colortheme,
      className,
    } = this.props;
    return (
      <div className={className}>
        <ListItem className="key-pair-card-item">
          <ListItemAvatar onClick={event => handleListItemAvatarClick(event, listItem)}>
            {isActive ? (
              <CheckCircleIcon
                className="key-pair-card-icon"
                style={{ color: colortheme.icon.primary }}
              />
            ) : (
              <RadioButtonUncheckedIcon
                className="key-pair-card-icon"
                style={{ color: colortheme.icon.secondary }}
              />
            )}
          </ListItemAvatar>
          <ListItemText
            onClick={event => handleListItemClick(event, listItem)}
            primary={
              <span style={{ display: 'flex' }}>
                <span
                  className="key-pair-card-text"
                  data-tip={primaryText}
                  style={{ color: colortheme ? colortheme.text.quaternary : null }}
                >
                  {primaryText}
                </span>
                <ReactTooltip effect="solid" place="bottom" />
              </span>
            }
            className={classes.primaryWidth}
            secondary={null}
          />
        </ListItem>
      </div>
    );
  }
}

const styles = () => ({
  primaryWidth: {
    width: '290px !important',
    padding: '0px !important',
  },
});

export default withStyles(styles)(KeyPairItemCard);

import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import withStyles from '@material-ui/core/styles/withStyles';
import ReactTooltip from 'react-tooltip';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import './styles.css';

class SimpleListItemCard extends Component {
  render() {
    const {
      classes,
      listItem,
      primaryText,
      handleListItemAvatarClick,
      handleListItemClick,
      isActive,
      colortheme,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <ListItem className="language-card-item">
          <ListItemText
            onClick={event => handleListItemClick(event, listItem)}
            primary={
              <span style={{ display: 'flex' }}>
                <span
                  className="language-card-text"
                  data-tip={primaryText}
                  style={{ color: colortheme.text.primary }}
                >
                  {primaryText}
                </span>
                <ReactTooltip effect="solid" place="bottom" />
              </span>
            }
            className={classes.primaryWidth}
            secondary={null}
          />
          <ListItemAvatar onClick={event => handleListItemAvatarClick(event, listItem)}>
            {isActive ? (
              <CheckCircleIcon
                className="language-card-icon"
                style={{ color: colortheme.icon.primary }}
              />
            ) : (
              <RadioButtonUncheckedIcon
                className="language-card-icon"
                style={{ color: colortheme.icon.secondary }}
              />
            )}
          </ListItemAvatar>
        </ListItem>
      </div>
    );
  }
}

const styles = () => ({
  primaryWidth: {
    width: '290px !important',
    padding: '0 10px !important',
  },
});

export default withStyles(styles)(SimpleListItemCard);

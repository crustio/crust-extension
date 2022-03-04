import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import withStyles from '@material-ui/core/styles/withStyles';
import ReactTooltip from 'react-tooltip';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ClickToCopyAddress from '../click-to-copy-address';
import './styles.css';

class ListItemCard extends Component {
  handleNullBalanceObject = (balObj, account) => {
    if (!balObj) {
      return {
        balanceFormatted: '0.0',
        token: account.token,
      };
    }
    return balObj;
  };

  render() {
    const {
      classes,
      address,
      listItem,
      primaryText,
      onCopyAddress,
      handleListItemAvatarClick,
      handleListItemClick,
      isActive,
      isSelected,
      theme,
      colortheme,
      network,
      customModal,
      showRadio,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <ListItem>
          <ListItemText
            onClick={event => handleListItemClick(event, listItem)}
            primary={
              <span style={{ display: 'flex' }}>
                <span
                  className="account-card-text"
                  data-tip={primaryText}
                  style={{ color: colortheme.text.primary }}
                >
                  {primaryText}
                </span>
                <ReactTooltip effect="solid" place="bottom" />
              </span>
            }
            className={classes.primaryWidth}
            secondary={
              <ClickToCopyAddress
                className="account-address clickable-icon"
                onCopyAddress={onCopyAddress}
                address={address}
                style={{ color: colortheme.text.tertiary }}
              />
            }
          />
          {showRadio && (
            <ListItemAvatar onClick={event => handleListItemAvatarClick(event, listItem)}>
              {isSelected ? (
                <CheckCircleIcon
                  className="accout-card-icon"
                  style={{ color: colortheme.icon.primary }}
                />
              ) : (
                <RadioButtonUncheckedIcon
                  className="accout-card-icon"
                  style={{ color: colortheme.icon.secondary }}
                />
              )}
            </ListItemAvatar>
          )}
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

export default withStyles(styles)(ListItemCard);

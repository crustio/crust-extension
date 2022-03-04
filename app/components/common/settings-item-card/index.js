import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import ReactTooltip from 'react-tooltip';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { withTranslation } from 'react-i18next';
import './styles.css';

class SettingsItemCard extends Component {
  render() {
    const {
      classes,
      address,
      listItem,
      primaryText,
      onCopyAddress,
      onMoreMenuOptionsChange,
      moreMenu,
      handleListItemAvatarClick,
      handleListItemClick,
      isActive,
      colortheme,
      t,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps} onClick={event => handleListItemClick(event, listItem)}>
        <ListItem>
          <ListItemText
            primary={
              <span style={{ display: 'flex' }}>
                <span
                  className="settings-card-text"
                  data-tip={listItem.text}
                  style={{ color: colortheme.text.primary }}
                >
                  {t(listItem.text)}
                </span>
                <ReactTooltip effect="solid" place="bottom" />
              </span>
            }
            className={classes.primaryWidth}
          />
          <ArrowForwardIosIcon
            color="rgba(0, 0, 0, 1)"
            className="arrow-list-icon"
            style={{ color: colortheme.text.primary }}
          />
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

export default withStyles(styles)(withTranslation()(SettingsItemCard));

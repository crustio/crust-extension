import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import withStyles from '@material-ui/core/styles/withStyles';
import ReactTooltip from 'react-tooltip';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { MoreHorizIcon } from '../icon';
import ClickToCopyAddress from '../click-to-copy-address';
import ModalWithThreeButton from '../modal-with-three-button';
import './styles.css';
import { EXPORT_ACCOUNT, REMOVE } from '../../../constants/options';

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

  handleTopClick = async () => {
    await this.props.onMoreMenuOptionsChange(REMOVE, this.props.listItem);
  };

  handleBottomClick = async () => {
    await this.props.onMoreMenuOptionsChange(EXPORT_ACCOUNT, this.props.listItem);
  };

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
      isMoreVertIconVisible,
      isActive,
      theme,
      colorTheme,
      network,
      customModal,
      showRadio,
      showFooterModal,
      handleFooterClick,
      handleFooterCancel,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <ListItem>
          {showRadio && (
            <ListItemAvatar onClick={event => handleListItemAvatarClick(event, listItem)}>
              {isActive ? (
                <CheckCircleIcon
                  className="accout-card-icon"
                  style={{ color: colorTheme.icon.primary }}
                />
              ) : (
                <RadioButtonUncheckedIcon
                  className="accout-card-icon"
                  style={{ color: colorTheme.icon.secondary }}
                />
              )}
            </ListItemAvatar>
          )}
          <ListItemText
            onClick={event => handleListItemClick(event, listItem)}
            primary={
              <span style={{ display: 'flex' }}>
                <span
                  className="account-card-text"
                  data-tip={primaryText}
                  style={{ color: colorTheme.text.primary }}
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
                style={{ color: colorTheme.text.tertiary }}
              />
            }
          />
          {isMoreVertIconVisible && (
            <MoreHorizIcon
              color={colorTheme.text.secondary}
              onClick={handleFooterClick}
              className="more-list-icon"
            />
          )}
          <ModalWithThreeButton
            show={showFooterModal}
            colorTheme={colorTheme}
            firstOption={EXPORT_ACCOUNT}
            secondOption={REMOVE}
            handleTopClick={this.handleTopClick}
            handleBottomClick={this.handleBottomClick}
            handleCancel={handleFooterCancel}
            topButton="Remove"
            bottomButton="Export Account"
            network={network}
            oneAction={customModal}
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

export default withStyles(styles)(ListItemCard);

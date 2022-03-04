/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import List from '@material-ui/core/List';
import withStyles from '@material-ui/core/styles/withStyles';
import ListItemCard from '../../common/list-item-card';
import './styles.css';

class AddressList extends Component {
  render() {
    const {
      classes,
      addressBook,
      onCopyAddress,
      onMoreMenuOptionsChange,
      isSelectIcon,
      handelChangeToAddress,
      theme,
      network,
      colortheme,
      showFooterModal,
      handleFooterCancel,
      handleFooterClick,
      selectedAddress,
      updateSelectedAddress,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <List
          classes={{
            root: classes.root,
          }}
        >
          {addressBook.map((address, index) => (
            <ListItemCard
              key={index}
              listItem={address}
              theme={theme}
              primaryText={`${address.fname}  ${address.lname}`}
              address={address.address}
              onCopyAddress={onCopyAddress}
              className="address-card-container"
              onMoreMenuOptionsChange={onMoreMenuOptionsChange}
              handleListItemAvatarClick={updateSelectedAddress}
              handleListItemClick={handelChangeToAddress}
              network={network}
              colortheme={colortheme}
              customModal
              showRadio={isSelectIcon}
              showFooterModal={showFooterModal}
              handleFooterClick={handleFooterClick}
              handleFooterCancel={handleFooterCancel}
              style={{ background: colortheme.card }}
              isSelected={selectedAddress.findIndex(e => e.address === address.address) !== -1}
            />
          ))}
        </List>
      </div>
    );
  }
}

const styles = () => ({
  root: {
    paddingTop: '0px !important',
  },
});

export default withStyles(styles)(AddressList);

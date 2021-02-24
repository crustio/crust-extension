import React, { Component } from 'react';
import CrustInputAdornment from '../../common/crust-input-adornment';
import IconContainer from '../../common/icon-container';
import AddressIcon from '../../../images/address-icon.png';

export default class AddressBookAdornment extends Component {
  render() {
    const { onClick, ...otherProps } = this.props;
    return (
      <CrustInputAdornment {...otherProps}>
        <IconContainer aria-label="Toggle password visibility" onClick={onClick}>
          {/* <AddressBook /> */}
          <img src={AddressIcon} width={'14px'} alt="addressIcon" />
        </IconContainer>
      </CrustInputAdornment>
    );
  }
}

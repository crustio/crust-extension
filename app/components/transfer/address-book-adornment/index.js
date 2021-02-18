import React, { Component } from 'react';
import CrustInputAdornment from '../../common/crust-input-adornment';
import IconContainer from '../../common/icon-container';
import { AddressBook } from '../../common/icon';

export default class AddressBookAdornment extends Component {
  render() {
    const { onClick, ...otherProps } = this.props;
    return (
      <CrustInputAdornment {...otherProps}>
        <IconContainer aria-label="Toggle password visibility" onClick={onClick}>
          <AddressBook />
        </IconContainer>
      </CrustInputAdornment>
    );
  }
}

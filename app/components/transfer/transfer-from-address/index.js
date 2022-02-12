import React, { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import FontRegular from '../../common/fonts/font-regular';
import Address from '../../common/address';
import './styles.css';
import ClickToCopyAddress from '../../common/click-to-copy-address';

export default class TransferFromAddress extends Component {
  render() {
    const {
      alias, address, canCopy, onCopyAddress, colorTheme, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <Tooltip title={alias}>
          <FontRegular
            className="transfer-form-address-alias"
            text={alias}
            style={{ color: colorTheme.text.primary }}
          />
        </Tooltip>
        {canCopy ? (
          <ClickToCopyAddress
            className="transfer-form-address-text clickable-icon"
            onCopyAddress={onCopyAddress}
            address={address}
            style={{ color: colorTheme.text.quaternary }}
          />
        ) : (
          <Address
            className="transfer-form-address-text"
            hash={address}
            style={{ color: colorTheme.text.quaternary }}
          />
        )}
      </div>
    );
  }
}

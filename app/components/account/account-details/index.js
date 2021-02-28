import React, { Component } from 'react';
import FontRegular from '../../common/fonts/font-regular';
import ClickToCopyAddress from '../../common/click-to-copy-address';
import CrustInput from '../../common/crust-input';
import ReactTooltip from 'react-tooltip';
import './styles.css';

export default class AccountDetails extends Component {
  render() {
    const {
      alias,
      onCopyAddress,
      address,
      editMode,
      onAliasChange,
      aliasValue,
      onAliasInputBlur,
      onAliasInputKeyPress,
      fontSize,
      inputRef,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        {!editMode && (
          <div>
            <FontRegular className="account-alias" text={alias} data-tip={alias} style={fontSize && { fontSize }} />
            <ReactTooltip effect={"solid"} place={"bottom"}/>
          </div>
        )}
        {editMode && (
          <CrustInput
            className="account-input"
            onChange={onAliasChange}
            onBlur={onAliasInputBlur}
            value={aliasValue}
            inputRef={inputRef}
          />
        )}
        {!editMode && (
          <ClickToCopyAddress
            className="account-address clickable-icon"
            onCopyAddress={onCopyAddress}
            address={address}
          />
        )}
      </div>
    );
  }
}

import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import FontRegular from '../../common/fonts/font-regular';
import ClickToCopyAddress from '../../common/click-to-copy-address';
import CrustInput from '../../common/crust-input';
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
      colortheme,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        {!editMode && (
          <div>
            <FontRegular
              className="account-alias"
              text={alias}
              data-tip={alias}
              style={(fontSize && { fontSize }, { color: colortheme.text.primary })}
            />
            <ReactTooltip effect="solid" place="bottom" />
          </div>
        )}
        {editMode && (
          <CrustInput
            className="account-input"
            onChange={onAliasChange}
            onBlur={onAliasInputBlur}
            value={aliasValue}
            inputRef={inputRef}
            colortheme={colortheme}
          />
        )}
        {!editMode && (
          <ClickToCopyAddress
            className="account-address clickable-icon"
            onCopyAddress={onCopyAddress}
            address={address}
            style={{ color: colortheme.text.secondary }}
          />
        )}
      </div>
    );
  }
}

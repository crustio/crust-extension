import React, { Component } from 'react';
import CrustInput from '../../common/crust-input';
import CreateAccountAdvancedConfig from '../create-account-advanced-config';
import './styles.css';

export default class CreateAccountSettings extends Component {
  render() {
    const {
      alias,
      handleAliasChange,
      aliasPropName,
      aliasLabel,
      keypairType,
      keypairTypes,
      onKeypairTypeChange,
      isAliasError,
      aliasErrorMessage,
      aliasInputName,
      aliasRef,
      handleAliasOnBlur,
      disableAccountSettings,
      ...otherProps
    } = this.props;
    this.aliasRef = aliasRef;
    return (
      <div {...otherProps}>
        <CrustInput
          className="account-alias-input"
          onChange={handleAliasChange(aliasPropName)}
          placeholder={aliasLabel}
          value={alias}
        />
        {isAliasError ? (
          <span className="error-msg">{aliasErrorMessage}</span>
        ) : (
          <span className="place-holder"> </span>
        )}
        <CreateAccountAdvancedConfig
          keypairType={keypairType}
          keypairTypes={keypairTypes}
          onKeypairTypeChange={onKeypairTypeChange}
          className="create-account-advanced-config"
          disableAccountSettings={disableAccountSettings}
        />
      </div>
    );
  }
}

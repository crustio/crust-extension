import React, { Component } from 'react';
import CrustInput from '../../common/crust-input';
import CreateAccountAdvancedConfig from '../create-account-advanced-config';
import CrustPassword from '../../common/password/crust-password';
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
      aliasPassworkPropName,
      handlePasswordChange,
      passwordLabel,
      password,
      isPasswordError,
      passwordErrorMessage,
      colortheme,
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
          style={{ background: colortheme.card }}
          colortheme={colortheme}
        />
        {isAliasError ? (
          <span className="error-msg">{aliasErrorMessage}</span>
        ) : (
          <span className="place-holder"> </span>
        )}

        <CrustPassword
          className="account-password-input"
          onChange={handlePasswordChange}
          password={password}
          placeholder={passwordLabel}
          style={{ background: colortheme.card }}
          colortheme={colortheme}
        />
        {isPasswordError ? (
          <span className="error-msg">{passwordErrorMessage}</span>
        ) : (
          <span className="place-holder"> </span>
        )}

        <CreateAccountAdvancedConfig
          keypairType={keypairType}
          keypairTypes={keypairTypes}
          onKeypairTypeChange={onKeypairTypeChange}
          className="create-account-advanced-config"
          disableAccountSettings={disableAccountSettings}
          colortheme={colortheme}
        />
      </div>
    );
  }
}

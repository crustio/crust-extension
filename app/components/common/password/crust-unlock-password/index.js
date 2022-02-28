import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import PasswordAdornment from '../password-adornment';
import CrustInput from '../../crust-input';
import './styles.css';

const showColor = {
  color: '#666F83',
};

const hideColor = {
  color: '#666F83',
};

class CrustUnlockPassword extends Component {
  state = {
    showPassword: false,
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const {
      classes,
      children,
      onChange,
      isError,
      password,
      className,
      handleUnlock,
      errorText,
      colortheme,
      t,
      ...otherProps
    } = this.props;
    const { showPassword } = this.state;

    return (
      <div className={className} style={{ display: 'flex', flexDirection: 'column' }}>
        <CrustInput
          {...otherProps}
          className={className}
          error={isError}
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={onChange('password')}
          colortheme={colortheme}
          style={{ background: colortheme.card, border: `1px solid ${colortheme.border}` }}
          endAdornment={
            <PasswordAdornment
              position="end"
              onClick={this.handleClickShowPassword}
              showPassword={showPassword}
              showColor={showColor}
              hideColor={hideColor}
            />
          }
        />
        {isError ? (
          <div className="unlock-error-msg">{t(errorText)}</div>
        ) : (
          <div className="unlock-place-holder"> </div>
        )}
      </div>
    );
  }
}

export default withTranslation()(CrustUnlockPassword);

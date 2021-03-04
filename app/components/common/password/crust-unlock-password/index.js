import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import InputAdornment from '@material-ui/core/InputAdornment';
import CrustInput from '../../crust-input';
import ButtonSquare from '../../buttons/button-square';
import './styles.css';

class CrustUnlockPassword extends Component {
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
      t,
      ...otherProps
    } = this.props;
    return (
      <div className={className} style={{ display: 'flex', flexDirection: 'column' }}>
        <CrustInput
          {...otherProps}
          className={className}
          error={isError}
          type="password"
          value={password}
          onChange={onChange('password')}
          endAdornment={(
            <InputAdornment>
              <ButtonSquare iconName="forward" onClick={handleUnlock} />
            </InputAdornment>
          )}
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

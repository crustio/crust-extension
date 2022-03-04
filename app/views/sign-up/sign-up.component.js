import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import CrustPassword from '../../components/common/password/crust-password';
import CrustInput from '../../components/common/crust-input';
import PasswordAdornment from '../../components/common/password/password-adornment';
import ContentHeader from '../../components/common/content-header';
import FooterButton from '../../components/common/footer-button';
import LogoBig from '../../images/crust-logo-big.svg';
import { colortheme } from '../../../lib/constants/colors';
import { CRUST_NETWORK } from '../../../lib/constants/networks';
import './styles.css';

const errorMessage = 'Must be 8 characters or more in length.';
const requiredErrorMessage = 'Password required';
const showColor = {
  color: '#666F83',
};

const hideColor = {
  color: '#666F83',
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      isPasswordError: true,
      passwordError: '',
      showPassword: false,
      // password repeat
      passwordRepeat: '',
      isPasswordRepeatError: true,
      passwordRepeatError: '',
      // button status
      disabled: true,
    };
    this.passwordInput = React.createRef();
  }

  handleOnChange = prop => e => {
    const { value } = e.target;
    const {
      password,
      passwordRepeat,
      isWalletNameError,
      isPasswordError,
      isPasswordRepeatError,
    } = this.state;
    if (prop === 'walletName') {
      const isWalletNameErrorN = value.trim() === '';
      const valid = !isWalletNameErrorN && !isPasswordError && !isPasswordRepeatError;
      this.setState({
        [prop]: value,
        isWalletNameError: isWalletNameErrorN,
        // eslint-disable-next-line
        wallNameError: isWalletNameErrorN ? 'Wallet name cannot be empty' : '',
        disabled: !valid,
      });
    } else if (prop === 'password') {
      const isPasswordErrorN = value.length < 8;
      const isPasswordRepeatErrorN = passwordRepeat !== value;
      const valid = !isWalletNameError && !isPasswordErrorN && !isPasswordRepeatErrorN;
      this.setState({
        [prop]: value,
        isPasswordError: isPasswordErrorN,
        passwordError: isPasswordErrorN ? 'Must be 8 characters or more in length.' : '',
        isPasswordRepeatError: isPasswordRepeatErrorN,
        passwordRepeatError:
          passwordRepeat && isPasswordRepeatErrorN ? 'Passwords are not the same.' : '',
        disabled: !valid,
      });
    } else {
      const isPasswordRepeatErrorN = password !== value;
      const valid = !isWalletNameError && !isPasswordError && !isPasswordRepeatErrorN;
      this.setState({
        [prop]: value,
        isPasswordRepeatError: isPasswordRepeatErrorN,
        passwordRepeatError: isPasswordRepeatErrorN ? 'Passwords are not the same.' : '',
        disabled: !valid,
      });
    }
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleOnBlur = () => {
    const { password } = this.state;
    let { errorText } = this.state;
    let isError = false;
    if (password !== '') {
      this.passwordInput.focus();
    }
    if (password && password.length < 8) {
      isError = true;
      errorText = errorMessage;
    }
    // eslint-disable-next-line
    this.setState({ isError, errorText });
  };

  handleClick = () => {
    const { signUp } = this.props;
    const { password, type } = this.state;
    let { errorText } = this.state;
    let isError = false;
    if (password.length === 0) {
      isError = true;
      errorText = requiredErrorMessage;
    } else if (password.length < 8) {
      isError = true;
      errorText = errorMessage;
    } else {
      signUp(password, type);
    }
    // eslint-disable-next-line
    this.setState({ isError, errorText });
  };

  render() {
    const {
      isPasswordError,
      showPassword,
      password,
      passwordError,
      passwordRepeat,
      isPasswordRepeatError,
      passwordRepeatError,
    } = this.state;
    return (
      <div className="sign-up-container">
        <div className="sign-up-img-contianer">
          <img src={LogoBig} alt="logo1" />
        </div>
        <ContentHeader
          className="sign-up-content-header"
          title={this.props.t('Create A Password To Secure Your Account')}
          // eslint-disable-next-line
          description={this.props.t(
            "The password is used to protect your Enigma seed phrase(s) so that other Chrome extensions can't access them.",
          )}
        />
        <CrustPassword
          className="sign-up-password"
          onChange={e => this.handleOnChange('password', e)}
          password={password}
          placeholder={this.props.t('Password')}
          colortheme={colortheme[CRUST_NETWORK.value]}
          border
        />
        {isPasswordError ? (
          <span className="error-msg">{passwordError}</span>
        ) : (
          <span className="place-holder"> </span>
        )}
        <CrustInput
          className="sign-up-password"
          onChange={this.handleOnChange('passwordRepeat')}
          type={showPassword ? 'text' : 'password'}
          placeholder={this.props.t('Repeat Password')}
          value={passwordRepeat}
          colortheme={colortheme[CRUST_NETWORK.value]}
          style={{ border: `1px solid ${colortheme[CRUST_NETWORK.value].border}`, borderRadius: 8 }}
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
        {isPasswordRepeatError ? (
          <span className="error-msg">{passwordRepeatError}</span>
        ) : (
          <span className="place-holder"> </span>
        )}
        <FooterButton
          onClick={this.handleClick}
          disabled={this.state.disabled}
          name={this.props.t('Create')}
        />
      </div>
    );
  }
}

export default withTranslation()(SignUp);

SignUp.defaultProps = {
  signUp: undefined,
  setPasswordMeterScore: undefined,
  score: 0,
};

SignUp.propTypes = {
  signUp: PropTypes.func,
  // eslint-disable-next-line
  setPasswordMeterScore: PropTypes.func,
  // eslint-disable-next-line
  score: PropTypes.number,
};

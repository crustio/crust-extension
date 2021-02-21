import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CrustPassword from '../../components/common/password/crust-password';
import CrustInput from '../../components/common/crust-input';
import ContentHeader from '../../components/common/content-header';
import PasswordStrength from '../../components/common/password/password-strength';
import FooterButton from '../../components/common/footer-button';
import './styles.css';

const errorMessage = 'Must be 8 characters or more in length.';
const requiredErrorMessage = 'Password required';
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      isPasswordError: true,
      passwordError: '',
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
    this.setState({ isError, errorText });
  };

  render() {
    const { score } = this.props;
    const {
      isPasswordError,
      password,
      passwordError,

      passwordRepeat,
      isPasswordRepeatError,
      passwordRepeatError,
    } = this.state;
    return (
      <div className="sign-up-container">
        <ContentHeader
          className="sign-up-content-header"
          title="Create A Password To Secure Your Account"
          description="The password is used to protect your Enigma seed phrase(s) so that other Chrome extensions can't access them."
        />
        <CrustPassword
          className="sign-up-password"
          onChange={e => this.handleOnChange('password', e)}
          password={password}
          placeholder="Password"
          handleClickShowPassword={this.handleClickShowPassword}
        />
        {isPasswordError ? (
          <span className="error-msg">{passwordError}</span>
        ) : (
          <span className="place-holder"> </span>
        )}
        <CrustInput
          className="sign-up-password"
          onChange={this.handleOnChange('passwordRepeat')}
          type="password"
          placeholder="Repeat Password"
          value={passwordRepeat}
        />
        {isPasswordRepeatError ? (
          <span className="error-msg">{passwordRepeatError}</span>
        ) : (
          <span className="place-holder"> </span>
        )}
        <FooterButton onClick={this.handleClick} disabled={this.state.disabled} name="create" />
      </div>
    );
  }
}

SignUp.defaultProps = {
  signUp: undefined,
  setPasswordMeterScore: undefined,
  score: 0,
};

SignUp.propTypes = {
  signUp: PropTypes.func,
  setPasswordMeterScore: PropTypes.func,
  score: PropTypes.number,
};

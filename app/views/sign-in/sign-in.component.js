import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import CrustUnlockPassword from '../../components/common/password/crust-unlock-password';
import FontRegular from '../../components/common/fonts/font-regular';
import FooterButton from '../../components/common/footer-button';
import LogoBig from '../../images/crust-logo-big.svg';
import './styles.css';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      isError: false,
      errorText: '',
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.error) {
      return {
        isError: true,
        errorText: props.error.message,
      };
    }
    return state;
  }

  componentDidUpdate() {
    if (this.props.success) {
      this.props.onBoard();
    }
  }

  handleOnChange = prop => e => {
    const { value } = e.target;
    this.setState({
      [prop]: value,
    });
  };

  handleClick = () => {
    const { unlockCrust } = this.props;
    const { password } = this.state;
    unlockCrust(password);
  };

  render() {
    const { isError, password, errorText } = this.state;
    const { t } = this.props;
    return (
      <div>
        <div
          className="sign-in-container"
          onKeyPress={e => {
            if (e.key === 'Enter') {
              this.handleClick();
            }
          }}
        >
          <div className="sign-in-img-contianer">
            <img src={LogoBig} alt="logo2" />
          </div>
          <FontRegular className="sign-in-title" text="Web 3.0 Storage for Metaverse" />
          <div className="sign-in-container-password">
            <CrustUnlockPassword
              isError={isError}
              errorText={errorText}
              className="sign-in-password-container"
              onChange={this.handleOnChange}
              password={password}
              placeholder={t('Password')}
              handleUnlock={this.handleClick}
            />
          </div>

          {/* {isError ? (
            <span className="error-msg">{t(errorText)}</span>
          ) : (
            <span className="place-holder"> </span>
          )} */}
          <FooterButton onClick={this.handleClick} name={t('Unlock')} custom />
        </div>
      </div>
    );
  }
}

export default withTranslation()(SignIn);

SignIn.defaultProps = {
  unlockCrust: undefined,
};

SignIn.propTypes = {
  unlockCrust: PropTypes.func,
};

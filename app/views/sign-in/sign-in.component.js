import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import CrustPassword from '../../components/common/password/crust-password';
import ContentHeader from '../../components/common/content-header';
import FooterButton from '../../components/common/footer-button';
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
      return { isError: true, errorText: props.error.message };
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
        <div className="sign-in-container">
          <ContentHeader
            title={t('Enter Password')}
            // eslint-disable-next-line
            description={t("The password is used to protect your Enigma seed phrase(s) so that other Chrome extensions can't access them.")}
          />
          <div className="sign-in-container-password">
            <CrustPassword
              // eslint-disable-next-line
              standardInput={true}
              className="sign-in-password-container"
              onChange={this.handleOnChange}
              password={password}
              placeholder={t('Password')}
            />
          </div>

          {isError ? (
            <span className="error-msg">{t(errorText)}</span>
          ) : (
            <span className="place-holder"> </span>
          )}
          <FooterButton onClick={this.handleClick} name={t('Unlock')} />
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

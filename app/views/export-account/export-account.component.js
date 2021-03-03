import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import CrustPassword from '../../components/common/password/crust-password';
import FooterButton from '../../components/common/footer-button';
import * as Account from '../../api/account';
import './styles.css';

class ExportAccout extends Component {
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

  componentDidUpdate() {}

  handleOnChange = prop => e => {
    const { value } = e.target;
    this.setState({
      [prop]: value,
    });
  };

  handleClick = () => {
    Account.exportAccount(this.props.address);
  };

  render() {
    const { isError, password, errorText } = this.state;
    const { t, address } = this.props;
    return (
      <div>
        <div className="sign-in-container">
          <div>{address}</div>
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

export default withTranslation()(ExportAccout);

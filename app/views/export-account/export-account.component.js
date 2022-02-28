import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { saveAs } from 'file-saver';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CrustPassword from '../../components/common/password/crust-password';
import AccountInfo from '../../components/account/account-info';
import * as Account from '../../api/account';
import './styles.css';
import FontRegular from '../../components/common/fonts/font-regular';
import FooterWithTwoButton from '../../components/common/footer-with-two-button';
import { DASHBOARD_PAGE, MANAGE_ACCOUNT_PAGE } from '../../constants/navigation';
import { BACK_BUTTON_TEXT, TO_CONFIRM_BUTTON_TEXT } from '../../constants/account';
import { colortheme } from '../../../lib/constants/colors';

class ExportAccout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
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

  handelBack = () => {
    this.props.changePage(MANAGE_ACCOUNT_PAGE);
    this.props.updateBackupPage(DASHBOARD_PAGE);
  };

  handleClick = () => {
    this.props.updateAppLoading(true);
    const { password } = this.state;
    if (!password || password.trim() === '') {
      this.setState({
        errorText: 'Password is required.',
      });
      this.props.updateAppLoading(false);
      return;
    }

    setTimeout(async () => {
      await this.props.selectedAccounts.map((account, index) => {
        Account.exportAccount(account.address, password)
          .then(json => {
            const blob = new Blob([json.result.exportedJson], {
              type: 'application/json; charset=utf-8',
            });
            saveAs(blob, `${account.address}.json`);
            this.props.updateAppLoading(false);
            this.props.changePage(MANAGE_ACCOUNT_PAGE);
          })
          .catch(() => {
            this.props.updateAppLoading(false);
            this.setState({
              errorText: 'Password is incorrect.',
            });
          });
      });
    }, 0);
  };

  render() {
    const { password, errorText } = this.state;
    const { t, selectedAccounts, network } = this.props;
    const theme = 'substrate';
    return (
      <div className="export-account-container">
        <div className="export-account-content-container">
          <AccountInfo account={selectedAccounts[0]} theme={theme} />
          <div className="export-account-tip-container">
            <InfoOutlinedIcon className="export-account-info-icon" />
            <FontRegular
              className="export-account-info-text"
              text={t(
                'You are exporting your account. Keep it safe and don’t share it with anyone.',
              )}
            />
          </div>
          <CrustPassword
            className="export-account-password"
            onChange={this.handleOnChange}
            password={password}
            placeholder={t('Password')}
            colortheme={colortheme[network.value]}
          />
          <FontRegular
            className="export-account-info-text export-account-margin"
            text={t('The password for the wallet.')}
          />
          {errorText !== '' && <span className="error-msg">{t(errorText)}</span>}
        </div>

        <FooterWithTwoButton
          onNextClick={this.handleClick}
          onBackClick={this.handelBack}
          backButtonName={t(BACK_BUTTON_TEXT)}
          nextButtonName={t(TO_CONFIRM_BUTTON_TEXT)}
        />
      </div>
    );
  }
}

export default withTranslation()(ExportAccout);

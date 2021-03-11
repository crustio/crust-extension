import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import ReactTooltip from 'react-tooltip';
import FileInput from 'react-simple-file-input';
import FontRegular from '../../components/common/fonts/font-regular';
import CrustPassword from '../../components/common/password/crust-password';
import * as Account from '../../constants/account';
import FooterWithTwoButton from '../../components/common/footer-with-two-button';
import { shortenFilename } from '../../services/wallet-service';
import './styles.css';

class ImportJson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonPwd: '',
      walletPwd: '',
      filename: '',
      file: '',
      fileError: '',
    };
  }

  componentDidMount() {
    this.props.updateJsonPwdError('');
    this.props.updateWalletPwdError('');
  }

  handleOnChange = prop => e => {
    const { value } = e.target;
    const { jsonPwdError, walletPwdError } = this.props;

    if (jsonPwdError !== '') {
      this.props.updateJsonPwdError('');
    }

    if (walletPwdError !== '') {
      this.props.updateWalletPwdError('');
    }

    this.setState({
      [prop]: value,
    });
  };

  handelBack = () => {
    this.props.changePage(this.props.backupPage);
  };

  handleClick = () => {
    const { jsonPwd, walletPwd, file } = this.state;
    const { updateJsonPwdError, updateWalletPwdError, t } = this.props;

    if (!file || file.trim() === '') {
      this.setState({
        fileError: t('Json File is required'),
      });
      return;
    }

    if (!jsonPwd || jsonPwd.trim() === '') {
      updateJsonPwdError(t('Password is required.'));
      return;
    }

    if (!walletPwd || walletPwd.trim() === '') {
      updateWalletPwdError(t('Password is required.'));
      return;
    }

    this.props.createAccountWithJson(file, jsonPwd, walletPwd);
  };

  onLoad = (event, file) => {
    this.setState({
      filename: file.name,
      file: event.target.result,
      fileError: '',
    });
  };

  render() {
    const { t, jsonPwdError, walletPwdError } = this.props;
    const {
      filename, jsonPwd, walletPwd, fileError
    } = this.state;
    const filenameShow = filename && filename.length > 18 ? shortenFilename(filename) : filename;
    return (
      <div className="import-json-container">
        <div className="import-json-content-container">
          <label className="import-json-label" htmlFor="file">
            <FileInput
              id="file"
              readAs="text"
              onLoad={this.onLoad.bind(this)}
              style={{
                display: 'none',
              }}
              accept="application/json"
            />
            <div className="import-json-select-container">
              <div className="import-json-file-container">{t('Choose File')}</div>
              <div data-tip={filename || t('No file chosen')} className="import-json-filename">
                {filenameShow || t('No file chosen')}
              </div>
              <ReactTooltip effect="solid" place="bottom" className="import-json-tooltip" />
            </div>
          </label>
          {fileError !== '' ? (
            <div className="json-file-error-msg">{fileError}</div>
          ) : (
            <div className="json-file-place-holder"> </div>
          )}
          <FontRegular
            className="import-json-text import-json-text-margin1"
            text={`${t('Enter the password previously used to encrypt this account')}:`}
          />
          <CrustPassword
            className="import-json-password"
            onChange={e => this.handleOnChange('jsonPwd', e)}
            password={jsonPwd}
            placeholder={t('Password')}
          />
          {jsonPwdError !== '' ? (
            <div className="error-msg">{t(jsonPwdError)}</div>
          ) : (
            <div className="place-holder"> </div>
          )}
          <FontRegular
            className="import-json-text import-json-text-margin1"
            text={`${t('Enter the password for this wallet')}:`}
          />
          <CrustPassword
            className="import-json-password"
            onChange={e => this.handleOnChange('walletPwd', e)}
            password={walletPwd}
            placeholder={t('Password')}
          />
          <FontRegular
            className="import-json-text import-json-text-margin2 json-file-text-color"
            text={`${t('The JSON file will be re-encripted by this password')}`}
          />
          {walletPwdError !== '' ? (
            <div className="error-msg">{t(walletPwdError)}</div>
          ) : (
            <div className="place-holder"> </div>
          )}
        </div>
        <FooterWithTwoButton
          onNextClick={this.handleClick}
          onBackClick={this.handelBack}
          backButtonName={t(Account.BACK_BUTTON_TEXT)}
          nextButtonName={t(Account.TO_CONFIRM_BUTTON_TEXT)}
        />
      </div>
    );
  }
}

export default withTranslation()(ImportJson);

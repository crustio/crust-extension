import React, { Component } from 'react';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { withTranslation } from 'react-i18next';
import ReactTooltip from 'react-tooltip';
import FileInput from 'react-simple-file-input';
import SubHeader from '../../components/common/sub-header';
import FontRegular from '../../components/common/fonts/font-regular';
import CrustPassword from '../../components/common/password/crust-password';
import FooterButton from '../../components/common/footer-button';
import { shortenFilename } from '../../services/wallet-service';
import { CHINESE } from '../../constants/language';
import { colortheme } from '../../../lib/constants/colors';
import './styles.css';
import { CREATE_ACCOUNT_ENTRY_PAGE, MANAGE_ACCOUNT_PAGE } from '../../constants/navigation';

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
    this.props.updateBackupPage(this.props.page);
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

  handleBack = () => {
    const { account } = this.props;
    if (account) {
      this.props.changePage(MANAGE_ACCOUNT_PAGE);
    } else {
      this.props.changePage(CREATE_ACCOUNT_ENTRY_PAGE);
    }
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

    this.props.createAccountWithJson(file, jsonPwd, walletPwd, t);
  };

  onLoad = (event, file) => {
    this.setState({
      filename: file.name,
      file: event.target.result,
      fileError: '',
    });
  };

  render() {
    const {
      t, jsonPwdError, walletPwdError, language, network
    } = this.props;
    const {
      filename, jsonPwd, walletPwd, fileError
    } = this.state;
    const filenameShow = filename && filename.length > 18 ? shortenFilename(filename) : filename;
    return (
      <div
        className="import-json-container"
        style={{ background: colortheme[network.value].background }}
      >
        <SubHeader
          icon={<ArrowBackIosOutlinedIcon style={{ color: '#858B9C', fontSize: '14px' }} />}
          title={t('Import From Json')}
          backBtnOnClick={this.handleBack}
          subMenu={null}
          showSettings={false}
          onSubMenuOptionsChange={null}
          isBackIcon
          colortheme={colortheme[network.value]}
        />
        <div
          className="import-json-content-container"
          style={{ background: colortheme[network.value].background }}
        >
          <div className="import-json-select-container">
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
              <div
                className="import-json-file-container"
                style={{
                  backgroundColor: colortheme[network.value].card,
                  color: colortheme[network.value].text.tertiary,
                }}
              >
                <p>{filenameShow || t('No file chosen')}</p>
                <InsertDriveFileIcon
                  style={{ fontSize: 16, color: colortheme[network.value].text.tertiary }}
                />
              </div>
            </label>
          </div>
          <ReactTooltip effect="solid" place="bottom" className="import-json-tooltip" />
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
            colortheme={colortheme[network.value]}
            style={{
              borderRadius: 12,
              background: colortheme[network.value].card,
              '&::placeholder': { color: colortheme[network.value].text.tertiary },
            }}
          />
          {jsonPwdError !== '' ? (
            <div className="error-msg">{t(jsonPwdError)}</div>
          ) : (
            <div className="place-holder"> </div>
          )}
          {language === CHINESE ? (
            <div className="import-json-row">
              <FontRegular className="import-json-text import-json-text-margin1" text="请输入" />
              <FontRegular className="import-json-text1" text="此钱包" />
              <FontRegular className="import-json-text import-json-text-margin1" text="的密码:" />
            </div>
          ) : (
            <div className="import-json-row">
              <FontRegular
                className="import-json-text import-json-text-margin1"
                text="Enter the password for"
              />
              <FontRegular className="import-json-text2" text="the wallet" />
              <FontRegular className="import-json-text import-json-text-margin1" text=":" />
            </div>
          )}
          <CrustPassword
            className="import-json-password"
            onChange={e => this.handleOnChange('walletPwd', e)}
            password={walletPwd}
            placeholder={t('Password')}
            colortheme={colortheme[network.value]}
            style={{
              borderRadius: 12,
              background: colortheme[network.value].card,
              '&::placeholder': { color: colortheme[network.value].text.tertiary },
            }}
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
        <FooterButton name={t('Next')} onClick={this.handleClick} />
      </div>
    );
  }
}

export default withTranslation()(ImportJson);

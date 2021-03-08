import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import CrustValidator from '../../utils/crust-validator';
import validator from '../../utils/crust-validator/validator';
import CreateAccountForm from '../../components/account/create-account-form';
import CreateAccountSettings from '../../components/account/create-account-settings';
import FooterWithTwoButton from '../../components/common/footer-with-two-button';
import * as Account from '../../constants/account';
import './styles.css';
import AlertDailog from '../../components/common/alert-dialog';

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: Account.CREATE_ACCOUNT,
      buttonName: Account.TO_CONFIRM_BUTTON_TEXT,
      backButtonName: Account.BACK_BUTTON_TEXT,
      onSubmit: this.handleNext,
      importedSeedPhrase: '',
      confirmSeedPhrase: '',
      isError: false,
      errorMessage: null,
      alias: '',
      disableAccountSettings: false,
      isAliasError: false,
      aliasErrorMessage: null,
      importSeedPhraseInputName: 'importedSeedPhrase',
      confirmSeedPhraseInputName: 'confirmSeedPhrase',
      aliasInputName: 'alias',
      password: '',
      isOpen: false,
      disabled: true,
    };
    this.validator = new CrustValidator(validator.importSeedPhraseValidation);
    this.aliasValidator = new CrustValidator(validator.aliasValidation);
    this.aliasInput = React.createRef();
    this.seedInput = React.createRef();
    this.confirmSeedInput = React.createRef();
  }

  componentDidMount() {
    const { aliasError, resetImportAccountWithSeedPhraseError } = this.props;
    if (aliasError) {
      resetImportAccountWithSeedPhraseError();
      this.setState({
        isAliasError: false,
        aliasErrorMessage: null,
      });
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.error) {
      return {
        isError: true,
        errorMessage: props.error.message,
        isAliasError: false,
        aliasErrorMessage: '',
      };
    }
    if (props.aliasError) {
      return {
        isAliasError: true,
        aliasErrorMessage: 'Duplicate alias.',
        isError: false,
        errorMessage: '',
      };
    }
    return state;
  }

  handleChange = (e, value) => {
    let {
      buttonName, formValue, onSubmit, disableAccountSettings
    } = this.state;
    if (value === Account.CREATE_ACCOUNT) {
      buttonName = Account.TO_CONFIRM_BUTTON_TEXT;
      onSubmit = this.handleNext;
      formValue = Account.CREATE_ACCOUNT;
      disableAccountSettings = false;
    }
    if (value === Account.IMPORT_ACCOUNT) {
      buttonName = Account.IMPORT_BUTTON_TEXT;
      onSubmit = this.handleImportSeedWordClick;
      formValue = Account.IMPORT_ACCOUNT;
      disableAccountSettings = false;
    }
    this.setState({
      buttonName,
      formValue,
      onSubmit,
      disableAccountSettings,
    });
  };

  handleImportSeedWordsChange = prop => e => {
    let { value } = e.target;
    let { isError, errorMessage } = this.state;
    const { error, resetImportAccountWithSeedPhraseError } = this.props;
    value = value.trim().replace(/\n/g, ' ');
    if (error) {
      resetImportAccountWithSeedPhraseError();
    }
    if (value === '') {
      isError = false;
      errorMessage = null;
    }
    this.setState({
      [prop]: value,
      isError,
      errorMessage,
    });
  };

  handleAliasChange = prop => e => {
    const { value } = e.target;

    this.setState({
      [prop]: value,
      disabled: value.trim().replace(/\n/g, ' ') === '',
    });
  };

  handlePasswordChange = prop => e => {
    const { value } = e.target;
    this.setState({
      [prop]: value,
      disabled: value.trim().replace(/\n/g, ' ') === '',
    });
  };

  handleSeedWordImportOnMount = () => {
    this.setState({
      importedSeedPhrase: '',
    });
  };

  handelBack = () => {
    const { backupPage } = this.props;
    this.props.changePage(backupPage);
  };

  handleCloseDialog = () => {
    this.setState({
      isOpen: false,
    });
  };

  handleYes = () => {
    this.setState({
      isOpen: false,
    });
    const { alias, password } = this.state;
    const { seedWords } = this.props;
    this.props.createFirstAccountWithSeedPhrase(seedWords, alias, password);
  };

  handelConfirm = () => {
    this.setState({
      isOpen: true,
    });
  };

  handleNext = () => {
    const { alias } = this.state;
    const { isAliasError, aliasErrorMessage } = this.validateAlias(alias);
    if (isAliasError) {
      this.aliasInput.focus();
    } else {
      this.handelConfirm();
    }
    this.setState({ isAliasError, aliasErrorMessage, alias });
  };

  handleImportSeedWordClick = () => {
    const { alias, importedSeedPhrase } = this.state;
    const { isAliasError, aliasErrorMessage } = this.validateAlias(alias);
    const { isError, errorMessage } = this.validateSeedPhrase(importedSeedPhrase);
    if (!isError && !isAliasError) {
      this.props.createFirstAccountWithSeedPhrase(
        this.state.importedSeedPhrase,
        this.state.alias,
        this.state.password,
      );
    } else if (isError) {
      this.seedInput.focus();
    } else if (alias !== '' && isAliasError) {
      this.aliasInput.focus();
    }
    this.setState({
      isAliasError,
      aliasErrorMessage,
      isError,
      errorMessage,
    });
  };

  onKeypairTypeChange = e => {
    this.props.setKeypairType(e.target.value);
  };

  handleAliasOnBlur = () => {
    const { isAliasError, aliasErrorMessage } = this.validateAlias(this.state.alias);
    if (this.state.alias === '' || !isAliasError) {
      this.setState({
        isAliasError,
        aliasErrorMessage,
      });
    }
  };

  handleSeedWordsOnBlur = () => {
    const { isError, errorMessage } = this.validateSeedPhrase(this.state.importedSeedPhrase);
    if (this.state.importedSeedPhrase === '' || !isError) {
      this.setState({ isError, errorMessage });
    }
  };

  handleConfirmSeedWordsOnBlur = () => {
    const { isError, errorMessage } = this.validateSeedPhrase(this.state.confirmSeedPhrase);
    if (this.state.confirmSeedPhrase === '' || !isError) {
      this.setState({ isError, errorMessage });
    }
  };

  validateAlias(alias) {
    let { isAliasError, aliasErrorMessage } = this.state;
    if (alias !== '') {
      const aliasValidation = this.aliasValidator.validate({
        alias,
      });
      if (!aliasValidation.isValid) {
        isAliasError = true;
        aliasErrorMessage = aliasValidation.alias.message;
      } else {
        isAliasError = false;
        aliasErrorMessage = null;
      }
    } else {
      isAliasError = false;
      aliasErrorMessage = null;
    }
    return {
      isAliasError,
      aliasErrorMessage,
    };
  }

  validateSeedPhrase(importedSeedPhrase) {
    let { isError, errorMessage } = this.state;
    const validation = this.validator.validate({
      seedPhrase: importedSeedPhrase,
    });
    if (!validation.isValid) {
      isError = true;
      errorMessage = validation.seedPhrase.message;
    } else {
      isError = false;
      errorMessage = null;
    }

    return {
      isError,
      errorMessage,
    };
  }

  render() {
    const {
      seedWords, keypairType, keypairTypes, t
    } = this.props;
    const {
      formValue,
      buttonName,
      onSubmit,
      importedSeedPhrase,
      confirmSeedPhrase,
      isError,
      errorMessage,
      isAliasError,
      aliasErrorMessage,
      alias,
      password,
      disableAccountSettings,
      importSeedPhraseInputName,
      confirmSeedPhraseInputName,
      aliasInputName,
      backButtonName,
    } = this.state;

    return (
      <div>
        <CreateAccountForm
          value={formValue}
          generatedSeedWords={seedWords}
          importedSeedWords={importedSeedPhrase}
          confirmedSeedWords={confirmSeedPhrase}
          onChange={this.handleImportSeedWordsChange}
          isError={isError}
          errorMessage={errorMessage}
          handleSeedWordImportOnMount={this.handleSeedWordImportOnMount}
          importSeedPhraseInputName={importSeedPhraseInputName}
          confirmSeedPhraseInputName={confirmSeedPhraseInputName}
          alias={alias}
          seedRef={input => {
            this.seedInput = input;
          }}
          confirmSeedRef={input => {
            this.confirmSeedInput = input;
          }}
          handleSeedWordsOnBlur={this.handleSeedWordsOnBlur}
          handleConfirmSeedWordsOnBlur={this.handleConfirmSeedWordsOnBlur}
          className="create-account-form"
        />
        <CreateAccountSettings
          disableAccountSettings={disableAccountSettings}
          alias={alias}
          handleAliasChange={this.handleAliasChange}
          aliasPropName="alias"
          aliasLabel={t('Nickname')}
          isAliasError={isAliasError}
          aliasErrorMessage={t(aliasErrorMessage)}
          keypairType={keypairType}
          keypairTypes={keypairTypes}
          onKeypairTypeChange={this.onKeypairTypeChange}
          aliasInputName={aliasInputName}
          aliasRef={input => {
            this.aliasInput = input;
          }}
          handleAliasOnBlur={this.handleAliasOnBlur}
          handlePasswordChange={this.handlePasswordChange}
          aliasPassworkPropName="passoword"
          passwordLabel={t('Password')}
          password={password}
          isPasswordError={isError}
          passwordErrorMessage={t(errorMessage)}
          className="create-account-settings"
        />
        <FooterWithTwoButton
          onNextClick={onSubmit}
          onBackClick={this.handelBack}
          backButtonName={t(backButtonName)}
          nextButtonName={t(buttonName)}
          disableYesBtn={this.state.disabled}
        />
        <AlertDailog
          isOpen={this.state.isOpen}
          handleClose={this.handleCloseDialog}
          handleYes={this.handleYes}
          noText={t('Go Back')}
          yesText={t('Next')}
          importVaultFileName={
            <ErrorOutlineOutlinedIcon style={{ color: '#858B9C', fontSize: '60px' }} />
          }
          msg={t('make sure you have saved the seed phrase')}
        />
      </div>
    );
  }
}

export default withTranslation()(CreateAccount);

CreateAccount.defaultProps = {
  seedWords: '',
  createFirstAccountWithSeedPhrase: undefined,
  error: null,
  resetImportAccountWithSeedPhraseError: undefined,
};

CreateAccount.propTypes = {
  createFirstAccountWithSeedPhrase: PropTypes.func,
  error: PropTypes.string,
  resetImportAccountWithSeedPhraseError: PropTypes.func,
  seedWords: PropTypes.string,
};

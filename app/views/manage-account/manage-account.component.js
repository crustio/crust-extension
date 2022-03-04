import React, { Component } from 'react';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import { withTranslation } from 'react-i18next';
import SubHeader from '../../components/common/sub-header';
import {
  CREATE_ACCOUNT_ENTRY_PAGE,
  CREATE_ACCOUNT_PAGE,
  DASHBOARD_PAGE,
  EXPORT_ACCOUNT_PAGE,
  IMPORT_JSON_PAGE,
  IMPORT_PHRASE_PAGE,
  MANAGE_ACCOUNT_PAGE,
} from '../../constants/navigation';
import { copyAccountMessage } from '../../../lib/services/static-message-factory-service';
import AccountList from '../../components/account-list';
import SettingsList from '../../components/settings-list';
import DraggableDialog from '../../components/common/confirm-dialog';
import {
  ACCOUNT_MANAGEMENT_MENU_OPTIONS,
  ACCOUNT_MANAGEMENT_OPTIONS,
  ADD_ACCOUNT,
  EXPORT_ACCOUNT,
  IMPORT_JSON,
  IMPORT_PHRASE,
  REMOVE,
  OPTIONS as AccountOptions,
} from '../../constants/options';
import CrustTabs from '../../components/common/crust-tabs';
import FooterWithTwoButton from '../../components/common/footer-with-two-button';
import { ENGLISH } from '../../constants/language';
import { colortheme } from '../../../lib/constants/colors';
import './styles.css';
import ModalWithThreeButton from '../../components/common/modal-with-three-button';

class ManageAccount extends Component {
  constructor(props) {
    super(props);
    const { t, selectedAccounts } = this.props;
    this.textInput = React.createRef();
    this.state = {
      isOpen: false,
      labels: [t('My Account'), t('Settings')],
      allowUpdate: true,
      showFooterModal: false,
      selectedAccountList: selectedAccounts,
    };
  }

  componentDidMount() {
    this.props.updateBackupPage(MANAGE_ACCOUNT_PAGE);
  }

  componentDidUpdate() {}

  handleSubheaderBackBtn = () => {
    this.props.changePage(DASHBOARD_PAGE);
  };

  handleOpenImportModal = () => {
    this.setState({ showFooterModal: true });
  };

  handleCancelImportModal = () => {
    this.setState({ showFooterModal: false });
  };

  onCopy = () => {
    const { t } = this.props;
    this.props.createToast({ message: t(copyAccountMessage()), type: 'info' });
  };

  handleAddAccount = async () => {
    await this.props.addAccount();
    this.props.changePage(CREATE_ACCOUNT_PAGE);
  };

  handleChangeAccount = async (e, account) => {
    const { t } = this.props;
    if (e.target.tagName === 'DIV') {
      this.props.createToast({ message: t(copyAccountMessage()), type: 'info' });
    } else {
      await this.props.changeAccount(account, t);
      this.props.changePage(DASHBOARD_PAGE);
    }
  };

  handleOnSubMenuOptionsChange = async option => {
    this.props.updateBackupPage(this.props.page);
    if (option.value === ADD_ACCOUNT.value) {
      this.handleAddAccount();
    } else if (option.value === IMPORT_PHRASE.value) {
      await this.props.resetSeedWordsBeforeImport();
      this.props.changePage(CREATE_ACCOUNT_PAGE);
    } else if (option.value === IMPORT_JSON.value) {
      this.props.changePage(IMPORT_JSON.value);
    }
  };

  handleAccountMenuOptionsChange = async (option, account) => {
    if (option.value === REMOVE.value) {
      this.setState({ isOpen: true });
    } else if (option.value === EXPORT_ACCOUNT.value) {
      this.props.updateExportingAccount(account);
      this.props.changePage(EXPORT_ACCOUNT_PAGE);
    }
  };

  handleExportAccount = () => {
    const { account } = this.props;
    this.props.updateExportingAccount(account);
    this.props.changePage(EXPORT_ACCOUNT_PAGE);
  };

  handleCloseDialog = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  handleYes = () => {
    const {
      removeAccount, selectedAccounts, accounts, t
    } = this.props;
    for (let i = 0; i < selectedAccounts.length; i++) {
      console.log(selectedAccounts[i], i);
      removeAccount(selectedAccounts[i], t);
    }
    this.props.updateSelectedAccounts([]);
    //    removeAccount(account, t);
    this.setState({ isOpen: false, selectedAccountList: [] });
    if (accounts.length === selectedAccounts.length) {
      this.props.changePage(CREATE_ACCOUNT_ENTRY_PAGE);
    }
  };

  handleTabChange = (e, value) => {
    this.props.updateCurrentTab(value);
  };

  handleSelectedAccountsChange = (e, account) => {
    const { selectedAccounts } = this.props;
    const selectedAccountList = selectedAccounts;
    const index = selectedAccountList.findIndex(e => e.address === account.address);
    if (index !== -1) {
      selectedAccountList.splice(index, 1);
    } else {
      selectedAccountList.push(account);
    }
    this.props.updateSelectedAccounts(selectedAccountList);
    this.setState({
      selectedAccountList,
    });
  };

  handleAddAccount = async () => {
    await this.props.addAccount();
    this.props.changePage(CREATE_ACCOUNT_PAGE);
  };

  handleImportJson = async () => {
    await this.props.changePage(IMPORT_JSON_PAGE);
  };

  handleImportPhrase = async () => {
    await this.props.resetSeedWordsBeforeImport();
    await this.props.changePage(IMPORT_PHRASE_PAGE);
  };

  handleOptionsChange = (e, option) => {
    if (option.value === 'network_mode') {
      this.props.updateAppLoading(true);
      this.setState({ allowUpdate: false });
      this.props.setNetworkMode(!this.props.isOfflineMode);
      setTimeout(() => {
        this.props.updateAppLoading(false);
        this.setState({ allowUpdate: true });
      }, 1000);
    } else if (option.value === 'lock') {
      this.props.lockApp();
    } else if (option.value === 'get_cru') {
      window.open('https://swap.crustapps.net/');
    } else {
      this.props.updateBackupPage(this.props.page);
      this.props.changePage(option.value);
    }
  };

  render() {
    const {
      accounts,
      account,
      t,
      language,
      isOfflineMode,
      currentTab,
      network,
      selectedAccounts,
    } = this.props;
    const {
      isOpen, labels, allowUpdate, showFooterModal, selectedAccountList
    } = this.state;
    const theme = 'substrate';
    const options = accounts.length > 1
      ? ACCOUNT_MANAGEMENT_OPTIONS.map(o => ({ ...o, text: t(o.text) }))
      : ACCOUNT_MANAGEMENT_OPTIONS.filter(o => o.value !== REMOVE.value).map(o => ({
        ...o,
        text: o.text,
      }));
    const tLabels = labels.map(l => t(l));
    // eslint-disable-next-line no-restricted-syntax
    for (const option of AccountOptions) {
      if (option.value === 'network_mode') {
        option.text = isOfflineMode ? 'Set To Online Mode' : 'Set to Signer Mode';
      }
    }

    return (
      <div
        className="manage-accounts-root-container"
        style={{ background: colortheme[network.value].background }}
      >
        <SubHeader
          icon={<ArrowBackIosOutlinedIcon style={{ color: '#858B9C', fontSize: '14px' }} />}
          title={t('Account')}
          backBtnOnClick={this.handleSubheaderBackBtn}
          subMenu={ACCOUNT_MANAGEMENT_MENU_OPTIONS}
          showSettings
          onSubMenuOptionsChange={this.handleOnSubMenuOptionsChange}
          menuWidth={language === ENGLISH ? 150 : undefined}
          isBackIcon
          colortheme={colortheme[network.value]}
        />
        <>
          <CrustTabs
            value={currentTab}
            onChange={this.handleTabChange}
            labels={tLabels}
            parent="account"
            style={{ background: colortheme[network.value].card }}
            network={network}
          />
          {currentTab === 0 && (
            <div className="manage-accounts">
              <div className="manage-accounts-container">
                {accounts.length > 0 ? (
                  <AccountList
                    className="accounts-container"
                    accounts={accounts}
                    selectedAccounts={selectedAccounts}
                    currentAccount={account}
                    theme={theme}
                    onCopyAddress={this.onCopyAddress}
                    handleChangeAccount={this.handleChangeAccount}
                    colortheme={colortheme[network.value]}
                    network={network}
                    updateSelectedAccounts={this.handleSelectedAccountsChange}
                  />
                ) : null}
                <div>
                  <DraggableDialog
                    isOpen={isOpen}
                    handleClose={this.handleCloseDialog}
                    handleYes={this.handleYes}
                    noText={t('No')}
                    yesText={t('Yes')}
                    title={t('Remove accounts')}
                    msg={t(
                      'Please make sure you have saved the seed phrase or private key for this account before continuing.',
                    )}
                  />
                </div>
              </div>
            </div>
          )}
          {currentTab === 1 && (
            <div className="manage-accounts">
              <div className="manage-accounts-container">
                {accounts.length > 0 ? (
                  <SettingsList
                    className="accounts-container"
                    options={AccountOptions}
                    onOptionsChange={allowUpdate ? this.handleOptionsChange : null}
                    colortheme={colortheme[network.value]}
                  />
                ) : null}
              </div>
            </div>
          )}
        </>
        {currentTab === 0 && selectedAccountList.length === 0 && (
          <FooterWithTwoButton
            onNextClick={this.handleAddAccount}
            onBackClick={this.handleOpenImportModal} //Currently we need to clear import method.
            backButtonName={t('Import Account')}
            nextButtonName={t('Create Account')}
            nextColor={colortheme[network.value].button.primary.text}
            nextBackground={colortheme[network.value].button.primary.main}
            backColor={colortheme[network.value].button.secondary.text}
            backBackground={colortheme[network.value].button.secondary.main}
          />
        )}
        {currentTab === 0 && selectedAccountList.length !== 0 && (
          <FooterWithTwoButton
            onNextClick={this.handleExportAccount}
            onBackClick={() => this.setState({ isOpen: true })}
            backButtonName={t('Remove')}
            nextButtonName={t('Export Account')}
            nextColor={colortheme[network.value].button.primary.text}
            nextBackground={colortheme[network.value].button.primary.main}
            backColor={colortheme[network.value].button.secondary.text}
            backBackground={colortheme[network.value].button.secondary.main}
          />
        )}
        <ModalWithThreeButton
          show={showFooterModal}
          colortheme={colortheme[network.value]}
          handleTopClick={this.handleImportJson}
          handleBottomClick={this.handleImportPhrase}
          handleCancel={this.handleCancelImportModal}
          topButton={t('Import From Json')}
          bottomButton={t('Import From Phrase')}
          network={network}
        />
      </div>
    );
  }
}

export default withTranslation()(ManageAccount);

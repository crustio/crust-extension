import React, { Component } from 'react';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import { withTranslation } from 'react-i18next';
import SubHeader from '../../components/common/sub-header';
import {
  CREATE_ACCOUNT_PAGE,
  DASHBOARD_PAGE,
  EXPORT_ACCOUNT_PAGE,
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
import { colorTheme } from '../../../lib/constants/colors';
import './styles.css';

class ManageAccount extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      isOpen: false,
      labels: ['My Account', 'Settings'],
      allowUpdate: true,
    };
  }

  componentDidMount() {
    this.props.updateBackupPage(DASHBOARD_PAGE);
  }

  handleSubheaderBackBtn = () => {
    this.props.changePage(DASHBOARD_PAGE);
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
      this.setState({ isOpen: true, account });
    } else if (option.value === EXPORT_ACCOUNT.value) {
      this.props.updateExportingAccount(account);
      this.props.changePage(EXPORT_ACCOUNT_PAGE);
    }
  };

  handleCloseDialog = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  handleYes = () => {
    const { account } = this.state;
    const { removeAccount, t } = this.props;
    removeAccount(account, t);
    this.setState({ isOpen: false });
  };

  handleTabChange = (e, value) => {
    this.props.updateCurrentTab(value);
  };

  handleAddAccount = async () => {
    await this.props.addAccount();
    this.props.changePage(CREATE_ACCOUNT_PAGE);
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
    } else {
      this.props.updateBackupPage(this.props.page);
      this.props.changePage(option.value);
    }
  };

  render() {
    const {
      accounts, account, t, language, isOfflineMode, currentTab, network
    } = this.props;
    const { isOpen, labels, allowUpdate } = this.state;
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
        option.text = isOfflineMode ? 'Set To Online Mode' : 'Set To Offline Mode';
      }
    }

    return (
      <div
        className="manage-accounts-root-container"
        style={{ background: colorTheme[network.value].background }}
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
          colorTheme={colorTheme[network.value]}
        />
        <>
          <CrustTabs
            value={currentTab}
            onChange={this.handleTabChange}
            labels={tLabels}
            parent="account"
            style={{ background: colorTheme[network.value].card }}
            network={network}
          />
          {currentTab === 0 && (
            <div className="manage-accounts">
              <div className="manage-accounts-container">
                {accounts.length > 0 ? (
                  <AccountList
                    className="accounts-container"
                    accounts={accounts}
                    currentAccount={account}
                    isMoreVertIconVisible
                    moreMenu={options}
                    onAccountMenuOptionsChange={this.handleAccountMenuOptionsChange}
                    theme={theme}
                    onCopyAddress={this.onCopyAddress}
                    handleChangeAccount={this.handleChangeAccount}
                    colorTheme={colorTheme[network.value]}
                    network={network}
                  />
                ) : null}
                <div>
                  <DraggableDialog
                    isOpen={isOpen}
                    handleClose={this.handleCloseDialog}
                    handleYes={this.handleYes}
                    noText={t('No')}
                    yesText={t('Yes')}
                    title={t('Remove account')}
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
                    colorTheme={colorTheme[network.value]}
                  />
                ) : null}
              </div>
            </div>
          )}
        </>
        {currentTab === 0 && (
          <FooterWithTwoButton
            onNextClick={this.handleAddAccount}
            onBackClick={null} //Currently we need to clear import method.
            backButtonName={t('Import Account')}
            nextButtonName={t('Create Account')}
            nextColor={colorTheme[network.value].button.primary.text}
            nextBackground={colorTheme[network.value].button.primary.main}
            backColor={colorTheme[network.value].button.secondary.text}
            backBackground={colorTheme[network.value].button.secondary.main}
          />
        )}
      </div>
    );
  }
}

export default withTranslation()(ManageAccount);

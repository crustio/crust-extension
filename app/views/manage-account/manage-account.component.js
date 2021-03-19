import React, { Component } from 'react';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import { withTranslation } from 'react-i18next';
import SubHeader from '../../components/common/sub-header';
import {
  DASHBOARD_PAGE,
  CREATE_ACCOUNT_PAGE,
  EXPORT_ACCOUNT_PAGE,
} from '../../constants/navigation';
import { copyAccountMessage } from '../../../lib/services/static-message-factory-service';
import AccountList from '../../components/account-list';
import DraggableDialog from '../../components/common/confirm-dialog';
import {
  ACCOUNT_MANAGEMENT_MENU_OPTIONS,
  ACCOUNT_MANAGEMENT_OPTIONS,
  ADD_ACCOUNT,
  EXPORT_ACCOUNT,
  REMOVE,
  IMPORT_PHRASE,
  IMPORT_JSON,
} from '../../constants/options';
import { findChainByName } from '../../../lib/constants/chain';
import { ENGLISH } from '../../constants/language';
import './styles.css';

class ManageAccount extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      isOpen: false,
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
      await this.props.addAccount();
      this.props.changePage(CREATE_ACCOUNT_PAGE);
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

  render() {
    const {
      accounts, account, network, t, language
    } = this.props;
    const { isOpen } = this.state;
    const chain = findChainByName(network.value);
    const theme = chain.icon || 'polkadot';
    const options = accounts.length > 1
      ? ACCOUNT_MANAGEMENT_OPTIONS.map(o => ({ ...o, text: t(o.text) }))
      : ACCOUNT_MANAGEMENT_OPTIONS.filter(o => o.value !== REMOVE.value).map(o => ({
        ...o,
        text: o.text,
      }));

    return (
      <div className="manage-accounts-root-container">
        <SubHeader
          icon={<ArrowBackIosOutlinedIcon style={{ color: '#858B9C', fontSize: '14px' }} />}
          title={t('Account Management')}
          backBtnOnClick={this.handleSubheaderBackBtn}
          subMenu={ACCOUNT_MANAGEMENT_MENU_OPTIONS}
          showSettings
          onSubMenuOptionsChange={this.handleOnSubMenuOptionsChange}
          menuWidth={language === ENGLISH ? 150 : undefined}
        />
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
      </div>
    );
  }
}

export default withTranslation()(ManageAccount);

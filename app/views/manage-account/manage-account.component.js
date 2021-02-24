import React, { Component } from 'react';
import Clear from '@material-ui/icons/Clear';
import SubHeader from '../../components/common/sub-header';
import { DASHBOARD_PAGE, CREATE_ACCOUNT_PAGE } from '../../constants/navigation';
import { copyAccountMessage } from '../../../lib/services/static-message-factory-service';
import AccountList from '../../components/account-list';
import DraggableDialog from '../../components/common/confirm-dialog';
import {
  ACCOUNT_MANAGEMENT_MENU_OPTIONS,
  ACCOUNT_MANAGEMENT_OPTIONS,
  ADD_ACCOUNT,
  REMOVE,
} from '../../constants/options';
import { findChainByName } from '../../../lib/constants/chain';
import { withTranslation } from 'react-i18next';
import './styles.css';

class ManageAccount extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      isOpen: false,
    };
  }

  handleSubheaderBackBtn = () => {
    this.props.changePage(DASHBOARD_PAGE);
  };

  onCopy = () => {
    this.props.createToast({ message: copyAccountMessage(), type: 'info' });
  };

  handleAddAccount = async () => {
    await this.props.addAccount();
    this.props.changePage(CREATE_ACCOUNT_PAGE);
  };

  handleChangeAccount = async (e, account) => {
    if (e.target.tagName === 'DIV') {
      this.props.createToast({ message: copyAccountMessage(), type: 'info' });
    } else {
      await this.props.changeAccount(account);
      this.props.changePage(DASHBOARD_PAGE);
    }
  };

  handleOnSubMenuOptionsChange = async option => {
    if (option.value === ADD_ACCOUNT.value) {
      await this.props.addAccount();
      this.props.changePage(CREATE_ACCOUNT_PAGE);
    }
  };

  handleAccountMenuOptionsChange = async (option, account) => {
    if (option.value === REMOVE.value) {
      this.setState({ isOpen: true, account });
    }
  };

  handleCloseDialog = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  handleYes = () => {
    const { account } = this.state;
    const { removeAccount } = this.props;
    removeAccount(account);
    this.setState({ isOpen: false });
  };

  render() {
    const { accounts, account, network, t } = this.props;
    const { isOpen } = this.state;
    const chain = findChainByName(network.value);
    const theme = chain.icon || 'polkadot';
    const options = ACCOUNT_MANAGEMENT_OPTIONS.map(o => {
      o.text = t(o.text)
      return o
    })
    return (
      <div className="manage-accounts-root-container">
        <SubHeader
          icon={<Clear style={{ color: '#858B9C', fontSize: '18px' }} />}
          title={t("Account Management")}
          backBtnOnClick={this.handleSubheaderBackBtn}
          subMenu={ACCOUNT_MANAGEMENT_MENU_OPTIONS}
          showSettings
          onSubMenuOptionsChange={this.handleOnSubMenuOptionsChange}
        />
        <div className="manage-accounts">
          <div className="manage-accounts-container">
            {accounts.length > 0 ? (
              <AccountList
                className="accounts-container"
                accounts={accounts}
                currentAccount={account}
                isMoreVertIconVisible={accounts.length > 1}
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
                noText={t("No")}
                yesText={t("Yes")}
                title={t("Remove account")}
                msg={t("Please make sure you have saved the seed phrase or private key for this account before continuing.")}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default  withTranslation()(ManageAccount);

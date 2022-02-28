import React, { Component } from 'react';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import { withTranslation } from 'react-i18next';
import TokenDetails from '../../components/token/token-details';
import Wallet from '../../components/wallet';
import { DASHBOARD_PAGE, QR_CODE_PAGE, TRANSFER_PAGE } from '../../constants/navigation';
import Transaction from '../../components/transaction/transaction';
import {
  copyAccountMessage,
  getTransfersWithMoment,
} from '../../../lib/services/static-message-factory-service';
import './styles.css';
import { RENAME } from '../../constants/options';
import { convertBalanceToShow } from '../../../lib/services/numberFormatter';
import SubHeader from '../../components/common/sub-header';
import { colortheme } from '../../../lib/constants/colors';

class TokenDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  handleSend = () => {
    if (!this.props.isConnected) {
      this.props.connectionError();
    } else {
      this.props.getUnits();
      this.props.resetToAddress();
      this.props.updateBackupPage(this.props.page);
      this.props.changePage(TRANSFER_PAGE);
    }
  };

  handleDeposit = () => {
    this.props.updateBackupPage(this.props.page);
    this.props.changePage(QR_CODE_PAGE);
  };

  // eslint-disable-next-line no-unused-vars
  handleAccountMenuOptionsChange = async (option, account, transactionsUrl) => {
    await this.props.configEditAccount(option, account, transactionsUrl);
    if (option.value === RENAME.value) {
      this.textInput.current.focus();
      this.textInput.current.maxLength = 20;
    }
  };

  handleAliasChange = (value, account) => {
    this.props.configAliasAccount(value, account);
  };

  handleAliasInputBlur = account => {
    this.props.renameAlias(account);
  };

  handleOnKeyPress = (e, account) => {
    if (e.key === 'Enter') {
      this.props.renameAlias(account);
    }
  };

  onCopyAddress = () => {
    const { t } = this.props;
    this.props.createToast({
      message: t(copyAccountMessage()),
      type: 'info',
    });
  };

  onTokenSelected = () => {
    this.props.changePage(QR_CODE_PAGE);
  };

  onClick = () => {
    this.props.changePage(DASHBOARD_PAGE);
  };

  render() {
    const {
      accounts,
      account,
      transactionHistory,
      isLinkToFaucet,
      network,
      accountMenu,
      token,
      t,
    } = this.props;
    const theme = 'substrate';
    const transDisplay = transactionHistory.filter(
      trans => trans.tokenSymbol === token.tokenSymbol,
    );
    return (
      <div className="token-details-page-container">
        <SubHeader
          icon={<ArrowBackIosOutlinedIcon style={{ color: '#858B9C', fontSize: '14px' }} />}
          title={t('Token Details')}
          backBtnOnClick={this.onClick}
          isBackIcon
          colortheme={colortheme[network.value]}
        />
        <div className="account-content-container">
          <Wallet
            className="wallet-container"
            inputRef={this.textInput}
            accounts={accounts}
            selectedAccount={account}
            theme={theme}
            onAliasChange={this.handleAliasChange}
            onAliasInputBlur={this.handleAliasInputBlur}
            onAliasInputKeyPress={this.handleOnKeyPress}
            onCopyAddress={this.onCopyAddress}
            accountMenu={accountMenu}
            colortheme={colortheme[network.value]}
            onAccountMenuOptionsChange={this.handleAccountMenuOptionsChange}
            network={network}
          />
          <TokenDetails
            unit={token.tokenSymbol}
            className="token-container"
            balance={
              token.balance === '-' ? '-' : convertBalanceToShow(token.balance, token.decimals)
            }
            marketData={undefined}
            amount={convertBalanceToShow(token.balance, token.decimals)}
            handleSend={this.handleSend}
            handleDeposit={this.handleDeposit}
            labelText={token.tokenSymbol === 'CRU' ? 'Transferable' : ''}
          />
        </div>

        <Transaction
          className="transaction-container"
          network={network}
          isLinkToFaucet={isLinkToFaucet}
          transactions={getTransfersWithMoment(transDisplay)}
          listHeight="280px"
          colortheme={colortheme[network.value]}
          account={account}
        />
      </div>
    );
  }
}

export default withTranslation()(TokenDetailsPage);

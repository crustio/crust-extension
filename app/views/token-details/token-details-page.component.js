import React, { Component } from 'react';
import Clear from '@material-ui/icons/Clear';
import { withTranslation } from 'react-i18next';
import TokenDetails from '../../components/token/token-details';
import Wallet from '../../components/wallet';
import { TRANSFER_PAGE, QR_CODE_PAGE, DASHBOARD_PAGE } from '../../constants/navigation';
import Transaction from '../../components/transaction/transaction';
import { copyAccountMessage } from '../../../lib/services/static-message-factory-service';
import './styles.css';
import { RENAME } from '../../constants/options';
import { findChainByName } from '../../../lib/constants/chain';
import { convertBalanceToShow } from '../../../lib/services/numberFormatter';
import SubHeader from '../../components/common/sub-header';

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
    this.props.createToast({
      message: copyAccountMessage(),
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
      transactions,
      isLinkToFaucet,
      network,
      accountMenu,
      token,
      t,
    } = this.props;
    const chain = findChainByName(network.value);
    const theme = chain.icon || 'polkadot';
    const transDisplay = transactions.filter(
      trans => trans.metadata.tokenSelected !== undefined
        && trans.metadata.tokenSelected.tokenSymbol === token.tokenSymbol,
    );
    return (
      <div className="token-details-page-container">
        <SubHeader
          icon={<Clear style={{ color: '#858B9C', fontSize: '18px' }} />}
          title={t('Token Details')}
          backBtnOnClick={this.onClick}
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
            onAccountMenuOptionsChange={this.handleAccountMenuOptionsChange}
          />
          <TokenDetails
            unit={token.tokenSymbol}
            className="token-container"
            balance={convertBalanceToShow(token.balance, token.decimals)}
            marketData={undefined}
            amount={convertBalanceToShow(token.balance, token.decimals)}
            handleSend={this.handleSend}
            handleDeposit={this.handleDeposit}
          />
        </div>

        <Transaction
          className="transaction-container"
          network={network}
          isLinkToFaucet={isLinkToFaucet}
          transactions={transDisplay}
        />
      </div>
    );
  }
}

export default withTranslation()(TokenDetailsPage);

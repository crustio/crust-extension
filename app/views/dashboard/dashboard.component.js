import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import TokenDetails from '../../components/token/token-details';
import Wallet from '../../components/wallet';
import { TRANSFER_PAGE, QR_CODE_PAGE, TOKEN_DETAILS_PAGE } from '../../constants/navigation';
import Transaction from '../../components/transaction/transaction';
import { copyAccountMessage } from '../../../lib/services/static-message-factory-service';
import { convertBalanceToShow } from '../../../lib/services/numberFormatter';
import './styles.css';
import { RENAME } from '../../constants/options';
import { findChainByName } from '../../../lib/constants/chain';
import TokenList from '../../components/token-list';
import CrustTabs from '../../components/common/crust-tabs';
import ButtonSquare from '../../components/common/buttons/button-square';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      labels: ['Assets', 'Activity'],
      value: 0,
    };
  }

  setDefaultToken = () => {
    const defaultToken = this.props.tokens.find(token => token.address === undefined);
    this.props.onTokenSelected(defaultToken);
  };

  handleSend = () => {
    if (!this.props.isConnected) {
      this.props.connectionError();
    } else {
      this.setDefaultToken();
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

  onTokenSelected = token => {
    this.props.onTokenSelected(token);
    this.props.changePage(TOKEN_DETAILS_PAGE);
  };

  handleChange = (e, value) => {
    this.setState({
      value,
    });
  };

  handleLock = () => {
    this.props.lockApp();
  };

  render() {
    const {
      accounts,
      account,
      balances,
      transactions,
      balance: { balanceFormatted, marketData, amount },
      isLinkToFaucet,
      network,
      unit,
      accountMenu,
      tokens,
      t,
    } = this.props;
    const { labels, value } = this.state;
    const tLabels = labels.map(l => t(l));
    const chain = findChainByName(network.value);
    const theme = chain.icon || 'polkadot';
    const defaultToken = tokens.find(token => token.address === undefined);
    return (
      <div className="dashboard-container">
        <div>
          <div className="account-content-container">
            <Wallet
              className="wallet-container"
              inputRef={this.textInput}
              accounts={accounts}
              balances={balances}
              balance={balanceFormatted}
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
              unit={network.unit !== undefined ? network.unit : unit !== undefined ? unit.text : ''}
              className="token-container"
              balance={convertBalanceToShow(defaultToken.balance, defaultToken.decimals)}
              marketData={marketData && marketData}
              amount={amount}
              handleSend={this.handleSend}
              handleDeposit={this.handleDeposit}
            />
          </div>
        </div>
        <CrustTabs value={value} onChange={this.handleChange} labels={tLabels} />
        {value === 0 && (
          <div>
            <TokenList
              tokens={tokens}
              className="token-list-container"
              onTokenSelected={this.onTokenSelected}
            />
          </div>
        )}
        {value === 1 && (
          <Transaction
            className="transaction-container"
            network={network}
            isLinkToFaucet={isLinkToFaucet}
            transactions={transactions}
          />
        )}
        <div
          style={{
            position: 'absolute',
            top: '544px',
            justifyContent: 'space-between',
            display: 'flex',
            width: '100%',
            padding: '0 16px',
            height: '38px',
          }}
        >
          <a
            className="dashboard-footer"
            target="_blank"
            href="https://apps.crust.network"
            rel="noopener noreferrer"
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div>Crust Apps</div>
              <div style={{ display: 'flex' }}>
                <ArrowForwardIosOutlinedIcon className="dashboard-icon" />
              </div>
            </div>
          </a>
          <ButtonSquare iconName="lock" onClick={this.handleLock} />
        </div>
      </div>
    );
  }
}

export default withTranslation()(Dashboard);

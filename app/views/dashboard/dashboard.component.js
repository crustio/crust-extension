import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Wallet from '../../components/wallet';
import {
  CREATE_ACCOUNT_PAGE,
  QR_CODE_PAGE,
  TOKEN_DETAILS_PAGE,
  TRANSFER_PAGE,
} from '../../constants/navigation';
import Transaction from '../../components/transaction/transaction';
import {
  copyAccountMessage,
  getTransfersWithMoment,
} from '../../../lib/services/static-message-factory-service';
import './styles.css';
import { RENAME } from '../../constants/options';
import TokenList from '../../components/token-list';
import CrustTabs from '../../components/common/crust-tabs';
import { HelpCircle, NetworkOfflineIcon } from '../../components/common/icon';
import FooterWithTwoButton from '../../components/common/footer-with-two-button';
import { colorTheme } from '../../../lib/constants/colors';

const MP = withStyles({
  root: {
    color: '#111A34',
    fontSize: 14,
    fontWeight: 400,
    padding: '4px 0',
  },
})(DialogContentText);

const MDialogTitle = withStyles({
  root: {
    fontSize: 16,
    fontWeight: 500,
    color: '#111A34',
    textAlign: 'center',
    padding: '16px',
  },
})(DialogTitle);

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.timer = setInterval(() => this.props.fetchTransactionHistory(this.props.network), 30000);
    this.textInput = React.createRef();
    this.state = {
      labels: ['Assets', 'Activities'],
      value: 0,
      showOfflineDescription: false,
    };
  }

  componentDidMount() {
    this.props.fetchTransactionHistory();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleSend = () => {
    // if (!this.props.isConnected) {
    //   this.props.connectionError();
    // } else {
    // this.props.getUnits();
    this.props.resetToAddress();
    this.props.updateBackupPage(this.props.page);
    this.props.changePage(TRANSFER_PAGE);
    // }
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

  onCreateAccountClick = async () => {
    await this.props.addAccount();
    this.props.changePage(CREATE_ACCOUNT_PAGE);
  };

  render() {
    const {
      accounts,
      account,
      balances,
      transactionHistory,
      balance: { balanceFormatted },
      isLinkToFaucet,
      network,
      isConnected,
      isOfflineMode,
      // isError,
      // isErrorByType,
      accountMenu,
      tokens,
      t,
    } = this.props;
    const { labels, value } = this.state;
    const tLabels = labels.map(l => t(l));
    const theme = 'substrate';
    const showOffline = !isConnected || isOfflineMode;
    return (
      <div
        className="dashboard-container"
        style={{ background: colorTheme[network.value].background }}
      >
        <div>
          <div
            className="account-content-container"
            style={{ background: colorTheme[network.value].card }}
          >
            <Wallet
              className="wallet-container"
              inputRef={this.textInput}
              accounts={accounts}
              balances={balances}
              balance={balanceFormatted}
              network={network}
              selectedAccount={account}
              theme={theme}
              colorTheme={colorTheme[network.value]}
              onAliasChange={this.handleAliasChange}
              onAliasInputBlur={this.handleAliasInputBlur}
              onAliasInputKeyPress={this.handleOnKeyPress}
              onCopyAddress={this.onCopyAddress}
              accountMenu={accountMenu}
              onAccountMenuOptionsChange={this.handleAccountMenuOptionsChange}
              onCreateAccountClick={this.onCreateAccountClick}
              style={{
                color: colorTheme[network.value].text.secondary,
                boxShadow: network.value === 'crust maxwell' ? 'none' : '',
              }}
            />
          </div>
        </div>
        {showOffline && (
          <div className="crust-offline-container">
            <NetworkOfflineIcon colorTheme={colorTheme[network.value]} />
            <span className="offline-hint">
              {t('OfflineDescription')}
              <HelpCircle
                size={16}
                color="#111A34"
                style={{
                  marginLeft: 10,
                  marginBottom: -3,
                  cursor: 'pointer',
                }}
                onClick={() => this.setState({ showOfflineDescription: true })}
              />
            </span>
            <Dialog
              PaperProps={{
                style: {
                  margin: 30,
                  borderRadius: 8,
                },
              }}
              open={this.state.showOfflineDescription}
              onClose={() => this.setState({ showOfflineDescription: false })}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <MDialogTitle disableTypography id="alert-dialog-title">
                {t('Why my wallet is offline?')}
              </MDialogTitle>
              <DialogContent color="#111A34" style={{ padding: '0 16px 16px' }}>
                <MP>{`${t('Possible reasons')}:`}</MP>
                <MP>{t('reasons_1')}</MP>
                <MP style={{ marginTop: 12 }}>{t('reasons_2')}</MP>
                <MP style={{ marginTop: 12 }}>{t('reasons_3')}</MP>
              </DialogContent>
              <DialogActions style={{ margin: '16px' }}>
                <div
                  className="btn-ok"
                  onClick={() => this.setState({ showOfflineDescription: false })}
                >
                  {t('OK')}
                </div>
              </DialogActions>
            </Dialog>
          </div>
        )}
        {!showOffline && (
          <>
            <CrustTabs
              value={value}
              onChange={this.handleChange}
              labels={tLabels}
              parent="home"
              colorTheme={colorTheme[network.value]}
              network={network}
            />
            {value === 0 && (
              <div>
                <TokenList
                  tokens={tokens}
                  className="token-list-container"
                  onTokenSelected={this.onTokenSelected}
                  colorTheme={colorTheme[network.value]}
                />
              </div>
            )}
            {value === 1 && (
              <Transaction
                className="transaction-container"
                network={network}
                account={account}
                isLinkToFaucet={isLinkToFaucet}
                transactions={getTransfersWithMoment(transactionHistory)}
                colorTheme={colorTheme[network.value]}
              />
            )}
          </>
        )}

        {!showOffline && (
          <FooterWithTwoButton
            onNextClick={this.handleSend}
            onBackClick={this.handleDeposit}
            backButtonName={t('Receive')}
            nextButtonName={t('Send')}
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

export default withTranslation()(Dashboard);

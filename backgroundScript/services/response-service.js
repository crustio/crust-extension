import { getStore } from '../store/store-provider';
import * as status from '../../lib/constants/api';
import * as AccountService from './account-service';
import * as BalanceService from './balance-service';
import * as TransactionService from './transaction-service';
import * as TransactionWatcherService from './transaction-watcher-service';
import * as NetworkService from './network-service';
import * as DAppService from './dapp-service';
import * as ContractService from './contract-service';
import * as TokensService from './tokens-service';
import * as DAppTransactionService from './dapp-transaction-service';
import * as AppService from './app-service';
import * as AddressBookService from './address-book-service';
import * as ResponseType from '../../lib/constants/response-types';
import { sendErrorMessage } from '../../lib/services/static-message-factory-service';
import { getTokenDecimals } from '../apis/chain';
import * as StoreService from './store-service';

// use below messages if no return message is needed
export const success = {
  status: status.SUCCESS,
  message: 'success',
};
// return a failure ...
export const failure = {
  status: status.FAILURE,
  message: 'failed',
};

export const handleDefault = async (request, sendResponse) => {
  const response = {
    ...failure,
    message: 'Invalid request.Check message type',
  };
  sendResponse(response);
};

export const handleProcessingError = async (request, sendResponse) => {
  const response = {
    ...failure,
    message: 'Error while processing request.Check message type',
  };
  sendResponse(response);
};

export const isAppReady = async (request, sendResponse) => {
  try {
    const { isAppReady } = getStore().getState().appState;
    sendResponse({ ...success, result: isAppReady });
  } catch (err) {
    sendResponse({
      ...failure,
      message: 'Error while checking if app is ready',
    });
  }
};

export const setHashKey = async (request, sendResponse) => {
  try {
    const { data } = request;
    const hashKey = await AppService.appReady(data);
    if (hashKey !== undefined) {
      sendResponse({ ...success, message: 'Password created' });
    }
  } catch (err) {
    sendResponse({ ...failure, message: 'Error setting password' });
  }
};

export const clearHashKey = async (request, sendResponse) => {
  try {
    await AppService.clearHashKeyState();
    sendResponse({ ...success, message: 'cleared hash key' });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error clearing hashkey' });
  }
};

export const updateAccountAlias = async (request, sendResponse) => {
  try {
    // seedWords is not define its automatically create wallet using new seedwords
    const { address, alias } = request;
    await AccountService.updateAccountAlias(address, alias);
    sendResponse({ ...success, result: name });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in new account name.' });
  }
};
export const createAccount = async (request, sendResponse) => {
  try {
    // seedWords is not define its automatically create wallet using new seedwords
    const {
      seedWords, keypairType, isOnBoarding, alias, password
    } = request;
    const account = await AccountService.createAccount(
      seedWords,
      keypairType,
      isOnBoarding,
      alias,
      password,
    );
    sendResponse({ ...success, result: account });
  } catch (err) {
    sendResponse({
      ...failure,
      message: err.message === undefined ? 'Error while creating new account.' : err.message,
    });
  }
};

export const createAccountWithJson = async (request, sendResponse) => {
  try {
    // seedWords is not define its automatically create wallet using new seedwords
    const {
      json, oldPwd, isOnBoarding, password
    } = request;
    const account = await AccountService.createAccountWithJson(
      json,
      oldPwd,
      isOnBoarding,
      password,
    );
    sendResponse({ ...success, result: account });
  } catch (err) {
    sendResponse({
      ...failure,
      message: err.message === undefined ? 'Error while creating new account.' : err.message,
    });
  }
};

export const getBalances = async (request, sendResponse) => {
  try {
    const { addresses } = request;
    const accountBalanceArr = await BalanceService.getBalances(addresses);
    sendResponse({ ...success, result: accountBalanceArr });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in getting latest balance' });
  }
};

export const getCurrentAccount = async (request, sendResponse) => {
  try {
    const { currentAccount } = getStore().getState().accountState;
    sendResponse({ ...success, result: currentAccount });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in getting current account' });
  }
};

export const exportAccount = async (request, sendResponse) => {
  try {
    const { address, pwd } = request;
    const accountJson = await AccountService.exportAccount(address, pwd);
    sendResponse({ ...success, result: accountJson });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in exporting account' });
  }
};

export const verifyPassword = async (request, sendResponse) => {
  try {
    const { password } = request;
    const validPassword = await AccountService.validPassword(password);
    if (!validPassword) {
      throw new Error('incorrect password');
    }
    sendResponse({ ...success, result: true });
  } catch (err) {
    sendResponse({ ...failure, message: 'Password is incorrect.' });
  }
};

export const getCurrentNetwork = async (request, sendResponse) => {
  try {
    const { currentNetwork } = getStore().getState().networkState;
    sendResponse({ ...success, result: currentNetwork });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in getting current network' });
  }
};

export const updateCurrentNetwork = async (request, sendResponse) => {
  try {
    const { network } = request;
    await NetworkService.updateCurrentNetwork(network);
    const { currentNetwork } = getStore().getState().networkState;
    sendResponse({ ...success, result: currentNetwork });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in current network setup', err });
  }
};

export const updateDeveloperMode = async (request, sendResponse) => {
  try {
    await NetworkService.updateDeveloperMode(request.isDeveloperMode);
    const { isDeveloperMode } = getStore().getState().networkState;
    sendResponse({ ...success, result: isDeveloperMode });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in update developermode' });
  }
};
export const getDeveloperMode = async (request, sendResponse) => {
  try {
    const isDeveloperMode = await NetworkService.getDeveloperMode();
    sendResponse({ ...success, result: isDeveloperMode });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in getting DeveloperMode' });
  }
};

export const getSeedWords = async (request, sendResponse) => {
  try {
    const seedWords = await AccountService.createSeedWords();
    sendResponse({ ...success, result: seedWords });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in getting new seedWords' });
  }
};

export const getAccounts = async (request, sendResponse) => {
  try {
    const { accounts } = await AccountService.getAccounts();
    if (accounts === undefined) {
      sendResponse({
        status: status.BAD_REQUEST,
        message: 'No Account Exist.',
      });
    }
    const {
      appState: { hashKey },
      accountState,
    } = getStore().getState();
    if (hashKey === undefined) {
      sendResponse({
        status: status.UNAUTHORIZED,
        message: 'The request requires user authentication.',
      });
    }
    if (accountState) {
      const result = AccountService.getAccountStateForUi(accountState);
      sendResponse({ ...success, result });
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('getAccountStateForUi::', err);
    sendResponse({ ...failure, message: 'Error in getting accounts' });
  }
};

// Transactions

export const getTransactionFees = async (request, sendResponse) => {
  try {
    const { transaction } = request;
    const {
      accountState: { currentAccount },
      networkState: { currentNetwork },
    } = getStore().getState();
    // const address = AccountService.getAddress(seedWords, keypairType);
    const address = AccountService.getAddressByAccount(currentAccount);
    const result = await TransactionService.getTransactionFees(
      address,
      currentNetwork,
      transaction,
      currentAccount.seedWords,
      currentAccount.keypairType,
    );
    sendResponse({ ...success, result });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in confirm  Transaction ' });
  }
};

export const confirmTransaction = async (request, sendResponse) => {
  try {
    const { transaction } = request;
    const {
      accountState: { currentAccount },
      networkState: { currentNetwork },
    } = getStore().getState();
    // const address = AccountService.getAddress(seedWords, keypairType);
    const address = AccountService.getAddressByAccount(currentAccount);
    const result = await TransactionService.confirmTransaction(
      address,
      currentNetwork,
      transaction,
      currentAccount.seedWords,
      currentAccount.keypairType,
    );
    sendResponse({ ...success, result });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in confirm  Transaction ' });
  }
};
export const submitTransaction = async (request, sendResponse) => {
  try {
    const { transaction, password } = request;
    const transactionStatus = await TransactionWatcherService.submitTransaction(
      transaction,
      password,
    );
    sendResponse({ ...success, result: transactionStatus });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in submitting  Transaction ' });
  }
};

export const getTransactions = async (request, sendResponse) => {
  const { network, address } = request;
  try {
    const {
      transactionState: { transactionArr },
    } = getStore().getState();
    const transactionList = await TransactionService.filterTransactions(
      transactionArr,
      network,
      address,
    );
    sendResponse({ ...success, result: transactionList });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in getting  Transactions' });
  }
};

export const getTransaction = async (request, sendResponse) => {
  const { network, address, txnHash } = request;
  try {
    const {
      transactionState: { transactionArr },
    } = getStore().getState();
    const transactionList = await TransactionService.filterTransactions(
      transactionArr,
      network,
      address,
    );
    const transaction = transactionList.find(tx => tx.txnHash === txnHash);
    sendResponse({ ...success, result: transaction });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in getting  Transaction' });
  }
};

export const getIsAppOnBoarded = async (request, sendResponse) => {
  try {
    const result = await AppService.getAppIsOnBoarded();
    sendResponse({ ...success, result });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in getting  OnBoard' });
  }
};

export const setIsAppOnBoarded = async (request, sendResponse) => {
  try {
    const result = await AppService.setAppIsOnBoarded();
    sendResponse({ ...success, result });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in Finishing Onboarding.' });
  }
};

export const setLanguage = async (request, sendResponse) => {
  try {
    const { data: language } = request;
    const result = await AppService.setLanguage(language);
    sendResponse({ ...success, result });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in set language.' });
  }
};

export const getLanguage = async (request, sendResponse) => {
  try {
    const result = await AppService.getLanguage();
    sendResponse({ ...success, result });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in get language.' });
  }
};

export const isConnected = (request, sendResponse) => {
  try {
    const result = NetworkService.isConnected();
    sendResponse({ ...success, result });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in Node connectivity.' });
  }
};

export const isValidAddress = async (request, sendResponse) => {
  try {
    const { address } = request;
    const isAddress = AccountService.isValidAddress(address);
    const result = { isAddress };
    sendResponse({ ...success, result });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in Validation Address.' });
  }
};

export const handleAuthorizeDApp = async (request, sender, sendResponse) => {
  try {
    const result = await DAppService.authorizeDApp(request, sender);
    sendResponse({ ...success, result });
  } catch (e) {
    sendResponse({
      ...failure,
      message: e.message && e.message !== '' ? e.message : 'Unable to authorize DApp.',
    });
  }
};

//dApp
export const getDAppRequests = async (request, sendResponse) => {
  try {
    const result = await DAppService.getDAppRequests();
    sendResponse({ ...success, result });
  } catch (err) {
    sendResponse({ ...failure, message: 'Unable to get DApp data' });
  }
};

// Request by Dapp
export const updateWhiteListedDApps = async (request, sender, sendResponse) => {
  try {
    const { result, requestID, replyData } = await DAppService.whitelistDApp(request);
    DAppService.sendPopupResponse({ ...success, result }, sender, sendResponse);
    await DAppService.closeRequestAndReplyDApp(requestID, replyData);
  } catch (err) {
    DAppService.sendPopupResponse(
      {
        ...failure,
        message: 'Error while whitelisting.',
      },
      sender,
      sendResponse,
    );
    const pdata = {
      id: request.request.sender.tab.id,
      message: {
        ...failure,
        message: 'Error while whitelisting.',
        origin: request.request.sender.origin,
        msgId: request.request.request.messageId,
        type: ResponseType.BG_DAPP_RESPONSE,
      },
    };
    await DAppService.closeRequestAndReplyDApp(request.request.id, pdata);
  }
};

export const cancelDAppRequest = async (request, sender, sendResponse) => {
  try {
    const { result, requestID, replyData } = await DAppService.cancelRequest(request);
    DAppService.sendPopupResponse({ ...success, result }, sender, sendResponse);
    await DAppService.closeRequestAndReplyDApp(requestID, replyData);
  } catch (e) {
    DAppService.sendPopupResponse(
      { ...failure, message: 'Error while cancelling request.' },
      sender,
      sendResponse,
    );
    const pdata = {
      id: sender.tab.id,
      message: {
        ...failure,
        message: 'Error while cancelling request.',
        origin: request.request.sender.origin,
        msgId: request.request.request.messageId,
        type: ResponseType.BG_DAPP_RESPONSE,
      },
    };
    await DAppService.closeRequestAndReplyDApp(request.request.id, pdata);
  }
};

export const getDAppAccounts = async (request, sendResponse) => {
  try {
    const result = await DAppService.getAccountsForDapp(request);
    sendResponse({ ...success, result });
  } catch (e) {
    sendResponse({ ...failure, message: 'Unable to get accounts.' });
  }
};

export const submitDappTransaction = async (request, sender, sendResponse) => {
  try {
    const { data, request: requestData, password } = request;
    const result = await DAppTransactionService.signTransaction(data, password);
    DAppService.sendPopupResponse({ ...success, result }, sender, sendResponse);
    if (request.dApp) {
      const { sender, request: dAppRequest } = requestData;
      const { id } = sender.tab;
      const { signature } = result;
      const pdata = {
        id,
        message: {
          ...success,
          result: { id, signature },
          origin: dAppRequest.metadata.origin,
          msgId: dAppRequest.messageId,
          type: ResponseType.BG_DAPP_RESPONSE,
        },
      };
      await DAppService.closeRequestAndReplyDApp(request.request.id, pdata);
    }
  } catch (err) {
    DAppService.sendPopupResponse(
      {
        ...failure,
        message: 'Error while signing Transaction.',
      },
      sender,
      sendResponse,
    );
    const pdata = {
      id: sender.tab.id,
      message: {
        ...failure,
        message: 'Error while signing Transaction.',
        origin: request.request.sender.origin,
        msgId: request.request.messageId,
        type: ResponseType.BG_DAPP_RESPONSE,
      },
    };
    await DAppService.closeRequestAndReplyDApp(request.request.id, pdata);
  }
};
export const handleDAppValidateTransaction = async (request, sender, sendResponse) => {
  try {
    const result = await DAppService.validateTransaction(request, sender);
    sendResponse({ ...success, result });
  } catch (e) {
    const message = sendErrorMessage(e);
    sendResponse({ ...failure, message });
  }
};

export const validateDappTransaction = async (request, sendResponse) => {
  try {
    const result = await DAppTransactionService.validateDappTransaction(request);
    sendResponse({ ...success, result });
  } catch (e) {
    sendResponse({ ...failure, message: 'Unable to sign Dapp Transaction.' });
  }
};

export const signMessage = async (request, sender, sendResponse) => {
  try {
    const result = await DAppService.signMessage(request, sender);
    sendResponse({ ...success, result });
  } catch (e) {
    sendResponse({ ...failure, message: 'Unable to sign Dapp Transaction.' });
  }
};

export const isNewAddress = async (request, sendResponse) => {
  try {
    const { address } = request;
    const result = AddressBookService.isNewAddress(address);
    sendResponse({ ...success, result });
  } catch (e) {
    sendResponse({ ...failure, message: 'Error in isNewAddress.' });
  }
};

export const submitContact = async (request, sendResponse) => {
  try {
    const { contact } = request;
    const result = await AddressBookService.submitContact(contact);
    sendResponse({ ...success, result });
  } catch (e) {
    sendResponse({
      ...failure,
      message: e.message,
    });
  }
};

export const getContacts = async (request, sendResponse) => {
  try {
    const result = await AddressBookService.getContacts();
    sendResponse({ ...success, result });
  } catch (e) {
    sendResponse({ ...failure, message: 'Error in signing message.' });
  }
};

export const getSignMessage = async (request, sender, sendResponse) => {
  try {
    const { result, requestID, replyData } = await DAppService.getSignMessage(request);
    DAppService.sendPopupResponse({ ...success, result }, sender, sendResponse);
    await DAppService.closeRequestAndReplyDApp(requestID, replyData);
  } catch (err) {
    DAppService.sendPopupResponse(
      {
        ...failure,
        message: 'Error while signing message.',
      },
      sender,
      sendResponse,
    );
    const pdata = {
      id: sender.tab.id,
      message: {
        ...failure,
        message: 'Error while signing message.',
        origin: request.request.sender.origin,
        msgId: request.request.request.messageId,
        type: ResponseType.BG_DAPP_RESPONSE,
      },
    };
    await DAppService.closeRequestAndReplyDApp(request.request.id, pdata);
  }
};

export const updateCurrentAccount = async (request, sendResponse) => {
  try {
    // seedWords is not define its automatically create wallet using new seedwords
    const { address } = request;
    const account = await AccountService.updateCurrentAccount(address);
    sendResponse({ ...success, result: account });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in new account name.' });
  }
};

export const removeAccount = async (request, sendResponse) => {
  try {
    // seedWords is not define its automatically create wallet using new seedwords
    const { address } = request;
    const isAccountRemoved = await AccountService.removeAccount(address);
    sendResponse({ ...success, result: isAccountRemoved });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error while removing account.' });
  }
};

export const removeContact = async (request, sendResponse) => {
  try {
    // seedWords is not define its automatically create wallet using new seedwords
    const { contact } = request;
    const isAccountRemoved = await AddressBookService.removeContact(contact);
    sendResponse({ ...success, result: isAccountRemoved });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error while removing account.' });
  }
};

export const getUnits = async (request, sendResponse) => {
  try {
    const result = NetworkService.getUnits();
    sendResponse({ ...success, result });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error while getting units.' });
  }
};

export const getChainDecimals = async (request, sendResponse) => {
  try {
    const result = getTokenDecimals();
    sendResponse({ ...success, result });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error while getting units.' });
  }
};

export const addContract = async (request, sender, sendResponse) => {
  try {
    const { address } = request;
    const result = await ContractService.addContract(address);
    sendResponse({ ...success, result });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error while add contract.' });
  }
};

export const getTokenList = async (request, sender, sendResponse) => {
  try {
    const result = await ContractService.getTokenList();
    sendResponse({ ...success, result });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error while get token list.' });
  }
};

export const updateTokenBalances = async (request, sender, sendResponse) => {
  try {
    const result = await ContractService.updateTokenBalances();
    sendResponse({ ...success, result });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error while get token list.' });
  }
};

export const forceConnectNetwork = async (request, sendResponse) => {
  try {
    const { network } = request;
    await NetworkService.forceConnectToApi(network);
    const { currentNetwork } = getStore().getState().networkState;
    sendResponse({ ...success, result: currentNetwork });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error in current network setup' });
  }
};

export const disConnectNetwork = (request, sendResponse) => {
  try {
    NetworkService.disconnect();
    sendResponse({ ...success });
  } catch (e) {
    sendResponse({ ...failure, message: 'Error in disconnect' });
  }
};

export const getCrustTokenList = async (request, sender, sendResponse) => {
  try {
    const { network } = request;
    if (network && network.value === 'crust maxwell') {
      const result = await TokensService.getTokenList();
      sendResponse({ ...success, result });
      return;
    }
    sendResponse({ ...success, result: [] });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error while get token list.' });
  }
};

export const updateCandyBalance = async (request, sender, sendResponse) => {
  try {
    const result = await TokensService.getTokenList();
    sendResponse({ ...success, result });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error while update candy balance.' });
  }
};

export const getMetadataList = async (request, sender, sendResponse) => {
  try {
    const result = StoreService.getLiteMetadataList();
    sendResponse({ ...success, result });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error while update candy balance.' });
  }
};

export const reqMetadataProvide = async (request, sender, sendResponse) => {
  try {
    // eslint-disable-next-line
    // console.info('reqMetadata::', request, sender);
    await DAppService.reqMetadataProvide(request, sender);
    sendResponse({ ...success, result: undefined });
  } catch (err) {
    sendResponse({ ...failure, message: 'Error while update candy balance.' });
  }
};

export const allowMetadataProvide = async (request, sender, sendResponse) => {
  try {
    const { result, requestID, replyData } = await DAppService.allowMetadataProvide(request);
    DAppService.sendPopupResponse({ ...success, result }, sender, sendResponse);
    await DAppService.closeRequestAndReplyDApp(requestID, replyData);
  } catch (err) {
    DAppService.sendPopupResponse(
      {
        ...failure,
        message: 'Error with allow update metadata.',
      },
      sender,
      sendResponse,
    );
    const pdata = {
      id: sender.tab.id,
      message: {
        ...failure,
        message: 'Error with allow update metadata.',
        origin: request.request.sender.origin,
        msgId: request.request.request.messageId,
        type: ResponseType.BG_DAPP_RESPONSE,
      },
    };
    await DAppService.closeRequestAndReplyDApp(request.request.id, pdata);
  }
};

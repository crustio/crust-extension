import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import * as RequestType from '../../../lib/constants/request-types';
import {
  copyAccountMessage,
  copyDataMessage,
} from '../../../lib/services/static-message-factory-service';
import SubHeader from '../../components/common/sub-header';
import Send from '../../components/dapp/send';
import SignMessage from '../../components/dapp/sign-message';
import UpMetadata from '../../components/dapp/up-metadata';
import { createTxnUI } from '../../services/wallet-service';
import { colortheme } from '../../../lib/constants/colors';

import './styles.css';

class DAppRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestId: '',
      isInfoExpanded: false,
      password: '',
      errorText: '',
    };
  }

  componentDidMount() {
    this.props.fetchNetwork();
  }

  handleOnChange = prop => e => {
    const { value } = e.target;
    this.setState({
      [prop]: value,
    });
  };

  onCopyAddress = () => {
    const { t } = this.props;
    this.props.createToast({
      message: t(copyAccountMessage()),
      type: 'info',
    });
  };

  onCopyData = () => {
    this.props.createToast({
      message: copyDataMessage(),
      type: 'info',
    });
  };

  handleExpansion = id => () => {
    const { requestId } = this.state;

    this.setState({ requestId: requestId === id ? '' : id });
  };

  handleInfoExpansion = () => {
    const { isInfoExpanded } = this.state;
    this.setState({ isInfoExpanded: !isInfoExpanded });
  };

  handleAllow = request => async () => {
    const ret = await this.props.allowRequest(request, this.state.password);
    if (ret === 'Password is incorrect.') {
      this.setState({
        errorText: ret,
      });
      return;
    }
    this.props.updateAppLoading(true);
  };

  handleCancel = request => () => {
    this.props.cancelDAppRequest(request);
  };

  renderRequests() {
    const {
      requests, accounts, balances, network, t
    } = this.props;
    // Use for toggle
    const { isInfoExpanded, errorText, password } = this.state;
    return (
      <div
        className="dapp-requests-container"
        style={{ background: colortheme[network.value].background }}
      >
        {requests.map(request => {
          switch (request.request.requestType) {
            case RequestType.SEND:
              return (
                <Send
                  accounts={accounts}
                  isSendExpanded
                  fromAccount={request.result.account}
                  onCopyAddress={this.onCopyAddress}
                  handleSendExpansion={this.handleExpansion(request.id)}
                  handleInfoExpansion={this.handleInfoExpansion}
                  isInfoExpanded={isInfoExpanded}
                  txnForUI={request.result.txnForUI}
                  txnUi={createTxnUI(request.result.txnForUI)}
                  // errorMessage={
                  //   request.result.isError && request.result.isAmountError
                  //     ? t(request.result.toAmountErrorMessage)
                  //     : request.result.isToAddressError
                  //       ? t(request.result.toAddressErrorMessage)
                  //       : null
                  // }
                  onCopyData={this.onCopyData}
                  onCancel={this.handleCancel(request)}
                  onAllow={this.handleAllow(request)}
                  className="dapp-requests-card"
                  key={request.id}
                  password={password}
                  errorText={errorText}
                  handleOnChange={this.handleOnChange}
                  colortheme={colortheme[network.value]}
                  style={{ background: colortheme[network.value].background }}
                />
              );
            case RequestType.SIGN_MESSAGE:
              return (
                <SignMessage
                  isSignMessageExpanded
                  account={request.result.account}
                  balance={balances.find(
                    balance => balance.address === request.result.account.address,
                  )}
                  onCopyAddress={this.onCopyAddress}
                  handleSignMessageExpansion={this.handleExpansion(request.id)}
                  onCancel={this.handleCancel(request)}
                  onAllow={this.handleAllow(request)}
                  errorMessage={null}
                  data={request.result.message.message}
                  key={request.id}
                  onCopyData={this.onCopyData}
                  className="dapp-requests-card"
                  password={password}
                  errorText={errorText}
                  handleOnChange={this.handleOnChange}
                  colortheme={colortheme[network.value]}
                  t={t}
                  style={{ background: colortheme[network.value].background }}
                />
              );
            case RequestType.GET_METADATA_PROVIDE:
              return (
                <UpMetadata
                  isSignMessageExpanded
                  handleSignMessageExpansion={this.handleExpansion(request.id)}
                  onCancel={this.handleCancel(request)}
                  onAllow={this.handleAllow(request)}
                  errorMessage={null}
                  data={request.result}
                  key={request.id}
                  onCopyData={this.onCopyData}
                  className="dapp-requests-card"
                  errorText={errorText}
                  colortheme={colortheme[network.value]}
                  t={t}
                  style={{ background: colortheme[network.value].background }}
                />
              );
            default:
              return <div key={request.id} />;
          }
        })}
      </div>
    );
  }

  render() {
    const { t, network } = this.props;
    return (
      <div className="dapp-request" style={{ background: colortheme[network.value].background }}>
        <SubHeader
          title={t('Pending Requests')}
          colortheme={colortheme[network.value]}
          align="left"
          margin="15px"
          isBackIcon={false}
        />
        {this.props.requests && this.renderRequests()}
      </div>
    );
  }
}

export default withTranslation()(DAppRequests);

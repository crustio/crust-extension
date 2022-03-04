import React, { Component } from 'react';
import RequestType from '../request-type';
import WalletExpansionPanel from '../../common/wallet-expansion-panel';
import FooterTwoSMButton from '../../common/footer-two-sm-button';
import DarkDivider from '../../common/divider/dark-divider';
import './styles.css';

const Summary = props => (
  <div className={props.className}>
    <RequestType
      type={props.t('Update Metadata')}
      blockchain={props.blockchain}
      className="sign-message-summary-request-type"
      colortheme={props.colortheme}
    />
  </div>
);

const UpMessage = props => (
  <div className={props.className}>
    <DarkDivider style={{ width: '100%' }} />
    <div>{`${props.t('Network')} : ${props.data.network}`}</div>
    <div>{`${props.data.oldSpecVersion} -> ${props.data.specVersion}`}</div>
    <DarkDivider style={{ width: '100%' }} />
  </div>
);

export default class UpMetadata extends Component {
  render() {
    const {
      isSignMessageExpanded,
      handleSignMessageExpansion,
      onCopyAddress,
      account,
      balance,
      onCancel,
      onAllow,
      errorMessage,
      data,
      onCopyData,
      password,
      handleOnChange,
      errorText,
      colortheme,
      t,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <WalletExpansionPanel
          isBelowExpandIcon
          expanded={isSignMessageExpanded}
          handleChange={handleSignMessageExpansion}
          summary={
            <Summary className="sign-message-summary-container" t={t} colortheme={colortheme} />
          }
        >
          <UpMessage className="sign-message-body" data={data} t={t} />
          <FooterTwoSMButton
            className="sign-message-footer-container"
            namePrimary={t('Cancel')}
            nameSecondary={t('Update')}
            onClickPrimary={onCancel}
            onClickSecondary={onAllow}
            isSecondaryDisabled={!!errorMessage}
          />
        </WalletExpansionPanel>
      </div>
    );
  }
}

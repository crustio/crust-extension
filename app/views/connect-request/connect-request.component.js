import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import SubHeader from '../../components/common/sub-header';
import FavIcon from '../../components/common/fav-icon';
import FontRegular from '../../components/common/fonts/font-regular';
import { trimUrl } from '../../services/wallet-service';
import FooterWithTwoButton from '../../components/common/footer-with-two-button';
import { SolidWallet, SolidPlug, File } from '../../components/common/icon';
import { copyAccountMessage } from '../../../lib/services/static-message-factory-service';
import './styles.css';

const DAppURL = ({ favIconUrl, url, ...otherProps }) => (
  <div {...otherProps}>
    {favIconUrl ? (
      <FavIcon favIconUrl={favIconUrl} width="44" height="44" className="connect-request-favicon" />
    ) : (
      <File className="connect-request-favicon" />
    )}
    <FontRegular text={trimUrl(url)} className="connect-request-favicon-url" />
  </div>
);

class ConnectRequest extends Component {
  componentDidMount() {
    this.props.updateAppLoading(true);
    this.props.initializeRequest();
    this.props.updateAppLoading(false);
    this.props.fetchNetwork();
  }

  onDeny = () => {
    this.props.denyAccountAuthorization();
  };

  onAllow = () => {
    this.props.allowAccountAuthorization();
  };

  onCopyAddress = () => {
    const { t } = this.props;
    this.props.createToast({
      message: t(copyAccountMessage()),
      type: 'info',
    });
  };

  renderHeader() {
    const { request } = this.props;
    return (
      <div className="connect-request-header">
        <DAppURL
          favIconUrl={request.sender.tab.favIconUrl}
          url={request.request.metadata.url}
          className="connect-request-dapp-url-container"
        />
        <SolidPlug className="connect-request-plug-icon" />
        <SolidWallet className="connect-request-wallet-icon" />
      </div>
    );
  }

  render() {
    const { request, title, t } = this.props;
    const content = 'is requesting access to an account. Click Allow to grant access any account or click Deny to prevent access to any account.';
    return (
      <div>
        <SubHeader title={t(title)} isBackIcon />
        {this.renderHeader()}
        <FontRegular
          text={<div>{`${request.request.metadata.url} ${t(content)}`}</div>}
          className="connect-request-center connect-request-account-selection-header"
        />
        <FooterWithTwoButton
          onNextClick={this.onAllow}
          onBackClick={this.onDeny}
          backButtonName={t('Deny')}
          nextButtonName={t('Allow')}
        />
      </div>
    );
  }
}

export default withTranslation()(ConnectRequest);

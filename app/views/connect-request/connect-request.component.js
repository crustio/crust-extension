import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import SubHeader from '../../components/common/sub-header';
import FavIcon from '../../components/common/fav-icon';
import FontRegular from '../../components/common/fonts/font-regular';
import { trimUrl } from '../../services/wallet-service';
import FooterWithTwoButton from '../../components/common/footer-with-two-button';
import { SolidWallet, SolidPlug, File } from '../../components/common/icon';
import { copyAccountMessage } from '../../../lib/services/static-message-factory-service';
import { colortheme } from '../../../lib/constants/colors';
import './styles.css';
import LogoBig from '../../images/crust-logo-big.svg';
import LogoBigWhite from '../../images/crust-logo-big-white.svg';
import { CONNECT_REQUEST_PAGE } from '../../constants/navigation';
import { CRUST_MAXWELL_NETWORK } from '../../../lib/constants/networks';

const DAppURL = ({
  favIconUrl, url, textColor, ...otherProps
}) => (
  <div {...otherProps}>
    {favIconUrl ? (
      <FavIcon favIconUrl={favIconUrl} width="44" height="44" className="connect-request-favicon" />
    ) : (
      <File className="connect-request-favicon" />
    )}
    <FontRegular
      text={trimUrl(url)}
      className="connect-request-favicon-url"
      style={{ color: textColor }}
    />
  </div>
);

class ConnectRequest extends Component {
  componentDidMount() {
    this.props.updateBackupPage(CONNECT_REQUEST_PAGE);
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
    const { request, network } = this.props;
    return (
      <div className="connect-request-header">
        <DAppURL
          favIconUrl={network.value === CRUST_MAXWELL_NETWORK.value ? LogoBigWhite : LogoBig}
          url={request.request.metadata.url}
          className="connect-request-dapp-url-container"
          colortheme={colortheme[network.value]}
          style={{ border: `1px solid ${colortheme[network.value].border}` }}
          textColor={colortheme[network.value].text.primary}
        />
        <SolidPlug className="connect-request-plug-icon" colortheme={colortheme[network.value]} />
        <SolidWallet
          className="connect-request-wallet-icon"
          colortheme={colortheme[network.value]}
          style={{ border: `1px solid ${colortheme[network.value].border}` }}
        />
      </div>
    );
  }

  render() {
    const {
      request, title, network, t
    } = this.props;
    const content = 'is requesting access to an account. Click Allow to grant access any account or click Deny to prevent access to any account.';
    return (
      <div
        style={{ height: 600, width: '100vw', background: colortheme[network.value].background }}
      >
        <SubHeader
          title={t(title)}
          isBackIcon={false}
          colortheme={colortheme[network.value]}
          align="left"
          margin="30px"
        />
        {this.renderHeader()}
        <FontRegular
          text={<div>{`${request.request.metadata.url} ${t(content)}`}</div>}
          className="connect-request-center connect-request-account-selection-header"
          style={{ color: colortheme[network.value].text.sixth }}
        />
        <FooterWithTwoButton
          onNextClick={this.onAllow}
          onBackClick={this.onDeny}
          backButtonName={t('Deny')}
          nextButtonName={t('Allow')}
          nextColor={colortheme[network.value].button.primary.text}
          nextBackground={colortheme[network.value].button.primary.main}
          backColor={colortheme[network.value].button.tertiary.text}
          backBackground={colortheme[network.value].button.tertiary.main}
          style={{ maxWidth: 300, marginRight: 'auto', marginLeft: 'auto' }}
        />
      </div>
    );
  }
}

export default withTranslation()(ConnectRequest);

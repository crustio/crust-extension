import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classnames from 'classnames';
import { Circle } from 'react-feather';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CrustContainer from '../crust-container';
import Header from '../common/header/header.component';
import ViewSelector from '../view-selector';
import Network from '../network/network';
import Options from '../options';
import { NetworkDisconnectionIcon } from '../common/icon';
import './styles.css';
import { CHINESE } from '../../constants/language';
import ValidatePasswordModal from '../validate-password/modal';
import FontMedium from '../common/fonts/font-medium';
import { colortheme } from '../../../lib/constants/colors';

export default class CrustApp extends Component {
  render() {
    const {
      account,
      page,
      changePage,
      isLoading,
      networks,
      network,
      onNetworkChange,
      showLogo,
      showBanner,
      showNetwork,
      isConnected,
      isOfflineMode,
      showSettings,
      showHeader,
      showGrayHeader,
      showUserId,
      onLogoClick,
      onCopyAddress,
      options,
      onOptionsChange,
      isDeveloperMode,
      onToggleDeveloperMode,
      language,
      t,
      ...otherProps
    } = this.props;

    const CrustHeaderClassNames = classnames({
      'crust-header': showHeader,
      'crust-header-banner': showHeader && showBanner && !showLogo && !showNetwork && !showUserId,
      'crust-header-boarded': showHeader && !showBanner && showLogo && showNetwork && showUserId,
      'crust-header-gray': showHeader && showGrayHeader,
      'display-none': !showHeader,
    });

    const CrustNetworkClassNames = classnames({
      'crust-network': showNetwork,
      // 'display-none': false,
    });
    const CrustNetworkDisClassNames = classnames({
      'display-none': isConnected,
      'crust-network-status': !isConnected,
    });
    const CrustSettingsClassNames = classnames({
      'crust-settings': showSettings,
      'display-none': !showSettings,
    });
    const CrustUserIdClassNames = classnames({
      'crust-settings': showUserId,
      'display-none': !showUserId,
    });
    const CrustConfigClassNames = classnames({
      'crust-config': (showNetwork && showSettings) || (showNetwork && showUserId),
      'display-none': showBanner || !showNetwork,
    });
    return (
      <CrustContainer blocking={isLoading}>
        <div {...otherProps}>
          <Header
            page={page}
            className={CrustHeaderClassNames}
            style={{ background: colortheme[network.value].background }}
          >
            {/* <div className="crust-row">
              <CrustLogo className="crust-logo" />
              <div className="crust-header-text">Crust Wallet</div>
            </div> */}
            <div className={CrustConfigClassNames}>
              {!isOfflineMode && (
                <>
                  <NetworkDisconnectionIcon
                    title="Network unavailable"
                    className={CrustNetworkDisClassNames}
                    colortheme={colortheme[network.value]}
                  />
                  <Network
                    networks={networks}
                    network={network}
                    onNetworkChange={onNetworkChange}
                    className={CrustNetworkClassNames}
                    page={page}
                    style={{ border: `1px solid ${colortheme[network.value].border}` }}
                    colortheme={colortheme[network.value]}
                  />
                </>
              )}
              {isOfflineMode && (
                <>
                  <Circle size={8} color="#999999" />
                  <span
                    style={{
                      fontSize: 14,
                      color: '#999999',
                      padding: '0 8px',
                    }}
                  >
                    {t('Offline')}
                  </span>
                </>
              )}
              <Options
                onToggleDeveloperMode={onToggleDeveloperMode}
                className={CrustSettingsClassNames}
                isDeveloperMode={isDeveloperMode}
                page={page}
                changePage={changePage}
                menuWidth={language === CHINESE ? 120 : 170}
                colortheme={colortheme[network.value]}
                {...otherProps}
              />
              <CopyToClipboard text={account ? account.address : ''}>
                <FontMedium
                  className={CrustUserIdClassNames}
                  text={account ? account.alias : ''}
                  page={page}
                  onClick={onCopyAddress}
                  colortheme={colortheme[network.value]}
                />
              </CopyToClipboard>
            </div>
          </Header>
          <ViewSelector page={page} />
          <ToastContainer />
          <ValidatePasswordModal />
        </div>
      </CrustContainer>
    );
  }
}

import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classnames from 'classnames';
import CrustContainer from '../crust-container';
import Header from '../common/header/header.component';
import ViewSelector from '../view-selector';
import Network from '../network/network';
import Options from '../options';
import FontRegular from '../common/fonts/font-regular';
import { NetworkDisconnectionIcon } from '../common/icon';
import './styles.css';
import CrustLogo from '../common/crust-logo';

export default class CrustApp extends Component {
  render() {
    const {
      page,
      isLoading,
      networks,
      network,
      onNetworkChange,
      showLogo,
      showBanner,
      showNetwork,
      isConnected,
      showSettings,
      showHeader,
      onLogoClick,
      options,
      onOptionsChange,
      isDeveloperMode,
      onToggleDeveloperMode,
      ...otherProps
    } = this.props;

    const CrustHeaderClassNames = classnames({
      'crust-header': showHeader,
      'crust-header-banner':
        showHeader && showBanner && !showLogo && !showNetwork && !showSettings,
      'crust-header-boarded':
        showHeader && !showBanner && showLogo && showNetwork && showSettings,
      'display-none': !showHeader,
    });

    const CrustLogoClassNames = classnames({
      'crust-logo': showLogo,
      'display-none': !showLogo,
      'clickable-icon': showLogo,
    });
    const CrustNetworkClassNames = classnames({
      'crust-network': showNetwork,
      'display-none': !isDeveloperMode,
    });
    const CrustNetworkStatusClassNames = classnames({
      'display-none': isConnected,
      'crust-network-status': !isConnected,
    });
    const CrustBannerClassNames = classnames({
      'crust-banner': showBanner,
      'display-none': !showBanner,
    });
    const CrustSettingsClassNames = classnames({
      'crust-settings': showSettings,
      'display-none': !showSettings,
    });
    const CrustConfigClassNames = classnames({
      'crust-config': showNetwork && showSettings,
      'display-none': showBanner,
    });
    return (
      <CrustContainer blocking={isLoading}>
        <div {...otherProps}>
          <Header page={page} className={CrustHeaderClassNames}>
            <div className="crust-row">
              <CrustLogo className="crust-logo"/>
              <div className="crust-header-text">Crust Wallet</div>
            </div>
            <div className={CrustConfigClassNames}>
              <NetworkDisconnectionIcon
                title="Network unavailable"
                className={CrustNetworkStatusClassNames}
              />
              <Network
                networks={networks}
                network={network}
                onNetworkChange={onNetworkChange}
                className={CrustNetworkClassNames}
                page={page}
              />
              <Options
                onToggleDeveloperMode={onToggleDeveloperMode}
                options={options}
                onOptionsChange={onOptionsChange}
                className={CrustSettingsClassNames}
                isDeveloperMode={isDeveloperMode}
                page={page}
              />
            </div>
          </Header>
          <ViewSelector page={page} />
          <ToastContainer />
        </div>
      </CrustContainer>
    );
  }
}

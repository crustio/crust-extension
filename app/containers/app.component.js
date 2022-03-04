import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {
  DASHBOARD_PAGE,
  CUSTOM_NETWORK_PAGE,
  LOADER_OVERLAY,
  ONBOARDING_PAGES_GROUP,
  SIGN_UP_PAGE,
  SIGN_IN_PAGE,
  CONNECT_REQUEST_PAGE,
  DAPP_REQUESTS_PAGE,
  CREATE_ACCOUNT_ENTRY_PAGE,
  IMPORT_JSON_PAGE,
  CREATE_ACCOUNT_PAGE,
  TRANSFER_PAGE,
  QR_CODE_PAGE,
  MANAGE_ACCOUNT_PAGE,
  IMPORT_PHRASE_PAGE,
  CONFIRM_PAGE,
  LANGUAGE_SETTING_PAGE,
} from '../constants/navigation';
import { copyAccountMessage } from '../../lib/services/static-message-factory-service';
import CrustApp from '../components/crust-app';
import './styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHeader: false,
      showLogo: false,
      showBanner: false,
      showNetwork: false,
      showSettings: false,
      showGrayHeader: false,
      showGrayBg: false,
      showUserId: false,
    };
  }

  componentDidMount() {
    this.props.updateBackupPage(this.props.page);
    this.props.fetchAndUpdateAppManifest();
    this.props.fetchAndUpdateLanguage(this.props.i18n);
    this.props.updateAppLoading(true);
    this.props.onBoard();
  }

  static getDerivedStateFromProps(prevProps, nextState) {
    // below vars are from 'nextState' and we are overwriting to hide/show as per page

    if (prevProps.page !== LOADER_OVERLAY) {
      if (ONBOARDING_PAGES_GROUP.indexOf(prevProps.page) !== -1) {
        if (
          prevProps.page === SIGN_UP_PAGE
          || prevProps.page === SIGN_IN_PAGE
          || prevProps.page === CREATE_ACCOUNT_ENTRY_PAGE
        ) {
          return {
            showHeader: false, // no change
            showLogo: false,
            showBanner: true,
            showNetwork: false,
            showSettings: false,
            showGrayHeader: false,
            showUserId: false,
          };
        }
        return {
          showHeader: true, // no change
          showLogo: false,
          showBanner: true,
          showNetwork: false,
          showSettings: false,
          showGrayHeader: false,
          showUserId: false,
        };
      }

      if (
        prevProps.page === IMPORT_JSON_PAGE
        || prevProps.page === IMPORT_PHRASE_PAGE
        || prevProps.page === CREATE_ACCOUNT_PAGE
      ) {
        return {
          showHeader: false, // no change
          showLogo: false,
          showBanner: false,
          showNetwork: false,
          showSettings: false,
          showGrayHeader: false,
          showUserId: false,
        };
      }
      if (prevProps.page === CONNECT_REQUEST_PAGE) {
        return {
          showHeader: false, // no change
          showLogo: false,
          showBanner: false,
          showNetwork: false,
          showSettings: false,
          showGrayHeader: false,
          showUserId: false,
        };
      }
      if (prevProps.page === TRANSFER_PAGE) {
        return {
          showHeader: true, // no change
          showLogo: true,
          showBanner: false,
          showNetwork: true,
          showSettings: false,
          showGrayHeader: false,
          showUserId: true,
        };
      }
      if (prevProps.page === QR_CODE_PAGE) {
        return {
          showHeader: false, // no change
          showLogo: false,
          showBanner: false,
          showNetwork: false,
          showSettings: false,
          showGrayHeader: false,
          showUserId: false,
        };
      }
      if (prevProps.page === MANAGE_ACCOUNT_PAGE) {
        return {
          showHeader: false, // no change
          showLogo: false,
          showBanner: false,
          showNetwork: false,
          showSettings: false,
          showGrayHeader: false,
          showUserId: false,
        };
      }
      if (prevProps.page === DAPP_REQUESTS_PAGE) {
        return {
          showHeader: false, // no change
          showLogo: false,
          showBanner: false,
          showNetwork: false,
          showSettings: false,
          showGrayHeader: false,
          showUserId: false,
        };
      }

      if (prevProps.page === CONFIRM_PAGE) {
        return {
          showHeader: true, // no change
          showLogo: true,
          showBanner: false,
          showNetwork: true,
          showSettings: false,
          showGrayHeader: false,
          showUserId: true,
        };
      }

      if (prevProps.page === LANGUAGE_SETTING_PAGE) {
        return {
          showHeader: false, // no change
          showLogo: false,
          showBanner: false,
          showNetwork: false,
          showSettings: false,
          showGrayHeader: false,
          showUserId: false,
        };
      }
      return {
        showHeader: true, // no change
        showLogo: false,
        showBanner: true,
        showNetwork: true,
        showSettings: true,
        showGrayHeader: false,
        showUserId: false,
      };
    }

    return nextState;
  }

  handleNetworkChange = network => {
    if (network.value === 'custom') {
      this.props.updateBackupPage(this.props.page);
      this.props.changePage(CUSTOM_NETWORK_PAGE);
    } else {
      this.props.switchNetwork(network);
    }
  };

  onToggleDeveloperMode = event => {
    const isDeveloperMode = event.target.checked;
    this.props.onToggleDeveloperMode(isDeveloperMode);
  };

  onClick = () => {
    this.props.resetConfirmOnBoarding();
    this.props.clearTransferDetails();
    this.props.changePage(DASHBOARD_PAGE);
  };

  onCopyAddress = () => {
    const { t } = this.props;
    this.props.createToast({
      message: t(copyAccountMessage()),
      type: 'info',
    });
  };

  render() {
    const {
      props: {
        account,
        page,
        changePage,
        isLoading,
        networks,
        network,
        isConnected,
        isOfflineMode,
        isDeveloperMode,
        language,
        t,
      },
      state: {
        showLogo,
        showBanner,
        showNetwork,
        showSettings,
        showHeader,
        showGrayHeader,
        showGrayBg,
        showUserId,
      },
    } = this;

    return (
      <CrustApp
        className={showGrayBg ? 'app-gray' : 'app'}
        isLoading={isLoading}
        account={account}
        page={page}
        networks={networks}
        network={network}
        isConnected={isConnected}
        isOfflineMode={isOfflineMode}
        onNetworkChange={this.handleNetworkChange}
        showLogo={showLogo}
        showBanner={showBanner}
        showNetwork={showNetwork}
        showSettings={showSettings}
        showHeader={showHeader}
        showGrayHeader={showGrayHeader}
        showUserId={showUserId}
        onLogoClick={this.onClick}
        isDeveloperMode={isDeveloperMode}
        onToggleDeveloperMode={this.onToggleDeveloperMode}
        language={language}
        changePage={changePage}
        onCopyAddress={this.onCopyAddress}
        t={t}
      />
    );
  }
}

export default withTranslation()(App);

App.propTypes = {
  page: PropTypes.string,
  switchNetwork: PropTypes.func,
  changePage: PropTypes.func,
};

App.defaultProps = {
  page: DASHBOARD_PAGE,
  switchNetwork: undefined,
  changePage: undefined,
};

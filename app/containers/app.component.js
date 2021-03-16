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
} from '../constants/navigation';
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
          };
        }

        if (prevProps.page === IMPORT_JSON_PAGE) {
          return {
            showHeader: true, // no change
            showLogo: false,
            showBanner: true,
            showNetwork: false,
            showSettings: false,
            showGrayHeader: true,
          };
        }
        if (prevProps.page === CREATE_ACCOUNT_PAGE) {
          return {
            showHeader: true, // no change
            showLogo: false,
            showBanner: true,
            showNetwork: false,
            showSettings: false,
            showGrayHeader: true,
            showGrayBg: true,
          };
        }
        return {
          showHeader: true, // no change
          showLogo: false,
          showBanner: true,
          showNetwork: false,
          showSettings: false,
          showGrayHeader: false,
        };
      }
      if (prevProps.page === CONNECT_REQUEST_PAGE || prevProps.page === DAPP_REQUESTS_PAGE) {
        return {
          showHeader: true, // no change
          showLogo: true,
          showBanner: false,
          showNetwork: true,
          showSettings: false,
          showGrayHeader: false,
        };
      }
      return {
        showHeader: true, // no change
        showLogo: true,
        showBanner: false,
        showNetwork: true,
        showSettings: true,
        showGrayHeader: true,
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

  handleOptionsChange = option => {
    this.props.updateBackupPage(this.props.page);
    this.props.changePage(option.value);
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

  render() {
    const {
      props: {
        page,
        isLoading,
        networks,
        network,
        isConnected,
        isDeveloperMode,
        options,
        language,
      },
      state: {
        showLogo,
        showBanner,
        showNetwork,
        showSettings,
        showHeader,
        showGrayHeader,
        showGrayBg,
      },
    } = this;
    return (
      <CrustApp
        className={showGrayBg ? 'app-gray' : 'app'}
        isLoading={isLoading}
        page={page}
        networks={networks}
        network={network}
        isConnected={isConnected}
        onNetworkChange={this.handleNetworkChange}
        showLogo={showLogo}
        showBanner={showBanner}
        showNetwork={showNetwork}
        showSettings={showSettings}
        showHeader={showHeader}
        showGrayHeader={showGrayHeader}
        onLogoClick={this.onClick}
        options={options}
        onOptionsChange={this.handleOptionsChange}
        isDeveloperMode={isDeveloperMode}
        onToggleDeveloperMode={this.onToggleDeveloperMode}
        language={language}
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

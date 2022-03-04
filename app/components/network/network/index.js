import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { ChevronDown } from 'react-feather';
import CrustMenu from '../../common/crust-menu';
import FontRegular from '../../common/fonts/font-regular';
import { DISABLE_NETWORKS_PAGES_GROUP } from '../../../constants/navigation';
// import { shortenName } from '../../../services/wallet-service';
import './styles.css';
import { CRUST_NETWORK } from '../../../../lib/constants/networks';

class Network extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    const { page } = this.props;
    if (!DISABLE_NETWORKS_PAGES_GROUP.includes(page)) {
      this.setState({ anchorEl: event.currentTarget });
    }
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const {
      networks, network, onNetworkChange, colortheme, t
    } = this.props;
    return (
      <div>
        <div className="network-text-container" onClick={this.handleClick}>
          <FontRegular
            className="network-text"
            text={t(network.value === CRUST_NETWORK.value ? CRUST_NETWORK.text : network.text)}
            style={{ color: colortheme.text.secondary }}
          />
          <ChevronDown size={14} color={colortheme.text.secondary} />
        </div>
        <CrustMenu
          selected={network}
          options={networks}
          onChange={onNetworkChange}
          anchorEl={anchorEl}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default withTranslation()(Network);

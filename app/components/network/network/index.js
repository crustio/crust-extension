import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { ChevronDown } from 'react-feather';
import CrustMenu from '../../common/crust-menu';
import FontRegular from '../../common/fonts/font-regular';
import { DISABLE_NETWORKS_PAGES_GROUP } from '../../../constants/navigation';
// import { shortenName } from '../../../services/wallet-service';
import './styles.css';

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
      networks, network, onNetworkChange, colorTheme, t, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <div className="network-text-container" onClick={this.handleClick}>
          <FontRegular
            className="network-text"
            text={t(network.text)}
            style={{ color: colorTheme.text.secondary }}
          />
          <ChevronDown size={14} color={colorTheme.text.secondary} />
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

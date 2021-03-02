import React, { Component } from 'react';
import Clear from '@material-ui/icons/Clear';
import { withTranslation } from 'react-i18next';
import SubHeader from '../../components/common/sub-header';
import QRCodeForm from '../../components/qr-code/qr-code-form';
import { copyAccountMessage } from '../../../lib/services/static-message-factory-service';
import { findChainByName } from '../../../lib/constants/chain';
import './styles.css';

class QRCode extends Component {
  handleSubheaderBackBtn = () => {
    this.props.changePage(this.props.backupPage);
  };

  onCopy = () => {
    this.props.createToast({ message: copyAccountMessage(), type: 'info' });
  };

  render() {
    const { account, network, t } = this.props;
    const chain = findChainByName(network.value);
    const theme = chain.icon || 'polkadot';
    return (
      <div className="qr-code-container">
        <SubHeader
          icon={<Clear style={{ color: '#858B9C', fontSize: '18px' }} />}
          title={t('Receive')}
          backBtnOnClick={this.handleSubheaderBackBtn}
        />
        <QRCodeForm
          className="qr-code-form-container"
          theme={theme}
          account={account}
          onCopyAddress={this.onCopy}
          onClick={this.handleSubheaderBackBtn}
        />
      </div>
    );
  }
}

export default withTranslation()(QRCode);

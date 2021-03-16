import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import TransferFrom from '../../transfer/transfer-from';
import FooterButton from '../../common/footer-button';
import QR from '../../common/qr';
import './styles.css';

class QRCodeForm extends Component {
  render() {
    const {
      account, theme, onClick, onCopyAddress, t, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <TransferFrom
          theme={theme}
          address={account.address}
          canCopy
          onCopyAddress={onCopyAddress}
          alias={account.alias}
        />
        <QR
          theme={theme}
          className="qr-address"
          onCopyAddress={onCopyAddress}
          size={200}
          value={account.address}
        />
        <div className="qr-button-container">
          <FooterButton name={t('Done')} onClick={onClick} />
        </div>
      </div>
    );
  }
}

export default withTranslation()(QRCodeForm);

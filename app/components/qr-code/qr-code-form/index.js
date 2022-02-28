import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FooterButton from '../../common/footer-button';
import QR from '../../common/qr';
import './styles.css';
import ClickToCopyAddress from '../../common/click-to-copy-address';

class QRCodeForm extends Component {
  render() {
    const {
      account, theme, onClick, onCopyAddress, colortheme, t, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <QR
          theme={theme}
          className="qr-address"
          onCopyAddress={onCopyAddress}
          size={200}
          value={account.address}
        />
        <ClickToCopyAddress
          className="qr-copy-address clickable-icon"
          onCopyAddress={onCopyAddress}
          address={account.address}
          style={{ color: colortheme.text.primary }}
        />
        <div className="qr-button-container">
          <CopyToClipboard text={account.address} onCopy={onCopyAddress}>
            <FooterButton name={t('Copy Address')} />
          </CopyToClipboard>
        </div>
      </div>
    );
  }
}

export default withTranslation()(QRCodeForm);

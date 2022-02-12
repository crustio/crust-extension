import React, { Component } from 'react';
import TransferFrom from '../../transfer/transfer-from';
import { IconTransferFromTo } from '../../common/icon';
import ConfirmTo from '../confirm-to';

export default class ConfirmFromTo extends Component {
  render() {
    const {
      to, alias, from, theme, colorTheme, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <TransferFrom address={from} alias={alias} theme={theme} colorTheme={colorTheme} />
        <IconTransferFromTo colorTheme={colorTheme} />
        <ConfirmTo
          style={{
            marginTop: '10.8px',
            display: 'flex',
            alignItems: 'center',
            padding: '16px',
            height: '54.8px',
            background: colorTheme.card,
            borderRadius: '12px',
          }}
          address={to}
          theme={theme}
          colorTheme={colorTheme}
        />
      </div>
    );
  }
}

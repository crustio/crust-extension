import React, { Component } from 'react';
import TransferFrom from '../../transfer/transfer-from';
import { IconTransferFromTo } from '../../common/icon';
import ConfirmTo from '../confirm-to';

export default class ConfirmFromTo extends Component {
  render() {
    const {
      to, alias, from, theme, colortheme, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <TransferFrom address={from} alias={alias} theme={theme} colortheme={colortheme} />
        <IconTransferFromTo colortheme={colortheme} />
        <ConfirmTo
          style={{
            marginTop: '10.8px',
            display: 'flex',
            alignItems: 'center',
            padding: '16px',
            height: '54.8px',
            background: colortheme.card,
            borderRadius: '12px',
          }}
          address={to}
          theme={theme}
          colortheme={colortheme}
        />
      </div>
    );
  }
}

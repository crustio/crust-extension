import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import FontMedium from '../common/fonts/font-medium';
import FontRegular from '../common/fonts/font-regular';
import { convertBalanceToShow } from '../../../lib/services/numberFormatter';
import CruTokenIcon from '../../images/crust-logo-light.svg';
import CandyTokenIcon from '../../images/candy-icon.svg';
import CSMTokenIcon from '../../images/csm-icon.svg';
import './styles.css';

const iconMap = {
  CRU: CruTokenIcon,
  Candy: CandyTokenIcon,
  CSM: CSMTokenIcon,
};

const typeMap = {
  balance: 'Transferable',
  locked: 'Locked',
  reserved: 'Reserved',
  total: 'Total',
};

const createBalance = (type, token, t) => {
  const count = token[type];
  let value;
  if (token.tokenSymbol !== 'CRU' && token.tokenSymbol !== 'CSM') {
    value = count === '-' || !count ? '-' : convertBalanceToShow(count, token.decimals);
    return { value, title: '' };
  }
  const title = t(typeMap[type]);
  if (count === '-' || !count) {
    value = '-';
    return { title, value };
  }
  value = convertBalanceToShow(count, token.decimals);
  return { title, value };
};

class TokenList extends Component {
  renderBalances(token) {
    const { t, colortheme } = this.props;
    const balance = createBalance('balance', token, t);
    const locked = createBalance('locked', token, t);
    const reserved = createBalance('reserved', token, t);
    const total = createBalance('total', token, t);
    return (
      <div className="token-balances-container">
        <div className="token-balance-title-container">
          <div className="token-balance-item-title" style={{ color: colortheme.text.tertiary }}>
            {`${balance.title}${balance.title ? ':' : ''}`}
          </div>
          {token.locked && (
            <div
              className="token-balance-item-title"
              style={{ color: colortheme.text.tertiary }}
            >{`${locked.title}:`}</div>
          )}
          {token.reserved && (
            <div
              className="token-balance-item-title"
              style={{ color: colortheme.text.tertiary }}
            >{`${reserved.title}:`}</div>
          )}
          {token.total && (
            <div
              className="token-balance-item-title"
              style={{ color: colortheme.text.tertiary }}
            >{`${total.title}:`}</div>
          )}
        </div>
        <div className="token-balance-value-container" style={{ color: colortheme.text.primary }}>
          <FontRegular className="token-item-details-amount" text={balance.value} />
          {token.locked && (
            <FontRegular className="token-item-details-amount" text={locked.value} />
          )}
          {token.reserved && (
            <FontRegular className="token-item-details-amount" text={reserved.value} />
          )}
          {token.total && <FontRegular className="token-item-details-amount" text={total.value} />}
        </div>
      </div>
    );
  }

  render() {
    const { tokens, colortheme, ...otherProps } = this.props;
    return (
      <div {...otherProps}>
        {tokens.map(token => (
          <div
            key={token.tokenSymbol}
            className="token-item-container"
            style={{ background: colortheme.card }}
          >
            <div className="token-item-left">
              <img alt="token-symbol" src={iconMap[token.tokenSymbol]} className="token-icon" />
              <FontMedium
                text={token.tokenSymbol}
                className="token-item-details-symbol"
                style={{ color: colortheme.text.primary }}
              />
            </div>
            <div className="token-item-right">
              {this.renderBalances(token)}
              {/* <div style={{ display: 'flex' }}>
                <ArrowForwardIosOutlinedIcon className="token-item-icon" />
              </div> */}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default withTranslation()(TokenList);

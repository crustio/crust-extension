import React, { Component } from 'react';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import FontMedium from '../common/fonts/font-medium';
import FontRegular from '../common/fonts/font-regular';
import { convertBalanceToShow } from '../../../lib/services/numberFormatter';
import CruTokenIcon from '../../images/crust-logo.png';
import CandyTokenIcon from '../../images/candy-icon.svg';
import './styles.css';

export default class TokenList extends Component {
  render() {
    const { tokens, onTokenSelected, ...otherProps } = this.props;
    return (
      <div {...otherProps}>
        {tokens.map(token => (
          <div
            key={token.tokenSymbol}
            className="token-item-container"
            onClick={() => onTokenSelected(token)}
          >
            <div className="token-item-left">
              <img
                alt="token-symbol"
                src={token.tokenSymbol === 'CRU' ? CruTokenIcon : CandyTokenIcon}
                className="token-icon"
              />
              <FontMedium text={token.tokenSymbol} className="token-item-details-symbol" />
            </div>
            <div className="token-item-right">
              <FontRegular
                className="token-item-details-amount"
                text={convertBalanceToShow(token.balance, token.decimals)}
              />
              <div style={{ display: 'flex' }}>
                <ArrowForwardIosOutlinedIcon className="token-item-icon" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

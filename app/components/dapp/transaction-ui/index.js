import React, { Component } from 'react';
import FontRegular from '../../common/fonts/font-regular';
import './styles.css';

export default class TransactionUI extends Component {
  render() {
    const {
      txnUi, isInfoExpanded, handleInfoExpansion, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        {txnUi.map(
          txn => txn.label !== 'Info'
            && txn.label !== 'Lifetime' && (
              <div className="txn-txnui" key={txn.label}>
                <FontRegular text={txn.label} className="txn-txnui-label" />
                <FontRegular text={txn.value} className="txn-txnui-value" />
              </div>
          ),
        )}
      </div>
    );
  }
}

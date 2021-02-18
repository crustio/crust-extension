import React, { Component } from 'react';
import CrustExpansionPanel from '../../common/crust-expansion-panel';
import CrustRadioButtonGroup from '../../common/crust-radio-button-group';
import FontRegular from '../../common/fonts/font-regular';

export default class CreateAccountAdvancedConfig extends Component {
  render() {
    const {
      classes,
      keypairType,
      keypairTypes,
      onKeypairTypeChange,
      disableAccountSettings,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <CrustExpansionPanel disabled={disableAccountSettings} title="Advanced">
          <FontRegular
            text="Keypair Crypto Type"
            style={{
              fontSize: 14,
              fontWeight: 'bolder',
              margin: '14px 0px 14px 0px',
            }}
          />
          <CrustRadioButtonGroup
            options={keypairTypes}
            value={keypairType}
            onChange={onKeypairTypeChange}
            disabled={disableAccountSettings}
          />
        </CrustExpansionPanel>
      </div>
    );
  }
}

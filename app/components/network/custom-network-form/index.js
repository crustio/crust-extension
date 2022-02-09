import React, { Component } from 'react';
import CrustInput from '../../common/crust-input';
import FooterButton from '../../common/footer-button-old';
import './styles.css';

export default class CustomNetworkForm extends Component {
  render() {
    const {
      onSave,
      url,
      onChange,
      name,
      isURLValid,
      urlInvalidMessage,
      urlRef,
      colorTheme,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <CrustInput
          value={url}
          onChange={onChange}
          label="Custom URL"
          className="url-field"
          name={name}
          helperText={urlInvalidMessage}
          error={!isURLValid}
          inputRef={urlRef}
          colorTheme={colorTheme}
        />
        <FooterButton onClick={onSave} name="save" />
      </div>
    );
  }
}

import React, { Component } from 'react';
import Avatar from '../../common/identicon';
import CrustInput from '../../common/crust-input';
import './styles.css';

export default class TransferTo extends Component {
  render() {
    const {
      addressValue,
      toValue,
      size,
      theme,
      isError,
      label,
      propName,
      errorMessage,
      onChange,
      onBlur,
      inputRef,
      ...otherProps
    } = this.props;
    return (
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          {...otherProps}
        >
          <Avatar value={addressValue} size={size} theme={theme} />
          <div>
            <CrustInput
              className="transfer-to-input"
              onChange={onChange(propName)}
              placeholder={label}
              value={toValue}
              spellCheck={false}
            />
            {isError ? (
              <span className="tranfer-to-error-msg">{errorMessage}</span>
            ) : (
              <span className="place-holder"> </span>
            )}
          </div>
        </div>

      </div>
      
    );
  }
}

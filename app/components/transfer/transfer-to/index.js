import React, { Component } from 'react';
// import Avatar from '../../common/identicon';
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
      colortheme,
      ...otherProps
    } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
        {...otherProps}
      >
        {/*<Avatar style={{ marginRight: 22 }} value={addressValue} size={size} theme={theme} />*/}
        <div className="transfer-to-input-contianer">
          <CrustInput
            className="transfer-to-input"
            onChange={onChange(propName)}
            placeholder={label}
            value={toValue}
            spellCheck={false}
            colortheme={colortheme}
            style={{ background: colortheme.card }}
          />
          {isError ? (
            <span className="tranfer-to-error-msg">{errorMessage}</span>
          ) : (
            <span className="place-holder"> </span>
          )}
        </div>
      </div>
    );
  }
}

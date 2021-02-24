import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import './styles.css';

class ButtonMD extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    disabled: false,
  };

  render() {
    const { className, custom, ...otherProps } = this.props;
    const buttonMDClassNames = classNames({
      'button-md': true,
      'button-md-custom': custom
    });
    return (
      <div className={buttonMDClassNames}>
        <Button disabled={this.props.disabled} onClick={this.props.onClick} {...otherProps}>
          {this.props.children}
        </Button>
      </div>
    );
  }
}

export default ButtonMD;

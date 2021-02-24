import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import './styles.css';

class ButtonXL extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    custom: PropTypes.bool,
  };

  static defaultProps = {
    disabled: false,
    custom: false,
  };

  render() {
    const { className, custom, ...otherProps } = this.props;
    const buttonXLClassNames = classNames({
      'button-xl': true,
      'button-xl-custom1': custom,
    });
    return (
      <div className={buttonXLClassNames}>
        <Button
          className={className}
          disabled={this.props.disabled}
          onClick={this.props.onClick}
          {...otherProps}
        >
          {this.props.children}
        </Button>
      </div>
    );
  }
}

export default ButtonXL;

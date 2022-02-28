import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import './styles.css';

class ButtonCustom extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    disabled: false,
  };

  render() {
    const { custom, textColor, ...otherProps } = this.props;
    const styles = {
      fontSize: '18px',
      fontFamily: 'Roboto-Medium',
      fontStyle: 'normal',
      borderRadius: '12px',
      height: `${this.props.height ? this.props.height : '45px'}`,
      border: `${this.props.border ? this.props.border : 'none'}`,
      width: `${this.props.width ? this.props.width : '320px'}`,
      background: `${this.props.background ? this.props.background : 'white'}`,
      color: `${textColor || '#FF8D00'}`,
    };

    const buttonCustomClassNames = classNames({
      'button-custom': true,
      'button-custom1': custom,
    });
    return (
      <div className={buttonCustomClassNames}>
        <Button
          disabled={this.props.disabled}
          style={styles}
          onClick={this.props.onClick}
          {...otherProps}
        >
          {this.props.children}
        </Button>
      </div>
    );
  }
}

export default ButtonCustom;

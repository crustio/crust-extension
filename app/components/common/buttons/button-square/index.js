import React, { Component } from 'react';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import LockIcon from '../../../../images/lock-icon.png';
import './styles.css';

class ButtonSquare extends Component {
  render() {
    const { iconName, onClick } = this.props;

    return (
      <div className="button-square" onClick={onClick}>
        {iconName === 'lock' && (
          <img alt="lock-icon" src={LockIcon} className="button-square-icon" />
        )}
        {iconName === 'forward' && (
          <ArrowForwardOutlinedIcon style={{ color: 'white', width: '16px' }} />
        )}
      </div>
    );
  }
}

export default ButtonSquare;

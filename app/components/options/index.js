import React, { Component } from 'react';
import { IconSettings } from '../common/icon';
import { MANAGE_ACCOUNT_PAGE } from '../../constants/navigation';

export default class Options extends Component {
  handleClick = () => {
    const { changePage } = this.props;
    changePage(MANAGE_ACCOUNT_PAGE);
  };

  render() {
    const {
      isDeveloperMode, onToggleDeveloperMode, menuWidth, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <IconSettings style={{ color: '#111A34', fontSize: '18px' }} onClick={this.handleClick} />
      </div>
    );
  }
}

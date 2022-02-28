import React, { Component } from 'react';
import FontMedium from '../fonts/font-medium';
import IconContainer from '../icon-container';
import CrustMenu from '../crust-menu';
import './styles.css';

export default class SubHeader extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { colortheme } = this.props;
    const style = {
      textAlign: `${this.props.align ? this.props.align : 'center'}`,
      marginLeft: `${this.props.margin ? this.props.margin : 'none'}`,
      color: colortheme.text.primary,
    };
    const {
      icon, subMenu, onSubMenuOptionsChange, menuWidth, isBackIcon
    } = this.props;
    return (
      <div className="sub-header-container">
        <div className="sub-header-left">
          {isBackIcon && (
            <IconContainer
              className="sub-header-icon clickable-icon"
              onClick={this.props.backBtnOnClick}
            >
              {icon}
            </IconContainer>
          )}
          <FontMedium className="sub-header-title" text={this.props.title} style={style} />
        </div>
        {subMenu && subMenu.length > 0 && (
          <div>
            {/* <MoreVertIcon onClick={this.handleClick} color="#858B9C" className="more-list-icon" /> */}
            <CrustMenu
              options={subMenu}
              onChange={option => {
                onSubMenuOptionsChange(option);
              }}
              anchorEl={anchorEl}
              onClose={this.handleClose}
              width={menuWidth}
            />
          </div>
        )}
      </div>
    );
  }
}

import React, { Component } from 'react';
import FontRegular from '../fonts/font-regular';
import FontLight from '../fonts/font-light';
import './styles.css';

export default class ContentHeader extends Component {
  render() {
    const {
      title, description, colortheme, ...otherProps
    } = this.props;
    return (
      <div className="content-header-container" {...otherProps}>
        <FontRegular
          className="content-header-title"
          text={title}
          style={{ color: colortheme ? colortheme.text.primary : null }}
        />
        <FontLight
          className="content-header-description"
          text={description}
          style={{ color: colortheme ? colortheme.text.quaternary : '#858B9C' }}
        />
      </div>
    );
  }
}

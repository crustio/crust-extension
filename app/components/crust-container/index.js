import React, { PureComponent } from 'react';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import CrustLoader from '../common/crust-loader';

export default class CrustContainer extends PureComponent {
  render() {
    const { children, blocking, ...otherProps } = this.props;
    return (
      <BlockUi tag="div" blocking={blocking} loader={<CrustLoader />} {...otherProps}>
        {children}
      </BlockUi>
    );
  }
}

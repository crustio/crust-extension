import React, { Component } from 'react';
import Clear from '@material-ui/icons/Clear';
import SubHeader from '../../components/common/sub-header';
import CustomNetworkForm from '../../components/network/custom-network-form';
import { colortheme } from '../../../lib/constants/colors';
import './styles.css';

export default class CustomNetwork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: props.customNetwork.url ? props.customNetwork.url : '',
    };
    this.urlField = React.createRef();
  }

  componentDidUpdate(props) {
    if (!props.customNetworkError.customNetworkIsValid) {
      this.urlField.focus();
    }
    if (props.customNetworkSuccess) {
      this.props.changePage(this.props.backupPage);
      this.props.customNetworkValidationSuccess(false);
      this.props.customNetworkValidationError(null);
    }
  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubheaderBackBtn = () => {
    this.props.changePage(this.props.backupPage);
    this.props.customNetworkValidationSuccess(false);
    this.props.customNetworkValidationError(null);
  };

  handleSave = () => {
    const { url } = this.state;
    this.props.validateAndSaveURL(url);
  };

  render() {
    const {
      customNetworkError: { customNetworkIsValid, customNetworkErrorMessage },
      network,
    } = this.props;
    const { url } = this.state;
    return (
      <div>
        <SubHeader
          icon={<Clear style={{ color: 'rgba(255, 255, 255, 1)' }} />}
          title="Custom Network"
          backBtnOnClick={this.handleSubheaderBackBtn}
          isBackIcon
          colortheme={colortheme[network.value]}
        />
        <CustomNetworkForm
          className="custom-network-form"
          onSave={this.handleSave}
          url={url}
          name="url"
          onChange={this.onChange}
          isURLValid={customNetworkIsValid}
          urlInvalidMessage={customNetworkErrorMessage}
          urlRef={input => {
            this.urlField = input;
          }}
          colortheme={colortheme[network.value]}
        />
      </div>
    );
  }
}

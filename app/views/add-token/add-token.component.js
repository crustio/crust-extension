import React, { Component } from 'react';
import Clear from '@material-ui/icons/Clear';
import SubHeader from '../../components/common/sub-header';
import FooterButton from '../../components/common/footer-button';
import CrustInput from '../../components/common/crust-input';
import { DASHBOARD_PAGE } from '../../constants/navigation';
import './styles.css';

export default class AddToken extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      isAddressError: false,
      addressErrorMessage: '',
      addressPropName: 'address',
      propName: 'tname',
      tname: '',
      tokenLabel: 'Token contract address',
      tokenError: false,
      tokenErrorMessage: '',
    };

    this.inputRef = React.createRef();
  }

  onClick = () => {
    this.props.changePage(this.props.backupPage);
  };

  handleInputChange = prop => e => {
    this.setState({
      [prop]: e.target.value,
      tokenError: false,
      tokenErrorMessage: '',
    });
  };

  handleOnBlur = () => {};

  handleAddToken = async () => {
    const { isConnected, account } = this.props;
    const { tname } = this.state;
    if (!isConnected) {
      this.props.createToast({
        message: 'Wait for connection',
        type: 'error',
      });
    }

    if (!tname.trim()) {
      this.setState({
        tokenError: true,
        tokenErrorMessage: 'Invalid Address',
      });
    }

    const result = await this.props.addToken(tname);

    if (!result || result.status >= 400) {
      return
    }

    this.props.tokens.push(result)
    this.props.updateTokenList(this.props.tokens)
    this.props.changePage(DASHBOARD_PAGE)
  };

  render() {
    const { tname, propName, tokenLabel, tokenError, tokenErrorMessage } = this.state;

    return (
      <div>
        <SubHeader
          icon={<Clear style={{ color: 'rgba(255, 255, 255, 1)' }} />}
          title="Add Token"
          backBtnOnClick={this.onClick}
        />
        <div className="token-add-container">
          <CrustInput
            className="token-address-input"
            value={tname}
            onChange={this.handleInputChange(propName)}
            label={tokenLabel}
            error={tokenError}
            helperText={tokenErrorMessage}
            name={propName}
            inputRef={input => {
              this.inputRef = input;
            }}
            onBlur={this.handleOnBlur}
          />
          <FooterButton onClick={this.handleAddToken} name="ok" />
        </div>
      </div>
    );
  }
}

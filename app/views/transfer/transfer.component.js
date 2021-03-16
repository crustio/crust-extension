import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import { withTranslation } from 'react-i18next';
import SubHeader from '../../components/common/sub-header';
import TransferForm from '../../components/transfer/transfer-form';
import * as NavConstants from '../../constants/navigation';
import { INPUT_NUMBER_REGEX } from '../../../lib/constants/regex';
import { findChainByName } from '../../../lib/constants/chain';
import './styles.css';

class Transfer extends Component {
  constructor(props) {
    super(props);
    const {
      confirmDetails: { metadata },
      account,
      token,
      tokens,
    } = props;
    //TODO DP: Can be improved by using optional chaining operator
    this.state = {
      to: metadata ? metadata.to : '',
      amount: metadata ? metadata.amount : '',
      unit: metadata ? metadata.unit : '',
      alias: metadata ? metadata.account.alias : account.alias,
      from: metadata ? metadata.account.address : account.address,
      buttonText: 'Next',
      dropDownSelected: { ...token, value: token.tokenSymbol, text: token.tokenSymbol },
      dropDownList: tokens.map(t => {
        /* eslint-disable */
        t.value = t.tokenSymbol;
        t.text = t.tokenSymbol;
        /* eslint-enable */
        return t;
      }),
    };
    this.toInput = React.createRef();
    this.amountInput = React.createRef();
  }

  static getDerivedStateFromProps(props, state) {
    if (state.unit === '') {
      return { unit: props.unit };
    }
    return state;
  }

  componentDidMount() {
    this.props.dispatchSetTransferDetails({
      metadata: {
        ...this.props.confirmDetails.metadata,
        account: this.props.account,
        unit: this.state.unit,
        dropDownSelected: this.state.dropDownSelected,
      },
    });
  }

  componentDidUpdate(props) {
    if (props.units === null) {
      this.props.updateAppLoading(true);
    }
    if (props.success) {
      this.props.updateAppLoading(false);
      this.props.changePage(NavConstants.CONFIRM_PAGE);
    }
  }

  handleSubheaderBackBtn = () => {
    this.props.resetConfirmOnBoarding();
    this.props.clearTransferDetails();
    this.props.changePage(this.props.backupPage);
  };

  handleToChange = prop => e => {
    this.props.dispatchSetTransferDetails({
      metadata: {
        ...this.props.confirmDetails.metadata,
        to: e.target.value,
      },
    });
    this.setState({
      [prop]: e.target.value,
    });
    this.props.updateToAddress(e.target.value);
  };

  handleAmountChange = prop => e => {
    if (e.target.value === '' || INPUT_NUMBER_REGEX.test(e.target.value)) {
      this.props.dispatchSetTransferDetails({
        metadata: {
          ...this.props.confirmDetails.metadata,
          amount: e.target.value,
        },
      });
      this.setState({ [prop]: e.target.value });
    }
  };

  onAddressBookClick = () => {
    this.props.updateBackupPage(this.props.page);
    this.props.changePage(NavConstants.ADDRESS_BOOK_PAGE);
  };

  handleSendButton = () => {
    const { amount, unit, dropDownSelected } = this.state;
    const { toAddress } = this.props;
    if (toAddress !== '' && amount !== '' && amount !== undefined && dropDownSelected.balance !== '-') {
      this.props.confirmTransaction(
        toAddress,
        this.props.account,
        amount,
        unit,
        dropDownSelected,
        this.props.network,
      );
    } else {
      const error = {};
      if (toAddress === '') {
        error.isToAddressError = true;
        error.toAddressErrorMessage = this.props.t('Please input address.');
      }

      if (amount === '' || amount === undefined) {
        error.isAmountError = true;
        error.toAmountErrorMessage = this.props.t('Please input amount.');
      }

      if (dropDownSelected.balance === '-') {
        error.isAmountError = true;
        error.toAmountErrorMessage = this.props.t('Network error. Please check network.');
      }
      this.props.setTransferValidationError(error);
    }
  };

  handleUnitChange = e => {
    const dropDownSelected = this.state.dropDownList.find(u => u.value === e.target.value);
    this.props.dispatchSetTransferDetails({
      metadata: {
        ...this.props.confirmDetails.metadata,
        dropDownSelected,
      },
    });
    this.setState({ dropDownSelected });
  };

  render() {
    const {
      isToAddressError,
      toAddressErrorMessage,
      isAmountError,
      toAmountErrorMessage,
      toAddress,
      network,
      t,
    } = this.props;
    const {
      to, amount, alias, from, buttonText, dropDownList, dropDownSelected
    } = this.state;
    const chain = findChainByName(network.value);
    const theme = chain.icon || 'polkadot';
    const buttonTextT = t(buttonText);
    return (
      <div className="tranfer-page-container">
        <SubHeader
          icon={<ArrowBackIosOutlinedIcon style={{ color: '#858B9C', fontSize: '14px' }} />}
          title={t('Send')}
          backBtnOnClick={this.handleSubheaderBackBtn}
        />
        <TransferForm
          theme={theme}
          address={from}
          alias={alias}
          unit={dropDownSelected}
          amountPropName="amount"
          toPropName="to"
          units={dropDownList}
          to={toAddress || to}
          toRef={input => {
            this.toInput = input;
          }}
          amountRef={input => {
            this.amountInput = input;
          }}
          amount={amount}
          buttonText={buttonTextT}
          isToError={isToAddressError}
          toErrorText={t(toAddressErrorMessage)}
          isAmountError={isAmountError}
          amountErrorText={t(toAmountErrorMessage)}
          handleAmountChange={this.handleAmountChange}
          handleToChange={this.handleToChange}
          handleSendButton={this.handleSendButton}
          handleUnitOnChange={this.handleUnitChange}
          onAddressBookClick={this.onAddressBookClick}
        />
      </div>
    );
  }
}

export default withTranslation()(Transfer);

Transfer.defaultProps = {
  changePage: undefined,
  account: undefined,
};

Transfer.propTypes = {
  changePage: PropTypes.func,
  account: PropTypes.object,
};

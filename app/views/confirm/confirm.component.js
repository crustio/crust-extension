import React, { Component } from 'react';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import { withTranslation } from 'react-i18next';
import ConfirmForm from '../../components/confirm/confirm-form';
import SubHeader from '../../components/common/sub-header';
import { CREATE_ADDRESS_BOOK_PAGE, TRANSFER_PAGE } from '../../constants/navigation';
import { shortenAddress } from '../../services/wallet-service';
import { colortheme } from '../../../lib/constants/colors';
import './styles.css';

class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      errorText: '',
    };
  }

  componentDidMount() {
    this.props.resetConfirmOnBoarding();
  }

  openAddressBook = () => {
    this.props.changePage(CREATE_ADDRESS_BOOK_PAGE);
  };

  handleOnChange = prop => e => {
    const { value } = e.target;
    this.setState({
      [prop]: value,
    });
  };

  handleSend = async () => {
    const {
      confirmDetails, submitTransaction, isNewAddress, t
    } = this.props;
    const { password } = this.state;
    const tx = await submitTransaction(confirmDetails, password);

    if (tx === 'Password is incorrect.') {
      this.setState({
        errorText: tx,
      });
      return;
    }
    const result = await isNewAddress(tx.metadata.to);
    if (result.isNewAddress === true) {
      this.props.updateToAddress(tx.metadata.to);
      this.props.createToast({
        message: t('transferSubmitted', { var: shortenAddress(tx.txnHash) }),
        onClick: this.openAddressBook,
        type: 'addAddress',
        toastType: 'info',
        autoClose: false,
      });
    } else {
      this.props.createToast({
        message: t('transferSubmitted', { var: shortenAddress(tx.txnHash) }),
        type: 'info',
      });
    }
  };

  handleSubheaderBackBtn = () => {
    this.props.changePage(TRANSFER_PAGE);
  };

  render() {
    const { confirmDetails, network, t } = this.props;
    const { errorText, password } = this.state;
    const theme = 'substrate';
    return (
      <div
        className="confirm-container"
        style={{ background: colortheme[network.value].background }}
      >
        <SubHeader
          icon={<ArrowBackIosOutlinedIcon style={{ color: '#858B9C', fontSize: '18px' }} />}
          title={t('Send')}
          backBtnOnClick={this.handleSubheaderBackBtn}
          align="left"
          margin="30px"
          isBackIcon={false}
          colortheme={colortheme[network.value]}
        />
        <ConfirmForm
          confirmDetails={confirmDetails}
          handleSend={this.handleSend}
          handleBack={this.handleSubheaderBackBtn}
          buttonText={t('Send')}
          theme={theme}
          password={password}
          handleOnChange={this.handleOnChange}
          errorText={errorText}
          colortheme={colortheme[network.value]}
        />
      </div>
    );
  }
}

export default withTranslation()(Confirm);

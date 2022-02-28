import React, { Component } from 'react';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import { withTranslation } from 'react-i18next';
import SubHeader from '../../components/common/sub-header';
import CreateContactForm from '../../components/address-book/create-contact-form';
import CrustValidator from '../../utils/crust-validator';
import { ADDRESS_BOOK_PAGE } from '../../constants/navigation';
import validator from '../../utils/crust-validator/validator';
import { colortheme } from '../../../lib/constants/colors';
import './styles.css';

const FnameRequiredErrorMessage = 'Firstname required';
const AddressRequiredErrorMessage = 'Address required';

class CreateAddressBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      isAddressError: false,
      addressErrorMessage: '',
      addressPropName: 'address',
      fnamePropName: 'fname',
      fname: '',
      isFnameError: false,
      fnameErrorMessage: '',
      lnamePropName: 'lname',
      lname: '',
      network: '',
    };
    this.lnameValidator = new CrustValidator(validator.lnameValidation);
    this.fnameValidator = new CrustValidator(validator.fnameValidation);
    this.addressInputRef = React.createRef();
    this.fnameInputRef = React.createRef();
    this.lnameInputRef = React.createRef();
  }

  static getDerivedStateFromProps(props, state) {
    if (state.address === '') return { network: props.network, address: props.toAddress };
    return state;
  }

  onSubmit = () => {
    const {
      address, fname, lname, network
    } = this.state;
    const { t } = this.props;
    const { isFnameError, fnameErrorMessage } = this.validateFname(fname);
    this.setState({
      isFnameError,
      fnameErrorMessage,
    });
    const { isLnameError, lnameErrorMessage } = this.validateLname(lname);
    this.setState({
      isLnameError,
      lnameErrorMessage,
    });
    const { isAddressError, addressErrorMessage } = this.validateAddress(address);
    this.setState({
      isAddressError,
      addressErrorMessage,
    });
    if (!isFnameError && !isAddressError && !isLnameError) {
      this.props.submitContact(
        {
          address,
          fname,
          lname,
          network,
        },
        t,
      );
    }
  };

  handleAddressOnBlur = () => {
    const { address } = this.state;
    const { isAddressError, addressErrorMessage } = this.validateAddress(address);
    this.setState({
      isAddressError,
      addressErrorMessage,
    });
  };

  handleFnameOnBlur = () => {
    const { isFnameError, fnameErrorMessage } = this.validateFname(this.state.fname);
    if (this.state.fname !== '' || !isFnameError) {
      this.setState({
        isFnameError,
        fnameErrorMessage,
      });
    }
  };

  handleLnameOnBlur = () => {
    const { isLnameError, lnameErrorMessage } = this.validateLname(this.state.lname);
    if (this.state.lname !== '' || !isLnameError) {
      this.setState({
        isLnameError,
        lnameErrorMessage,
      });
    }
  };

  handleSubheaderBackBtn = () => {
    this.props.changePage(ADDRESS_BOOK_PAGE);
  };

  handleInputChange = prop => e => {
    this.setState({
      [prop]: e.target.value,
    });
  };

  handelNetworkChange = e => {
    const network = e.target.value;
    this.setState({ network });
  };

  validateAddress(address) {
    let { isAddressError, addressErrorMessage } = this.state;
    if (address.length === 0) {
      isAddressError = true;
      addressErrorMessage = AddressRequiredErrorMessage;
    } else {
      isAddressError = false;
      addressErrorMessage = '';
    }
    return {
      isAddressError,
      addressErrorMessage,
    };
  }

  validateFname(fname) {
    let { isFnameError, fnameErrorMessage } = this.state;
    if (fname.length === 0) {
      isFnameError = true;
      fnameErrorMessage = FnameRequiredErrorMessage;
    } else if (fname !== '') {
      const fnameValidation = this.fnameValidator.validate({
        fname,
      });
      if (!fnameValidation.isValid) {
        isFnameError = true;
        fnameErrorMessage = fnameValidation.fname.message;
      } else {
        isFnameError = false;
        fnameErrorMessage = null;
      }
    } else {
      isFnameError = false;
      fnameErrorMessage = null;
    }
    return {
      isFnameError,
      fnameErrorMessage,
    };
  }

  validateLname(lname) {
    let { isLnameError, lnameErrorMessage } = this.state;

    if (lname !== '') {
      const lnameValidation = this.lnameValidator.validate({
        lname,
      });
      if (!lnameValidation.isValid) {
        isLnameError = true;
        lnameErrorMessage = lnameValidation.lname.message;
      } else {
        isLnameError = false;
        lnameErrorMessage = null;
      }
    }
    return {
      isLnameError,
      lnameErrorMessage,
    };
  }

  render() {
    const {
      address,
      isAddressError,
      addressPropName,
      addressErrorMessage,
      fname,
      fnamePropName,
      isFnameError,
      fnameErrorMessage,
      lname,
      lnamePropName,
      isLnameError,
      lnameErrorMessage,
      network,
    } = this.state;
    const { networks, t } = this.props;
    const theme = 'substrate';
    const fnameLabelT = t('Firstname');
    const lnameLabelT = t('Lastname');
    const buttonTextT = t('Submit');
    return (
      <div
        className="create-address-book-container"
        style={{ background: colortheme[network.value].background }}
      >
        <SubHeader
          icon={<ArrowBackIosOutlinedIcon style={{ color: '#858B9C', fontSize: '14px' }} />}
          title={t('Address Book')}
          backBtnOnClick={this.handleSubheaderBackBtn}
          isBackIcon
          colortheme={colortheme[network.value]}
        />
        <CreateContactForm
          className="create-address-book-form"
          address={address}
          theme={theme}
          isAddressError={isAddressError}
          addressPropName={addressPropName}
          addressErrorMessage={addressErrorMessage}
          addressInputRef={input => {
            this.addressInputRef = input;
          }}
          handleToChange={this.handleInputChange}
          fname={fname}
          fnameLabel={fnameLabelT}
          fnamePropName={fnamePropName}
          isFnameError={isFnameError}
          fnameErrorMessage={fnameErrorMessage}
          fnameInputRef={input => {
            this.fnameInputRef = input;
          }}
          handleFnameChange={this.handleInputChange}
          handleFnameOnBlur={this.handleFnameOnBlur}
          lname={lname}
          lnameLabel={lnameLabelT}
          lnamePropName={lnamePropName}
          isLnameError={isLnameError}
          lnameErrorMessage={lnameErrorMessage}
          lnameInputRef={input => {
            this.lnameInputRef = input;
          }}
          handleLnameChange={this.handleInputChange}
          handleLnameOnBlur={this.handleLnameOnBlur}
          buttonName={buttonTextT}
          onSubmit={this.onSubmit}
          networks={networks}
          network={network}
          onNetworkChange={this.handelNetworkChange}
          colortheme={colortheme[network.value]}
        />
      </div>
    );
  }
}

export default withTranslation()(CreateAddressBook);

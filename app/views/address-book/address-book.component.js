import React, { Component } from 'react';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import { withTranslation } from 'react-i18next';
import SubHeader from '../../components/common/sub-header';
import * as NavConstants from '../../constants/navigation';
import { copyAccountMessage } from '../../../lib/services/static-message-factory-service';
import AddressList from '../../components/address-book/address-list';
import DraggableDialog from '../../components/common/confirm-dialog';
import {
  ADDRESS_BOOK_MENU_OPTIONS,
  ADDRESS_BOOK_OPTIONS,
  ADD_ADDRESS,
  REMOVE,
} from '../../constants/options';
import FooterButton from '../../components/common/footer-button';
import FooterWithTwoButton from '../../components/common/footer-with-two-button';
import { colortheme } from '../../../lib/constants/colors';
import './styles.css';

class AddressBook extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      isOpen: false,
      isSelectIcon: true,
      showSettings: true,
      headerText: 'Address Book',
      showFooterModal: false,
      selectedAddressList: this.props.selectedAddress,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.backupPage === NavConstants.TRANSFER_PAGE) {
      return {
        headerText: 'Select To Address',
        showSettings: false,
        isSelectIcon: false,
      };
    }
    return state;
  }

  async componentDidMount() {
    await this.props.getContacts();
  }

  handleFooterClick = event => {
    this.setState({ showFooterModal: true });
  };

  handleFooterCancel = () => {
    this.setState({ showFooterModal: false });
  };

  handleSubheaderBackBtn = () => {
    this.props.changePage(this.props.backupPage);
    this.props.updateBackupPage(NavConstants.DASHBOARD_PAGE);
  };

  onCopyAddress = () => {
    const { t } = this.props;
    this.props.createToast({ message: t(copyAccountMessage()), type: 'info' });
  };

  handelChangeToAddress = async (e, account) => {
    const { t } = this.props;
    if (this.props.backupPage === NavConstants.TRANSFER_PAGE) {
      if (e.target.tagName === 'DIV') {
        this.props.createToast({ message: t(copyAccountMessage()), type: 'info' });
      } else {
        const { address } = account;
        if (address) {
          this.props.updateToAddress(address);
          this.props.changePage(NavConstants.TRANSFER_PAGE);
          this.props.updateBackupPage(NavConstants.DASHBOARD_PAGE);
        }
      }
    }
  };

  handleOnSubMenuOptionsChange = async option => {
    if (option.value === ADD_ADDRESS.value) {
      this.props.resetToAddress();
      this.props.changePage(NavConstants.CREATE_ADDRESS_BOOK_PAGE);
    }
  };

  handleAddAddressClick = () => {
    this.props.resetToAddress();
    this.props.changePage(NavConstants.CREATE_ADDRESS_BOOK_PAGE);
  };

  handleAddressBookOptionsChange = async (option, contact) => {
    if (option.value === REMOVE.value) {
      this.setState({ isOpen: true });
    }
  };

  handleCloseDialog = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  handleYes = () => {
    const { removeContact, t, selectedAddress } = this.props;
    for (let i = 0; i < selectedAddress.length; i++) {
      removeContact(selectedAddress[i], t);
    }
    this.props.updateSelectedAddress([]);
    this.setState({ isOpen: false, selectedAddressList: [] });
    this.handleFooterCancel();
  };

  handleSelectedAddressChange = (e, addressItem) => {
    const { selectedAddress } = this.props;
    const selectedAddressList = selectedAddress;
    const index = selectedAddressList.findIndex(e => e.address === addressItem.address);
    if (index !== -1) {
      selectedAddressList.splice(index, 1);
    } else {
      selectedAddressList.push(addressItem);
    }
    this.props.updateSelectedAddress(selectedAddressList);
    this.setState({
      selectedAddressList,
    });
  };

  render() {
    const {
      addressBook, network, selectedAddress, t
    } = this.props;
    const {
      isOpen,
      showSettings,
      headerText,
      showFooterModal,
      isSelectIcon,
      selectedAddressList,
    } = this.state;
    const theme = 'substrate';
    const optionsHeader = ADDRESS_BOOK_MENU_OPTIONS.map(o => ({ ...o, text: o.text }));

    const options = ADDRESS_BOOK_OPTIONS.map(o => ({ ...o, text: o.text }));
    const headerTextT = t(headerText);
    return (
      <div
        className="address-book-root-container"
        style={{ background: colortheme[network.value].background }}
      >
        <SubHeader
          icon={<ArrowBackIosOutlinedIcon style={{ color: '#858B9C', fontSize: '14px' }} />}
          title={headerTextT}
          backBtnOnClick={this.handleSubheaderBackBtn}
          subMenu={showSettings ? optionsHeader : null}
          showSettings={showSettings}
          onSubMenuOptionsChange={this.handleOnSubMenuOptionsChange}
          isBackIcon
          colortheme={colortheme[network.value]}
        />
        <div className="manage-address-book">
          <div className="manage-address-book-container">
            {addressBook.length > 0 ? (
              <AddressList
                className="address-book-container"
                addressBook={addressBook}
                selectedAddress={selectedAddress}
                onMoreMenuOptionsChange={this.handleAddressBookOptionsChange}
                theme={theme}
                isSelectIcon={isSelectIcon}
                onCopyAddress={this.onCopyAddress}
                handelChangeToAddress={this.handelChangeToAddress}
                network={network}
                colortheme={colortheme[network.value]}
                showFooterModal={showFooterModal}
                handleFooterClick={this.handleFooterClick}
                handleFooterCancel={this.handleFooterCancel}
                updateSelectedAddress={this.handleSelectedAddressChange}
              /> /*(
              <div className="empty-address-book-container">
                <EmptyDashboard
                  className="empty-list-text"
                  text={t('Click here to add an address!')}
                />
                <div className="address-book-add-button">
                  <ButtonMD color="dashboard" onClick={this.handleAddAddressClick}>
                    {t('Add Address')}
                  </ButtonMD>
                </div>
              </div>
            )*/
            ) : null}

            <div>
              <DraggableDialog
                isOpen={isOpen}
                handleClose={this.handleCloseDialog}
                handleYes={this.handleYes}
                noText={t('No')}
                yesText={t('Yes')}
                title={t('Remove contact')}
                msg={t('Do you want to remove this address?')}
              />
            </div>
          </div>
        </div>
        {selectedAddressList.length === 0 ? (
          <FooterButton
            onClick={this.handleAddAddressClick}
            name={t('Create')}
            style={{ marginLeft: 20 }}
          />
        ) : (
          <FooterWithTwoButton
            onNextClick={this.handleAddAddressClick}
            onBackClick={() => this.setState({ isOpen: true })}
            backButtonName={t('Remove')}
            nextButtonName={t('Create')}
            nextColor={colortheme[network.value].button.primary.text}
            nextBackground={colortheme[network.value].button.primary.main}
            backColor={colortheme[network.value].button.secondary.text}
            backBackground={colortheme[network.value].button.secondary.main}
          />
        )}
      </div>
    );
  }
}

export default withTranslation()(AddressBook);

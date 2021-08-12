import React, { Component } from 'react';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import { withTranslation } from 'react-i18next';
import SubHeader from '../../components/common/sub-header';
import * as NavConstants from '../../constants/navigation';
import { copyAccountMessage } from '../../../lib/services/static-message-factory-service';
import AddressList from '../../components/address-book/address-list';
import EmptyDashboard from '../../components/empty-dashboard';
import ButtonMD from '../../components/common/buttons/button-md';
import DraggableDialog from '../../components/common/confirm-dialog';
import {
  ADDRESS_BOOK_MENU_OPTIONS,
  ADDRESS_BOOK_OPTIONS,
  ADD_ADDRESS,
  REMOVE,
} from '../../constants/options';
import './styles.css';

class AddressBook extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      isOpen: false,
      isMoreVertIconVisible: true,
      showSettings: true,
      headerText: 'Address Book',
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.backupPage === NavConstants.TRANSFER_PAGE) {
      return {
        headerText: 'Select To Address',
        showSettings: false,
        isMoreVertIconVisible: false,
      };
    }
    return state;
  }

  async componentDidMount() {
    await this.props.getContacts();
  }

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
      this.setState({ isOpen: true, contact });
    }
  };

  handleCloseDialog = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  handleYes = () => {
    const { contact } = this.state;
    const { removeContact, t } = this.props;
    removeContact(contact, t);
    this.setState({ isOpen: false });
  };

  render() {
    const { addressBook, t } = this.props;
    const {
      isOpen, showSettings, headerText, isMoreVertIconVisible
    } = this.state;
    const theme = 'substrate';
    const optionsHeader = ADDRESS_BOOK_MENU_OPTIONS.map(o => ({ ...o, text: o.text }));

    const options = ADDRESS_BOOK_OPTIONS.map(o => ({ ...o, text: o.text }));
    const headerTextT = t(headerText);
    return (
      <div className="address-book-root-container">
        <SubHeader
          icon={<ArrowBackIosOutlinedIcon style={{ color: '#858B9C', fontSize: '14px' }} />}
          title={headerTextT}
          backBtnOnClick={this.handleSubheaderBackBtn}
          subMenu={showSettings ? optionsHeader : null}
          showSettings={showSettings}
          onSubMenuOptionsChange={this.handleOnSubMenuOptionsChange}
        />
        <div className="manage-address-book">
          <div className="manage-address-book-container">
            {addressBook.length > 0 ? (
              <AddressList
                className="address-book-container"
                addressBook={addressBook}
                moreMenu={options}
                onMoreMenuOptionsChange={this.handleAddressBookOptionsChange}
                theme={theme}
                isMoreVertIconVisible={isMoreVertIconVisible}
                onCopyAddress={this.onCopyAddress}
                handelChangeToAddress={this.handelChangeToAddress}
              />
            ) : (
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
            )}

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
      </div>
    );
  }
}

export default withTranslation()(AddressBook);

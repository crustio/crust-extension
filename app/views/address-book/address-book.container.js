import { connect } from 'react-redux';
import AddressBook from './address-book.component';
import { changePage, updateBackupPage } from '../../containers/actions';
import { createToast } from '../../constants/toast';
import { getContacts, removeContact } from './actions';
import { updateToAddress, resetToAddress } from '../../actions/address-book';
import { updateSelectedAddress } from '../manage-account/actions';

const mapStateToProps = state => ({
  addressBook: state.addressBookReducer.addressBook,
  backupPage: state.appStateReducer.backupPage,
  network: state.networkReducer.network,
  selectedAddress: state.manageAccountReducer.selectedAddress,
});

const mapDispatchToProps = {
  changePage,
  updateBackupPage,
  createToast,
  getContacts,
  removeContact,
  updateToAddress,
  resetToAddress,
  updateSelectedAddress,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressBook);

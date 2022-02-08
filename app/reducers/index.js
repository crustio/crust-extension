import { combineReducers } from 'redux';
import networkReducer from './network';
import accountReducer from './account';
import toast from './toast';
import termsReducer from '../views/terms/reducer';
import appStateReducer from '../containers/reducer';
import signUpReducer from '../views/sign-up/reducer';
import createAccountReducer from '../views/create-account/reducer';
import unlockCrustReducer from '../views/sign-in/reducer';
import transferReducer from '../views/transfer/reducer';
import dashboardReducer from '../views/dashboard/reducer';
import manageAccountReducer from '../views/manage-account/reducer';
import connectRequestReducer from '../views/connect-request/reducer';
import dAppReducer from './dapp';
import addressBookReducer from './address-book';
import exportAccountReducer from '../views/export-account/reducer';
import importJsonReducer from '../views/import-json/reducer';

export default combineReducers({
  networkReducer,
  accountReducer,
  toast,
  termsReducer,
  appStateReducer,
  signUpReducer,
  createAccountReducer,
  unlockCrustReducer,
  transferReducer,
  dashboardReducer,
  manageAccountReducer,
  connectRequestReducer,
  dAppReducer,
  addressBookReducer,
  exportAccountReducer,
  importJsonReducer,
});

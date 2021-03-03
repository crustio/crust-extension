import { EXPORTING_ACCOUNT } from './action-types';

export const updateExportingAccount = address => ({
  type: EXPORTING_ACCOUNT,
  address,
});

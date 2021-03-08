import { EXPORTING_ACCOUNT } from './action-types';

export const updateExportingAccount = account => ({
  type: EXPORTING_ACCOUNT,
  account,
});

import { getStore } from '../../store/store-provider';

export const getCrustTokens = () => {
  const {
    curstTokensState: { tokens },
  } = getStore().getState();
  return tokens;
};

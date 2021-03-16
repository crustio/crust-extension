
export const UPDATE_TOKEN_LIST = 'CRUST_TOKENS/UPDATE_LIST';

export function updateTokenList(tokens) {
  return {
    type: UPDATE_TOKEN_LIST,
    payload: tokens,
  };
}

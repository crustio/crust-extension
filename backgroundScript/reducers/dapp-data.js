import { UPDATE_DAPP_METADATA, UPDATE_DAPP_METADATA_LIST } from '../actions/dapp-data';

const initialState = {
  metaData: undefined,
};

const dAppDataState = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_DAPP_METADATA:
      return {
        ...state,
        metaData: action.metaData,
      };
    case UPDATE_DAPP_METADATA_LIST:
      return {
        ...state,
        metadata_list: action.metadata_list,
      };
    default:
      return state;
  }
};

export default dAppDataState;

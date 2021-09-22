export const UPDATE_DAPP_METADATA = 'DAPP/UPDATE_DATA';
export const UPDATE_DAPP_METADATA_LIST = 'DAPP/UPDATE_METADATA_LIST';

export const dispatchUpdateDAppData = metaData => ({
  type: UPDATE_DAPP_METADATA,
  metaData,
});

export const dispatchUpdateMetadata = metadata_list => ({
  type: UPDATE_DAPP_METADATA_LIST,
  metadata_list,
});

import { findSi, SI } from '@polkadot/util/format/si';
import keyring from '@polkadot/ui-keyring';
import { getSpecTypes } from '@polkadot/types-known';
import { updateChainMetadata } from '../services/store-service';

const femtoUnit = findSi('f');
const units = SI.filter(x => x.power >= femtoUnit.power);
const DEFAULT_SS58 = 42;
const DEFAULT_DECIMALS = 12;
const DEFAULT_SYMBOL = 'CRU';

let keyringInited = false;

const Chain = {
  units,
  baseUnit: units[0],
  tokenSymbol: DEFAULT_SYMBOL,
  ss58Format: DEFAULT_SS58,
  tokenDecimals: DEFAULT_DECIMALS,
  metadata: undefined,
  api: undefined,
  networkValue: '',
};

function parseProps(prop) {
  try {
    const mProp = JSON.parse(prop.toHuman());
    if (mProp && mProp instanceof Array) {
      return mProp[0];
    }
    return mProp;
  } catch (e) {
    if (prop === null || prop === undefined) {
      return null;
    }
    const p = prop.toString();
    if (p.startsWith('[') && p.endsWith(']')) return p.substr(1, p.length - 2);
    return p;
  }
}

const DEF_PROPS = {
  ss58Format: null,
  tokenDecimals: null,
  tokenSymbol: null,
};
const getProperties = async api => {
  try {
    const props = await api.rpc.system.properties();
    return props || DEF_PROPS;
  } catch (e) {
    return DEF_PROPS;
  }
};

export const setChain = async (api, network) => {
  try {
    const {
      // eslint-disable-next-line camelcase
      def_ss58 = DEFAULT_SS58,
      // eslint-disable-next-line camelcase
      def_decimals = DEFAULT_DECIMALS,
      unit = DEFAULT_SYMBOL,
    } = network;
    const { ss58Format, tokenDecimals, tokenSymbol } = await getProperties(api);
    const chainSS58 = parseProps(ss58Format);
    const decimals = parseProps(tokenDecimals);
    const symbol = parseProps(tokenSymbol);
    // eslint-disable-next-line
    console.info('ss58-->', chainSS58, def_ss58, network);
    // eslint-disable-next-line camelcase
    const mSS58 = chainSS58 !== null ? Number(chainSS58) : def_ss58;
    // eslint-disable-next-line camelcase
    const mDecimals = decimals !== null ? Number(decimals) : def_decimals;
    const mSymbol = symbol !== null ? `${symbol}` : unit;
    Chain.networkValue = network.value;
    Chain.ss58Format = mSS58;
    Chain.api = api;
    const units = SI.filter(x => x.power >= -mDecimals);
    Chain.units = units;
    // eslint-disable-next-line prefer-destructuring
    Chain.baseUnit = units[0];
    Chain.tokenSymbol = mSymbol;
    Chain.tokenDecimals = mDecimals;

    if (!keyringInited) {
      // eslint-disable-next-line
      console.log('loadAll--', 'start');
      keyring.loadAll({
        ss58Format: Chain.ss58Format,
        type: 'sr25519',
      });
      keyringInited = true;
    }
    Chain.metadata = Buffer.from(api.runtimeMetadata.asCallsOnly.toU8a()).toString('base64');

    await updateChainMetadata({
      genesisHash: api.genesisHash.toHex(),
      metaCalls: Chain.metadata,
      specVersion: api.runtimeVersion.specVersion.toNumber(),
      types: getSpecTypes(
        api.registry,
        network.value,
        api.runtimeVersion.specName,
        api.runtimeVersion.specVersion,
      ),
    });
  } catch (err) {
    // eslint-disable-next-line
    console.info('setChain--', err);
  }
};

export const getUnits = () => Chain.units;

export const getBaseUnit = () => Chain.baseUnit;

export const getTokenSymbol = () => Chain.tokenSymbol;

export const getTokenDecimals = () => Chain.tokenDecimals;

export const getSs58Format = () => Chain.ss58Format;

export const getApi = () => Chain.api;

/**
 *  if (!Chain.api || (await getOfflineMode())) {
     registry.setChainProperties(
       registry.createType('ChainProperties', {
         ss58Format: getSs58Format(),
        tokenDecimals: getTokenDecimals(),
         tokenSymbol: getTokenSymbol(),
       }),
     );
     Chain.api = { registry };
     return registry;
   }
 * */
export const getRegistry = () => Chain.api.registry;

export const getNetworkValue = () => Chain.networkValue;

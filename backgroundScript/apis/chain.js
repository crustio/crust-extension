import { SI, findSi } from '@polkadot/util/format/si';
import keyring from '@polkadot/ui-keyring';

const femtoUnit = findSi('f');
const units = SI.filter(x => x.power >= femtoUnit.power);
const DEFAULT_SS58 = 42;
const DEFAULT_DECIMALS = 15;

let keyringInited = false;

const Chain = {
  units,
  baseUnit: units[0],
  tokenSymbol: '',
  ss58Format: DEFAULT_SS58,
  tokenDecimals: DEFAULT_DECIMALS,
  metadata: undefined,
  api: undefined,
};

function parseProps(prop) {
  try {
    const mProp = JSON.parse(prop.toHuman());
    if (mProp && mProp instanceof Array) {
      return mProp[0];
    }
    return mProp;
  } catch (e) {
    const p = prop.toString();
    if (p.startsWith('[') && p.endsWith(']')) return p.substr(1, p.length - 2);
    return p;
  }
}

export const setChain = async api => {
  try {
    // eslint-disable-next-line
    console.log('seChain--', 'start');
    const { ss58Format, tokenDecimals, tokenSymbol } = await api.rpc.system.properties();
    const chainSS58 = parseProps(ss58Format);
    const decimals = parseProps(tokenDecimals);
    const symbol = parseProps(tokenSymbol);
    const mSS58 = chainSS58 !== null ? Number(chainSS58) : DEFAULT_SS58;
    const mDecimals = decimals !== null ? Number(decimals) : DEFAULT_DECIMALS;
    const mSymbol = symbol !== null ? `${symbol}` : 'CRU';

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
  } catch (err) {
    // eslint-disable-next-line
    console.info('setChain--', err);
    throw new Error('error in setUnits');
  }
};

export const getUnits = () => Chain.units;

export const getBaseUnit = () => Chain.baseUnit;

export const getTokenSymbol = () => Chain.tokenSymbol;

export const getTokenDecimals = () => Chain.tokenDecimals;

export const getSs58Format = () => Chain.ss58Format;

export const getMetaCalls = () => Chain.metadata;

export const getApi = () => Chain.api;

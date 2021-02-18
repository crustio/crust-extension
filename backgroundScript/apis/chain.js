import { SI, findSi } from '@polkadot/util/format/si';
import addressDefaults from '@polkadot/util-crypto/address/defaults';
import { u32 as U32 } from '@polkadot/types';
import registry from './type-Registry';
import keyring from '@polkadot/ui-keyring';

const femtoUnit = findSi('f');
const units = SI.filter(x => x.power >= femtoUnit.power);
const DEFAULT_SS58 = new U32(registry, addressDefaults.prefix);
const DEFAULT_DECIMALS = new U32(registry, 15);

let keyringInited = false;

const Chain = {
  units,
  baseUnit: units[0],
  tokenSymbol: '',
  ss58Format: 42,
  tokenDecimals: 15,
  metadata: undefined,
  api: undefined,
};

export const setChain = async api => {
  try {
    const { ss58Format, tokenDecimals, tokenSymbol } = await api.rpc.system.properties();
    const ss58 = ss58Format.unwrapOr(DEFAULT_SS58).toNumber();

    Chain.api = api;
    const units = SI.filter(x => x.power >= -tokenDecimals);
    Chain.units = units;
    // eslint-disable-next-line prefer-destructuring
    Chain.baseUnit = units[0];
    Chain.tokenSymbol = 'CRU';
    Chain.tokenDecimals = tokenDecimals.unwrapOr(DEFAULT_DECIMALS).toNumber();
    if (ss58) {
      Chain.ss58Format = ss58;
    } else {
      Chain.ss58Format = 42;
    }

    if (!keyringInited) {
      keyring.loadAll({
        ss58Format: Chain.ss58Format,
        type: 'ed25519',
      });

      keyringInited = true;
    }

    Chain.metadata = Buffer.from(api.runtimeMetadata.asCallsOnly.toU8a()).toString('base64');
  } catch (err) {
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

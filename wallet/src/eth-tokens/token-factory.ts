import {ERC20} from "../eth/tokens/ERC20";
/**
 * Augur token interface
 */
import {EthEngine} from "../eth/eth-engine";
import {AragonTokenTestnet} from "./aragon-testnet";
import {AugurTokenTestnet} from "./augur-testnet";
import {BatTokenTestnet} from "./bat-testnet";
import {EosTokenTestnet} from "./eos-testnet";
import {GnosisTokenTestnet} from "./gnosis-testnet";
import {GolemTokenTestnet} from "./golem-testnet";
import {SaltTokenTestnet} from "./salt-testnet";

export enum TOKENS {
  AUGUR = 1,
  GOLEM,
  GNOSIS,
  BAT,
  ARAGON,
  EOS,
  SALT,
}

export class TokenFactory {
  public static GetToken(token: TOKENS, engine: EthEngine): ERC20 {
    switch (token) {
      case TOKENS.GOLEM: {
        return new GolemTokenTestnet(engine);
      }
      case TOKENS.AUGUR: {
        return new AugurTokenTestnet(engine);
      }
      case TOKENS.GNOSIS: {
        return new GnosisTokenTestnet(engine);
      }
      case TOKENS.BAT: {
        return new BatTokenTestnet(engine);
      }
      case TOKENS.ARAGON: {
        return new AragonTokenTestnet(engine);
      }
      case TOKENS.EOS: {
        return new EosTokenTestnet(engine);
      }
      case TOKENS.SALT: {
        return new SaltTokenTestnet(engine);
      }
    }
  }
}
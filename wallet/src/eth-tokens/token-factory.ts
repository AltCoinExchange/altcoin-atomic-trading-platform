/**
 * Augur token interface
 */
import {EthEngine} from "../eth/eth-engine";
import {AragonTokenMainnet, AragonTokenTestnet} from "./aragon";
import {AugurTokenMainnet, AugurTokenTestnet} from "./augur";
import {BatTokenMainnet, BatTokenTestnet} from "./bat";
import {EosTokenMainnet, EosTokenTestnet} from "./eos";
import {GnosisTokenMainnet, GnosisTokenTestnet} from "./gnosis";
import {GolemTokenMainnet, GolemTokenTestnet} from "./golem";
import {SaltTokenMainnet, SaltTokenTestnet} from "./salt";
import {TokenAtomicSwap} from "../eth/tokens/token-atomic-swap";
import {CivicTokenMainnet, CivicTokenTestnet} from "./civic";
import {OmiseGoTokenMainnet, OmiseGoTokenTestnet} from "./omisego";
import {District0xTokenMainnet, District0xTokenTestnet} from "./district0x";
import {StatusNetworkTokenMainnet, StatusNetworkTokenTestnet} from "./statusnetwork";
import {SubstratumTokenMainnet, SubstratumTokenTestnet} from "./substratum";
import {TronTokenMainnet, TronTokenTestnet} from "./tron";
import {BytomTokenMainnet, BytomTokenTestnet} from "./bytom";
import {DentTokenTestnet} from "./dent";

export enum TOKENS {
  AUGUR = 1,
  GOLEM,
  GNOSIS,
  BAT,
  ARAGON,
  EOS,
  SALT,
  CIVIC,
  OMISEGO,
  DISTRICT0X,
  STATUSNETWORK,
  SUBSTRATUM,
  TRON,
  BYTOM,
  DENT
}

export class TokenFactory {
  public static GetToken(token: TOKENS, engine: EthEngine, testnet: boolean = true): TokenAtomicSwap {
    if (!testnet) {
      return this.GetTokenMain(token, engine);
    }

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
      case TOKENS.CIVIC: {
        return new CivicTokenTestnet(engine);
      }
      case TOKENS.OMISEGO: {
        return new OmiseGoTokenTestnet(engine);
      }
      case TOKENS.DISTRICT0X: {
        return new District0xTokenTestnet(engine);
      }
      case TOKENS.STATUSNETWORK: {
        return new StatusNetworkTokenTestnet(engine);
      }
      case TOKENS.SUBSTRATUM: {
        return new SubstratumTokenTestnet(engine);
      }
      case TOKENS.TRON: {
        return new TronTokenTestnet(engine);
      }
      case TOKENS.BYTOM: {
        return new BytomTokenTestnet(engine);
      }
      case TOKENS.DENT: {
        return new DentTokenTestnet(engine);
      }
    }
  }

  public static GetTokenMain(token: TOKENS, engine: EthEngine): TokenAtomicSwap {
    switch (token) {
      case TOKENS.GOLEM: {
        return new GolemTokenMainnet(engine);
      }
      case TOKENS.AUGUR: {
        return new AugurTokenMainnet(engine);
      }
      case TOKENS.GNOSIS: {
        return new GnosisTokenMainnet(engine);
      }
      case TOKENS.BAT: {
        return new BatTokenMainnet(engine);
      }
      case TOKENS.ARAGON: {
        return new AragonTokenMainnet(engine);
      }
      case TOKENS.EOS: {
        return new EosTokenMainnet(engine);
      }
      case TOKENS.SALT: {
        return new SaltTokenMainnet(engine);
      }
      case TOKENS.CIVIC: {
        return new CivicTokenMainnet(engine);
      }
      case TOKENS.OMISEGO: {
        return new OmiseGoTokenMainnet(engine);
      }
      case TOKENS.DISTRICT0X: {
        return new District0xTokenMainnet(engine);
      }
      case TOKENS.STATUSNETWORK: {
        return new StatusNetworkTokenMainnet(engine);
      }
      case TOKENS.SUBSTRATUM: {
        return new SubstratumTokenMainnet(engine);
      }
      case TOKENS.TRON: {
        return new TronTokenMainnet(engine);
      }
      case TOKENS.BYTOM: {
        return new BytomTokenMainnet(engine);
      }
      case TOKENS.DENT: {
        return new DentTokenTestnet(engine);
      }
    }
  }
}

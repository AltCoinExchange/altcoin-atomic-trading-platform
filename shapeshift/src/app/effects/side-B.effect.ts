import {Injectable} from "@angular/core";

@Injectable()
export class SideBEffect {
  $initiate: any;
  $initiateSuccess: any;

  $informInitiate: any;
  $informInitiateSuccess: any;

  $waitForParticipate: any;
  $waitForParticipateSuccess: any;

  $redeem;
  $redeemSuccess;

  $informRedeemed: any;
  $informRedeemedSuccess: any;

  $done;

  constructor() {

  }
}

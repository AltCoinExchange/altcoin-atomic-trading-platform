import {Action} from "@ngrx/store";

export const INIT_INITIATE = "INIT_INITIATE";
export const INITIATE = "INITIATE";
export const INITIATE_SUCCESS = "INITIATE_SUCCESS";
export const INITIATE_FAIL = "INITIATE_FAIL";

export class InitInitiateAction implements Action {
  readonly type = INIT_INITIATE;

  constructor(public payload: any) {
  }
}

export class InitiateAction implements Action {
  readonly type = INITIATE;

  constructor(public payload: any) {
  }
}

export class InitiateSuccessAction implements Action {
  readonly type = INITIATE_SUCCESS;

  constructor(public payload) { // TODO create class for payload
  }
}

export class InitiateFailAction implements Action {
  readonly type = INITIATE_FAIL;

  constructor(public payload) { // TODO create class for payload
    console.log(INITIATE_FAIL, payload);
  }
}


export const INFORM_INITIATE = "INFORM_INITIATE";
export const INFORM_INITIATE_SUCCESS = "INFORM_INITIATE_SUCCESS";
export const INFORM_INITIATE_FAIL = "INFORM_INITIATE_FAIL";

export class InformInitiateAction implements Action {
  readonly type = INFORM_INITIATE;

  constructor(public payload) { // TODO
  }
}

export class InformInitiateSuccessAction implements Action {
  readonly type = INFORM_INITIATE_SUCCESS;

  constructor(public payload) { // TODO
  }
}

export class InformInitiateFailAction implements Action {
  readonly type = INFORM_INITIATE_FAIL;

  constructor(public payload) { // TODO
  }
}


export const WAIT_FOR_PARTICIPATE = "WAIT_FOR_PARTICIPATE";
export const WAIT_FOR_PARTICIPATE_SUCCESS = "WAIT_FOR_PARTICIPATE_SUCCESS";
export const WAIT_FOR_PARTICIPATE_FAIL = "WAIT_FOR_PARTICIPATE_FAIL";

export class WaitForParticipateAction implements Action {
  readonly type = WAIT_FOR_PARTICIPATE;

  constructor(public payload) { // TODO
  }
}

export class WaitForParticipateSuccessAction implements Action {
  readonly type = WAIT_FOR_PARTICIPATE_SUCCESS;

  constructor(public payload) { // TODO
  }
}

export class WaitForParticipateFailAction implements Action {
  readonly type = WAIT_FOR_PARTICIPATE_FAIL;

  constructor(public payload) { // TODO
  }
}


export const BREDEEM = "BREDEEM";
export const BREDEEM_SUCCESS = "BREDEEM_SUCCESS";
export const BREDEEM_FAIL = "BREDEEM_FAIL";

export class BRedeemAction implements Action {
  readonly type = BREDEEM;

  constructor(public payload) { // TODO
  }
}

export class BRedeemSuccessAction implements Action {
  readonly type = BREDEEM_SUCCESS;

  constructor(public payload) { // TODO
  }
}

export class BRedeemFailAction implements Action {
  readonly type = BREDEEM_FAIL;

  constructor(public payload) { // TODO
  }
}


export const INFORM_REDEEMED = "INFORM_REDEEMED";
export const INFORM_REDEEMED_SUCCESS = "INFORM_REDEEMED_SUCCESS";
export const INFORM_REDEEMED_FAIL = "INFORM_REDEEMED_FAIL";

export class InformRedeemedAction implements Action {
  readonly type = INFORM_REDEEMED;

  constructor(public payload) { // TODO
  }
}

export class InformRedeemedSuccessAction implements Action {
  readonly type = INFORM_REDEEMED_SUCCESS;

  constructor(public payload) { // TODO
  }
}

export class InformRedeemedFailAction implements Action {
  readonly type = INFORM_REDEEMED_FAIL;

  constructor(public payload) { // TODO
  }
}


export const BDONE = "BDONE";

export class BDoneAction implements Action {
  readonly type = BDONE;

  constructor(public payload) {

  }
}

export type Actions = InitiateAction
  | InitInitiateAction
  | InitiateSuccessAction
  | InitiateFailAction
  | InformInitiateAction
  | InformInitiateSuccessAction
  | InformInitiateFailAction
  | WaitForParticipateAction
  | WaitForParticipateSuccessAction
  | WaitForParticipateFailAction
  | BRedeemAction
  | BRedeemSuccessAction
  | BRedeemFailAction
  | InformRedeemedAction
  | InformRedeemedSuccessAction
  | InformRedeemedFailAction
  | BDoneAction;

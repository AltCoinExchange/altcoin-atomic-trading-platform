import {Action} from "@ngrx/store";

export const GENERATE_LINK = "GENERATE_LINK";
export const GENERATE_LINK_SUCCESS = "GENERATE_LINK_SUCCESS";
export const GENERATE_LINK_FAIL = "GENERATE_LINK_FAIL";

export class GenerateLinkAction implements Action {
  readonly type = GENERATE_LINK;

  constructor(public payload) { // TODO create class for payload
  }
}

export class GenerateLinkSuccessAction implements Action {
  readonly type = GENERATE_LINK_SUCCESS;

  constructor(public payload) { // TODO
  }
}

export class GenerateLinkFailAction implements Action {
  readonly type = GENERATE_LINK_FAIL;

  constructor(public payload) { // TODO
  }
}


export const WAIT_FOR_INITIATE = "WAIT_FOR_INITIATE";
export const WAIT_FOR_INITIATE_SUCCESS = "WAIT_FOR_INITIATE_SUCCESS";
export const WAIT_FOR_INITIATE_FAIL = "WAIT_FOR_INITIATE_FAIL";

export class WaitForInitiateAction implements Action {
  readonly type = WAIT_FOR_INITIATE;

  constructor(public payload) { // TODO
  }
}

export class WaitForInitiateSuccessAction implements Action {
  readonly type = WAIT_FOR_INITIATE_SUCCESS;

  constructor(public payload) { // TODO
  }
}

export class WaitForInitiateFailAction implements Action {
  readonly type = WAIT_FOR_INITIATE_FAIL;

  constructor(public payload) { // TODO
  }
}


export const PARTICIPATE = "PARTICIPATE";
export const PARTICIPATE_SUCCESS = "PARTICIPATE_SUCCESS";
export const PARTICIPATE_FAIL = "PARTICIPATE_FAIL";

export class ParticipateAction implements Action {
  readonly type = PARTICIPATE;

  constructor(public payload) { // TODO
  }
}

export class ParticipateSuccessAction implements Action {
  readonly type = PARTICIPATE_SUCCESS;

  constructor(public payload) { // TODO
  }
}

export class ParticipateFailAction implements Action {
  readonly type = PARTICIPATE_FAIL;

  constructor(public payload) { // TODO
  }
}


export const INFORM_PARTICIPATE = "INFORM_PARTICIPATE";
export const INFORM_PARTICIPATE_SUCCESS = "INFORM_PARTICIPATE_SUCCESS";
export const INFORM_PARTICIPATE_FAIL = "INFORM_PARTICIPATE_FAIL";

export class InformParticipateAction implements Action {
  readonly type = INFORM_PARTICIPATE;

  constructor(public payload) { // TODO
  }
}

export class InformParticipateSuccessAction implements Action {
  readonly type = INFORM_PARTICIPATE_SUCCESS;

  constructor(public payload) { // TODO
  }
}

export class InformParticipateFailAction implements Action {
  readonly type = INFORM_PARTICIPATE_FAIL;

  constructor(public payload) { // TODO
  }
}


export const WAIT_FOR_BREDEEM = "WAIT_FOR_BREDEEM";
export const WAIT_FOR_BREDEEM_SUCCESS = "WAIT_FOR_BREDEEM_SUCCESS";
export const WAIT_FOR_BREDEEM_FAIL = "WAIT_FOR_BREDEEM_FAIL";

export class WaitForBRedeemAction implements Action {
  readonly type = WAIT_FOR_BREDEEM;

  constructor(public payload) { // TODO
  }
}

export class WaitForBRedeemSuccessAction implements Action {
  readonly type = WAIT_FOR_BREDEEM_SUCCESS;

  constructor(public payload) { // TODO
  }
}

export class WaitForBRedeemFailAction implements Action {
  readonly type = WAIT_FOR_BREDEEM_FAIL;

  constructor(public payload) { // TODO
  }
}


export const EXTRACT_SECRET = "EXTRACT_SECRET";
export const EXTRACT_SECRET_SUCCESS = "EXTRACT_SECRET_SUCCESS";
export const EXTRACT_SECRET_FAIL = "EXTRACT_SECRET_FAIL";

export class ExtractSecretAction implements Action {
  readonly type = EXTRACT_SECRET;

  constructor(public payload) { // TODO
  }
}

export class ExtractSecretSuccessAction implements Action {
  readonly type = EXTRACT_SECRET_SUCCESS;

  constructor(public payload) { // TODO
  }
}

export class ExtractSecretFailAction implements Action {
  readonly type = EXTRACT_SECRET_FAIL;

  constructor(public payload) { // TODO
  }
}


export const AREDEEM = "AREDEEM";
export const AREDEEM_SUCCESS = "AREDEEM_SUCCESS";
export const AREDEEM_FAIL = "AREDEEM_FAIL";

export class ARedeemAction implements Action {
  readonly type = AREDEEM;

  constructor(public payload) { // TODO
  }
}

export class ARedeemSuccessAction implements Action {
  readonly type = AREDEEM_SUCCESS;

  constructor(public payload) { // TODO
  }
}

export class ARedeemFailAction implements Action {
  readonly type = AREDEEM_FAIL;

  constructor(public payload) { // TODO
  }
}


export const ADONE = "ADONE";

export class ADoneAction implements Action {
  readonly type = ADONE;

  constructor(public payload) {
  }
}

export type Actions = GenerateLinkAction
  | GenerateLinkSuccessAction
  | GenerateLinkFailAction
  | WaitForInitiateAction
  | WaitForInitiateSuccessAction
  | WaitForInitiateFailAction
  | ParticipateAction
  | ParticipateSuccessAction
  | ParticipateFailAction
  | InformParticipateAction
  | InformParticipateSuccessAction
  | InformParticipateFailAction
  | WaitForBRedeemAction
  | WaitForBRedeemSuccessAction
  | WaitForBRedeemFailAction
  | ExtractSecretAction
  | ExtractSecretSuccessAction
  | ExtractSecretFailAction
  | ARedeemAction
  | ARedeemSuccessAction
  | ARedeemFailAction
  | ADoneAction ;

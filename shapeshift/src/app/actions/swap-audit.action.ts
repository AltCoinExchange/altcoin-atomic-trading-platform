import {Action} from '@ngrx/store';

export const SWAP_AUDIT = 'SWAP_AUDIT';
export const SWAP_AUDIT_SUCCESS = 'SWAP_AUDIT_SUCCESS';

export class SwapAuditAction implements Action {
  readonly type = SWAP_AUDIT;

  constructor(public payload: { contractHex, contractTxHex }) {

  }
}

export class SwapAuditSuccessAction implements Action {
  readonly type = SWAP_AUDIT_SUCCESS;

  constructor(public payload: any) {

  }
}


export type Actions =
  SwapAuditAction
  | SwapAuditSuccessAction
  ;

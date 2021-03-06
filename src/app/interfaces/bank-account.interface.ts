import { WithdrawalError } from '../models/errors.model';

export interface IBankAccount {
  withdraw: () => boolean | WithdrawalError;
  canWithdraw: () => boolean;
}

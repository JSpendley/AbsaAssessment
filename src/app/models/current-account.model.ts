import { AccountTypes } from '../enums/account-types.enum';
import { IBankAccount } from '../interfaces/bank-account.interface';
import { BankAccount } from './bank-account.model';
import { WithdrawalError } from './errors.model';

export class CurrentAccount extends BankAccount implements IBankAccount {
  private overdraftLimit = -500;

  constructor({
    balance,
    accountNumber,
  }: {
    balance: number;
    accountNumber: string;
  }) {
    super({ balance, accountNumber, accountType: AccountTypes.CHEQUE });
  }

  canWithdraw(): boolean {
    return this.balance > this.overdraftLimit;
  }

  withdraw(): boolean | WithdrawalError {
    if (this.canWithdraw()) {
      return true;
    }

    return new WithdrawalError(
      'You do not have any available funds to withdraw'
    );
  }
}

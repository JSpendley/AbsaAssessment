import { AccountTypes } from '../enums/account-types.enum';
import { IBankAccount } from '../interfaces/bank-account.interface';
import { BankAccount } from './bank-account.model';
import { WithdrawalError } from './errors.model';

export class CurrentAccount extends BankAccount implements IBankAccount {

  constructor({ balance, accountNumber }: { balance: number, accountNumber:string }) {
    super({ balance, accountNumber, accountType: AccountTypes.CHEQUE });
  }

  getBalance(): number {
    return 0;
  }

  withdraw(): boolean | WithdrawalError {
    return true;
  }
}

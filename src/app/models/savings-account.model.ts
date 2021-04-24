import { AccountTypes } from '../enums/account-types.enum';
import { IBankAccount } from '../interfaces/bank-account.interface';
import { BankAccount } from './bank-account.model';
import { WithdrawalError } from './errors.model';

export class SavingsAccount extends BankAccount implements IBankAccount {
  private minimumBalance = 0;

  constructor({ balance, accountNumber }: { balance: number, accountNumber:string }) {
    super({balance, accountNumber, accountType: AccountTypes.SAVINGS});
  }

  getBalance(): number{
    return 0;
  };

  withdraw(): boolean | WithdrawalError {
    if (this.balance <= this.minimumBalance) {
      return new WithdrawalError('Account balance must be more than 0');
    }

    return true;
  }


}

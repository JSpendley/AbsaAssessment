import { Injectable } from '@angular/core';
import { AccountTypes } from '../enums/account-types.enum';
import { BankAccountDTO } from '../interfaces/bank-account-dto.interface';
import { BankAccount } from '../models/bank-account.model';
import { CurrentAccount } from '../models/current-account.model';
import { SavingsAccount } from '../models/savings-account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountFactoryService {
  constructor() {}

  getAccountByType({
    account,
  }: {
    account: BankAccountDTO;
  }): BankAccount | null {
    switch (account.account_type) {
      case AccountTypes.SAVINGS:
        return new SavingsAccount({
          accountNumber: account.account_number,
          balance: parseFloat(account.balance),
        });
      case AccountTypes.CHEQUE:
        return new CurrentAccount({
          accountNumber: account.account_number,
          balance: parseFloat(account.balance),
        });
      default:
        return null;
    }
  }
}

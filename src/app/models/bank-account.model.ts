import { AccountTypes } from "../enums/account-types.enum";

export class BankAccount {
  balance: number;
  accountNumber: string;
  accountType: string;

  constructor({
    balance,
    accountNumber,
    accountType
  }: {
    balance: number;
    accountNumber: string;
    accountType: string
  }) {
    this.balance = balance;
    this.accountNumber = accountNumber;
    this.accountType = accountType
  }
}

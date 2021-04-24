import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, reduce, switchMap, takeUntil } from 'rxjs/operators';
import { IBankAccount } from './interfaces/bank-account.interface';
import { BankAccount } from './models/bank-account.model';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'acme-bank';
  balanceTotal: string = '';

  accounts$: Observable<BankAccount[]>;
  unsubscribe$ = new Subject<void>();

  displayedColumns: string[] = [
    'accountNumber',
    'accountType',
    'balance',
    'action',
  ];

  constructor(private accountService: AccountService) {
    this.accounts$ = this.accountService.getAccounts();
  }

  ngOnInit() {
    //set up manual subscriptions
    this.accounts$
      .pipe(
        map((accounts) => {
          let test = accounts.reduce((a, b) => {
            return {
              accountNumber: '',
              accountType: '',
              balance: a.balance + b.balance,
            };
          }).balance;

          return test;
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((total) => (this.balanceTotal = total.toFixed(2)));
  }

  notify(account: IBankAccount): void {
    account.withdraw();
    alert('Success');
  }

  isButtonDisabled(account: IBankAccount): boolean {
    return !account.canWithdraw();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

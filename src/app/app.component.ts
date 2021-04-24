import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, reduce, switchMap } from 'rxjs/operators';
import { IBankAccount } from './interfaces/bank-account.interface';
import { BankAccount } from './models/bank-account.model';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'acme-bank';
  accounts$: Observable<BankAccount[]>;
  displayedColumns: string[] = ['accountNumber', 'accountType', 'balance', 'action']

  constructor(private accountService: AccountService) {
    this.accounts$ = this.accountService.getAccounts();
  }

  notify(account: IBankAccount): void{

  }

  totalBalance():Observable<BankAccount>{
   return this.accounts$.pipe(map(accounts => {
     return accounts.reduce((total, acc)) => {
       return total.balance + acc.balance;
     }
   }))
  }

  isButtonDisabled(account: IBankAccount): boolean{
    return account.withdraw() === true;
  }
}

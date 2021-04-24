import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { BankAccount } from '../models/bank-account.model';
import { environment } from '../../environments/environment';
import { AccountFactoryService } from './account-factory.service';
import { BankAccountDTO } from '../interfaces/bank-account-dto.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(
    private http: HttpClient,
    private accountFactory: AccountFactoryService
  ) {}

  getAccounts(): Observable<BankAccount[]> {
    return this.http
      .get<BankAccountDTO[]>(`${environment.apiUrl}/accounts`)
      .pipe(
        map((accounts) => {
          let bankAccounts: BankAccount[] = [];
          accounts.forEach((account) => {
            const accountToAdd = this.accountFactory.getAccountByType({
              account,
            });
            if (accountToAdd) {
              bankAccounts.push(accountToAdd);
            }
            else{
              //ideally this would be handled by a more sophisticated logging service
              console.log(`No account type found for Account Number: ${account.account_number}`)
            }
          });

          return bankAccounts;
        })
      );
  }
}

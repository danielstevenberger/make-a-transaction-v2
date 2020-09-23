import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Account } from "./../models/account.model";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  private accountSubject = new BehaviorSubject<Account>(null);

  account: Account;

  account$: Observable<Account> = this.accountSubject.asObservable();

  constructor() {
    const account: Account = {
      accountName: "Free Checking(4692)",
      balance: 5824.76,
    };
    this.accountSubject.next(account);
  }

  //returns the account
  getAccount() {
    return this.account$;
  }

  //Checks if the account is overdrawn
  checkBalance(balance: number, amount: number) {
    return balance - amount >= -500;
  }

  subtractBalance(amount: number) {
    // let account: Account;
    // this.account$.subscribe((res) => (account = { ...res }));
    // account.balance = Math.round((account.balance - amount) * 100) / 100;
    // this.accountSubject.next(account);
  }
}

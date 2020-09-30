import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Account } from "./../models/account.model";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  private accountSubject = new BehaviorSubject<Account>(null);

  account$: Observable<Account> = this.accountSubject.asObservable();

  //Creates an account
  constructor() {
    this.initAccount();
  }

  //initalize account
  initAccount() {
    const account: Account = {
      accountName: "Free Checking(4692)",
      balance: 5824.76,
    };
    this.accountSubject.next(account);
  }

  //returns an observable containing account information
  getAccount() {
    return this.account$;
  }

  //Checks if the account is overdrawn
  checkBalance(balance: number, amount: number) {
    return balance - amount >= -500;
  }

  //Subtracts an amount from the account
  subtractBalance(amount: number) {
    let account: Account;
    this.account$.subscribe((res) => (account = { ...res }));
    account.balance = Math.round((account.balance - amount) * 100) / 100;
    this.accountSubject.next(account);
  }
}

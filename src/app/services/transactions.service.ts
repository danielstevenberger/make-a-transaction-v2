import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Transaction } from "src/app/models/transaction.model";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Transfer } from "../models/transfer.model";

@Injectable({
  providedIn: "root",
})
export class TransactionsService {
  private transactionSubject = new BehaviorSubject<Transaction[]>(null);

  transactions$: Observable<
    Transaction[]
  > = this.transactionSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    this.httpClient
      .get<Transaction[]>("../../assets/transaction-data/transactions.json")
      .pipe(
        map((res) => {
          const transactions = res["data"];
          transactions.forEach((transaction: Transaction) => {
            transaction.amount = +transaction.amount;
          });
          return transactions;
        })
      )
      .subscribe((res) => this.transactionSubject.next(res));
  }

  getTransactions() {
    return this.transactions$;
  }

  addTransaction(transfer: Transfer) {
    const newTransaction: Transaction = {
      categoryCode: "#c12020",
      transactionDate: new Date().valueOf(),
      merchantLogo:
        "https://cdn.pixabay.com/photo/2016/03/31/21/41/cash-1296584_960_720.png",
      merchant: transfer.toAccount,
      transactionType: "Online Transfer",
      amount: transfer.amount,
    };

    let transactions: Transaction[];

    this.transactions$
      .pipe(map((transactions) => [...transactions, newTransaction]))
      .subscribe((res) => (transactions = res));

    console.log(transactions);

    this.transactionSubject.next(transactions);
  }
}

import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Transaction } from "src/app/models/transaction.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TransactionsService {
  constructor(private httpClient: HttpClient) {}

  getTransactions() {
    return this.httpClient
      .get<Transaction[]>("../../assets/transaction-data/transactions.json")
      .pipe(
        map((res) => {
          const transactions = res["data"];
          transactions.forEach((transaction: Transaction) => {
            transaction.amount = +transaction.amount;
          });
          return transactions;
        })
      );
  }
}

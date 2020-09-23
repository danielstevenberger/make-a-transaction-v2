import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Transaction } from "../models/transaction.model";

@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"],
})
export class TransactionsComponent implements OnInit {
  transactions: Observable<Transaction[]>;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.transactions = this.httpClient
      .get<Transaction[]>("../../assets/transaction-data/transactions.json")
      .pipe(
        map((res) => {
          const transactions = res["data"];
          transactions.forEach((transaction: Transaction) => {
            transaction.amount = +transaction.amount;
          });
          return transactions;
        }),
        tap((res) => console.log(res))
      );
  }
}

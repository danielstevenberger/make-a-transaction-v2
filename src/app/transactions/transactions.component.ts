import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Transaction } from "../models/transaction.model";
import { TransactionsService } from "../services/transactions.service";

@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"],
})
export class TransactionsComponent implements OnInit {
  transactions: Observable<Transaction[]>;

  constructor(private transactionService: TransactionsService) {}

  ngOnInit(): void {
    this.transactions = this.transactionService.getTransactions();
  }
}

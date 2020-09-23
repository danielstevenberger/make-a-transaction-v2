import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Transaction } from "../models/transaction.model";

@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"],
})
export class TransactionsComponent implements OnInit {
  transactions: Observable<Transaction[]>;

  constructor() {}

  ngOnInit(): void {}
}

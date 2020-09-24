import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { Transaction } from "src/app/models/transaction.model";

@Component({
  selector: "app-transaction",
  templateUrl: "./transaction.component.html",
  styleUrls: ["./transaction.component.scss"],
})
export class TransactionComponent implements OnInit {
  //Gets a transaction as an input
  @Input() transaction: Transaction;

  constructor() {}

  ngOnInit(): void {}
}

import { map } from "rxjs/operators";
import { Search } from "src/app/models/search.model";
import { SearchService } from "src/app/services/search.service";
import { Component, OnInit } from "@angular/core";
import { combineLatest, Observable } from "rxjs";
import { Transaction } from "../models/transaction.model";
import { TransactionsService } from "../services/transactions.service";

@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"],
})
export class TransactionsComponent implements OnInit {
  transactionData$: Observable<{ transactions: Transaction[]; search: Search }>;

  constructor(
    private transactionService: TransactionsService,
    private searchService: SearchService
  ) {}

  reverse(search: Search) {
    if (search.sort == "transactionDate") {
      return search.order == "desc";
    }
    return search.order == "asc";
  }

  ngOnInit(): void {
    const transactions$ = this.transactionService.getTransactions();
    const searchFilter$ = this.searchService.getSearchFilter();

    this.transactionData$ = combineLatest([transactions$, searchFilter$]).pipe(
      map(([transactions, search]) => {
        return { transactions, search };
      })
    );
  }
}

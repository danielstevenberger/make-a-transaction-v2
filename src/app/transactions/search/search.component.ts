import { Component, OnInit } from "@angular/core";
import { TransactionsService } from "src/app/services/transactions.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  //Ascending Descending character
  order = "\u25BC";

  //The current active button
  active = "date";

  //Whats in the search field.
  search = "";

  constructor() {}

  //clears the search field.
  clear() {
    this.search = "";
    this.searchBy();
  }

  //Notifies the transaction service what is being entered in the search field.
  searchBy() {}

  //Determines what button is active and whether its descending or ascending.
  sortBy(type: string) {
    if (this.active == type) {
      if (this.order == "\u25B2") {
        this.order = "\u25BC";
      } else {
        this.order = "\u25B2";
      }
    }
    this.active = type;
  }

  ngOnInit(): void {}
}

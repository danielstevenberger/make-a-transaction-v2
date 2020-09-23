import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Search } from "src/app/models/search.model";
import { SearchService } from "src/app/services/search.service";
import { TransactionsService } from "src/app/services/transactions.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  // searchFilter: Search;
  searchFilter$: Observable<Search>;

  constructor(private searchService: SearchService) {}

  //clears the search field.
  clear() {
    this.searchBy("");
  }

  //Notifies the transaction service what is being entered in the search field.
  searchBy(search: string) {
    this.searchService.searchBy(search);
  }

  //Determines what button is active and whether its descending or ascending.
  sortBy(sort: string) {
    this.searchService.sortBy(sort);
  }

  //displays the proper symbol
  displaySymbol(sort: string, searchFilter: Search) {
    if (sort == searchFilter.sort) {
      return searchFilter.order == "asc" ? "\u25BC" : "\u25B2";
    }
  }

  ngOnInit(): void {
    //Sends first stream of data
    const searchFilterInit: Search = {
      order: "asc",
      sort: "date",
      search: "",
    };
    this.searchService.searchInit(searchFilterInit);
    this.searchFilter$ = this.searchService.getSearchFilter();
  }
}

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
  searchFilter: Search;

  constructor(private searchService: SearchService) {}

  //clears the search field.
  clear() {
    this.searchFilter.search = "";
    this.searchBy();
  }

  //Notifies the transaction service what is being entered in the search field.
  searchBy() {
    this.searchService.searchBy(this.searchFilter.search);
  }

  //Determines what button is active and whether its descending or ascending.
  sortBy(sort: string) {
    if (this.searchFilter.sort == sort) {
      if (this.searchFilter.order == "asc") {
        this.searchFilter.order = "desc";
        this.searchService.orderBy("desc");
      } else {
        this.searchFilter.order = "asc";
        this.searchService.orderBy("asc");
      }
    }
    this.searchService.sortBy(sort);
    this.searchFilter.sort = sort;
  }

  //displays the proper symbol
  displaySymbol(sort: string) {
    if (sort == this.searchFilter.sort) {
      return this.searchFilter.order == "asc" ? "\u25BC" : "\u25B2";
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

    //Subscribes to the search observable
    this.searchService
      .getSearchFilter()
      .subscribe((searchFilter) => (this.searchFilter = searchFilter));
  }
}

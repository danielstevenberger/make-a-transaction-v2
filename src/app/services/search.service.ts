import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Search } from "src/app/models/search.model";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  //Initial serachFilter
  private searchFilter: Search = {
    order: "desc",
    sort: "transactionDate",
    search: "",
  };

  private searchSubject = new BehaviorSubject<Search>(null);

  searchBy$: Observable<Search> = this.searchSubject.asObservable();

  //Gives the search filter to the observable
  constructor() {
    this.searchSubject.next(this.searchFilter);
  }

  //Gives the string to search by
  searchBy(search: string) {
    this.searchFilter.search = search;
    this.searchSubject.next(this.searchFilter);
  }

  //Gives the category to order by
  sortBy(sort: string) {
    if (this.searchFilter.sort == sort) {
      if (this.searchFilter.order == "asc") {
        this.searchFilter.order = "desc";
        this.orderBy("desc");
      } else {
        this.searchFilter.order = "asc";
        this.orderBy("asc");
      }
    }

    this.searchFilter.sort = sort;
    this.searchSubject.next(this.searchFilter);
  }

  //Gives the order ascending or descending
  orderBy(order: string) {
    this.searchFilter.order = order;
    this.searchSubject.next(this.searchFilter);
  }

  //Gives the observable containg the serach filter
  getSearchFilter() {
    return this.searchBy$;
  }
}

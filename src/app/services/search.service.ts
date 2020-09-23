import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Search } from "src/app/models/search.model";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  private searchFilter: Search;

  private searchSubject = new BehaviorSubject<Search>(null);

  searchBy$: Observable<Search> = this.searchSubject.asObservable();

  constructor() {}

  searchBy(search: string) {
    this.searchFilter.search = search;
    this.searchSubject.next(this.searchFilter);
  }

  sortBy(sort: string) {
    this.searchFilter.sort = sort;
    this.searchSubject.next(this.searchFilter);
  }

  orderBy(order: string) {
    this.searchFilter.order = order;
    this.searchSubject.next(this.searchFilter);
  }

  searchInit(searchFilter: Search) {
    this.searchFilter = { ...searchFilter };
    this.searchSubject.next(this.searchFilter);
  }

  getSearchFilter() {
    return this.searchBy$;
  }
}

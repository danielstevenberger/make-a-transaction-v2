import { TestBed } from "@angular/core/testing";
import { Search } from "../models/search.model";

import { SearchService } from "./search.service";

describe("SearchService", () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
  it("should return a searhFilter observable", () => {
    let searchFilter = service.getSearchFilter();
    expect(searchFilter).toBeTruthy();
    expect(searchFilter).toEqual(service.searchBy$);
  });
  it("should search by a string", () => {
    service.searchBy("test");
    let search: Search;
    service.searchBy$.subscribe((res) => (search = res));
    expect(search.search).toEqual("test");
  });
  it("should sort by a filter and change the order", () => {
    service.sortBy("transactionDate");
    let search: Search;
    service.searchBy$.subscribe((res) => (search = res));
    expect(search.order).toEqual("asc");
    expect(search.sort).toEqual("transactionDate");
  });
  it("should sort by a filter and change the order 2", () => {
    service.sortBy("transactionDate");
    service.sortBy("transactionDate");
    let search: Search;
    service.searchBy$.subscribe((res) => (search = res));
    expect(search.order).toEqual("desc");
    expect(search.sort).toEqual("transactionDate");
  });
  it("should sort by a filter and keep the order", () => {
    service.sortBy("amount");
    let search: Search;
    service.searchBy$.subscribe((res) => (search = res));
    expect(search.order).toEqual("desc");
    expect(search.sort).toEqual("amount");
  });
  it("should change the order", () => {
    service.orderBy("asc");
    let search: Search;
    service.searchBy$.subscribe((res) => (search = res));
    expect(search.order).toEqual("asc");
  });
});

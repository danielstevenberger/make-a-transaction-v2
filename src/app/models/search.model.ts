//Model for a search
export class Search {
  public search: string;
  public sort: string;
  public order: string;
  constructor(search: string, sort: string, order: string) {
    this.search = search;
    this.sort = sort;
    this.order = order;
  }
}

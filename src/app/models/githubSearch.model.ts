import {Items} from '@interfaces/items.interface';

export class GithubSearch {
  // tslint:disable-next-line:variable-name
  public total_count: number;
  // tslint:disable-next-line:variable-name
  public incomplete_results: number;
  public items: Items[];

  constructor(data: any = {}) {
    const {
      total_count = null,
      incomplete_results = null,
      items = null,
    } = data;

    this.total_count = total_count;
    this.incomplete_results = incomplete_results;
    this.items = items;
  }
}

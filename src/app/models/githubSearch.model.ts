import {Items} from '@interfaces/items.interface';

export class GithubSearch {
  public totalCount: number;
  public incompleteResults: number;
  public items: Items[];

  constructor(data: any = {}) {
    const {
      total_count = null,
      incomplete_results = null,
      items = null,
    } = data;

    this.totalCount = total_count;
    this.incompleteResults = incomplete_results;
    this.items = items;
  }
}

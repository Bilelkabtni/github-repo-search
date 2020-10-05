import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {GithubSearch} from '@models/githubSearch.model';
import {map, shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private url = 'https://api.github.com';

  private query$ = new BehaviorSubject(null);
  searchEvent = this.query$.asObservable();

  constructor(private http: HttpClient) {
  }

  changeQuery(searchText: string): void {
    this.query$.next(searchText);
  }

  searchByQuery(
    query: string = 'todo',
    sortOrder = 'asc',
    pageNumber = 0,
    pageSize = 3): Observable<GithubSearch> {

    // @ts-ignore
    return this.http.get(this.url + '/search/repositories', {
      params: new HttpParams()
        .set('q', query.toString())
        .set('order', sortOrder)
        .set('page', pageNumber.toString())
        .set('per_page', pageSize.toString())
    }).pipe(
      map(res => res),
      shareReplay(1)
    );
  }
}

import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators';
import {GithubService} from './github.service';
import {GithubSearch} from '@models/githubSearch.model';


export class GithubSearchDataSourceService implements DataSource<GithubSearch> {

  public searchSubject = new BehaviorSubject<GithubSearch[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private githubService: GithubService) {

  }

  loadSearch(query: string,
             sortDirection: string,
             pageIndex: number,
             pageSize: number): void {

    this.loadingSubject.next(true);

    this.githubService.searchByQuery(
      query,
      sortDirection,
      pageIndex,
      pageSize
    ).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe(search => {
        // @ts-ignore
        return this.searchSubject.next(search);
      });
  }

  connect(collectionViewer: CollectionViewer): Observable<GithubSearch[]> {
    return this.searchSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.searchSubject.complete();
    this.loadingSubject.complete();
  }

}

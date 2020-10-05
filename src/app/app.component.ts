import {Component, OnInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {GithubSearchDataSourceService} from '@services/github-search-data-source.service';
import {GithubSearch} from '@models/githubSearch.model';
import {GithubService} from '@services/github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'githubSearch';
  dataSource: GithubSearchDataSourceService;
  searchResult: GithubSearch = new GithubSearch();

  isTable = true;
  query: string;
  pageIndex = 0;
  pageSize = 10;

  constructor(private swUpdate: SwUpdate, private githubService: GithubService) {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New version available. Load New Version?')) {
          window.location.reload();
        }
      });
    }
  }

  ngOnInit(): void {
    this.dataSource = new GithubSearchDataSourceService(this.githubService);

    this.dataSource.searchSubject.subscribe(data => {
      this.searchResult = new GithubSearch(data);
    });

    this.githubService.searchEvent.subscribe(query => {
      if (query) {
        this.query = query;
        this.loadSearchedRepos();
        this.pageIndex = 0;
      } else {
        this.searchResult = new GithubSearch();
        this.pageIndex = 0;
      }
    });
  }

  switchView(isTable: boolean): void {
    this.isTable = isTable;
  }

  paginate(data): void {
    this.pageIndex = data.pageIndex;
    this.pageSize = data.pageSize;
    this.loadSearchedRepos();
  }

  private loadSearchedRepos(): void {
    this.dataSource.loadSearch(this.query, 'asc', this.pageIndex, this.pageSize);
  }
}

import {Component, OnInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {GithubSearchDataSourceService} from '@services/github-search-data-source.service';
import {GithubSearch} from '@models/githubSearch.model';
import {GithubService} from '@services/github.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {Items} from '@interfaces/items.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'githubSearch';
  dataSource: GithubSearchDataSourceService;
  searchResult: GithubSearch = new GithubSearch();

  isMobile = this.deviceService.isMobile();
  isTablet = this.deviceService.isTablet();
  isDesktopDevice = this.deviceService.isDesktop();

  isTable = true;
  query: string;
  pageIndex = 0;
  pageSize = 10;

  get isDataLoaded(): boolean {
    return this.searchResult?.items?.length > 0;
  }

  get totalCount(): number {
    return this.searchResult?.totalCount;
  }

  get getCachedFavorites(): Items[] {
    return this.githubService.getCachedFavorites.filter(item => item.name.includes(this.query));
  }

  constructor(private swUpdate: SwUpdate,
              private deviceService: DeviceDetectorService,
              private githubService: GithubService) {
    this.updateSw();
    this.displayOnDeviceView();
  }


  // switch display overview between card view or table view
  // on mobile display only card view
  displayOnDeviceView(): void {
    this.isTable = this.isDesktopDevice;
  }

  // update service worker
  private updateSw(): void {
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
      // in case of there is no coming data for offline reason  the search will look into the cached repos
      if (data.length === 0 && !window.navigator.onLine) {
        this.searchResult = new GithubSearch({
          items: this.getCachedFavorites,
          incompleteResults: false,
          totalCount: this.totalCount,
        });
        return;
      }
      this.searchResult = new GithubSearch(data);
    });

    this.githubService.searchEvent.subscribe(query => {
      if (query) {
        this.query = query;
        this.loadSearchedRepos();
        this.pageIndex = 0;
        return;
      }
      this.searchResult = new GithubSearch();
      this.pageIndex = 0;
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

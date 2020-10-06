import {ChangeDetectionStrategy, Component, Input, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {GithubSearch} from '@models/githubSearch.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent  {
  @Input() searchResult: GithubSearch = new GithubSearch();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['name', 'owner', 'language', 'watchers', 'description', 'favorite'];
}

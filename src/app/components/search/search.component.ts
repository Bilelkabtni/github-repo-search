import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {GithubService} from '@services/github.service';
import {View} from '@newTypes/view.type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class SearchComponent implements OnInit {
  @Input() isDesktop = false;
  @Output() switchView: EventEmitter<boolean> = new EventEmitter<boolean>();
  tableView = true;

  searchFormControl: FormControl = new FormControl('');

  constructor(private githubService: GithubService) {
  }

  ngOnInit(): void {
    this.searchFormControl.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(500)
    ).subscribe(search => {
      this.githubService.changeQuery(search);
    });
  }

  changeDisplayType(): void {
    this.tableView = !this.tableView;
    this.switchView.emit(this.tableView);
  }

  resetSearch(): void {
    this.searchFormControl.reset();
    this.githubService.changeQuery(null);
  }
}

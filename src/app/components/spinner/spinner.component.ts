import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent {
  @Input() show: Observable<boolean>;
}
